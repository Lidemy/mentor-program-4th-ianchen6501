const db = require('../models')
const prizes = db.prizes
const utils = require('./utils')

function getArr(arr, attr) {
  let result = []
  for(let i=0; i<arr.length; i++) {
    result.push(arr[i][attr])
  }
  return result
}

function weightedRamdom(items, itemsWeight) {
  function calculateTotalWeight(itemsWeight) {
    let total = 0
    for(let i=0; i<itemsWeight.length; i++) {
      total += itemsWeight[i]
    }
    return total
  }
  const totalWeight = calculateTotalWeight(itemsWeight)
  //console.log(totalWeight)
  if(totalWeight === 100) {
    const randomArray=[]
    for (let i=0; i<items.length; i++) {
      for(let j=0; j<itemsWeight[i]; j++) {
        randomArray.push(i)
      }
    }
    let ramdomNumber = Math.round(Math.random()*totalWeight)
    return items[randomArray[ramdomNumber]]
  }
}

const lotteryFrontControler = {
  pull: utils.getAllDataAndRender(prizes, '../views/lottery-frontpage-pull'),
  
  result: (req, res) => {
    prizes.findAll({
      where : { is_deleted : null},
      order: [['id', 'DESC']]
    }).then(result => {
      const idArr = getArr(result, 'id')
      console.log
      const probabilityArr = getArr(result, 'probability')
      const id = weightedRamdom(idArr, probabilityArr)
      prizes.findOne({where : {id}})
      .then(prize => {
        res.render('../views/lottery-frontpage-result', {prize})
      }).catch(error => {
        console.log(error.toString())
        res.redirect('back')
      })
    }).catch(error => {
      console.log(error.toString())
      res.redirect('back')
    })
  }
}

module.exports = lotteryFrontControler