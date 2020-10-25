const db = require('../models')
const prize = db.prize
const user = db.user

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

const frontControler = {
  index: (rex, res)=> {
    res.render('../views/index')
  },

  QA: (rex, res)=> {
    res.render('../views/QA')
  },

  pull: (req, res) => {
    prize.findAll({
      where : { is_deleted : null},
      include: user,
      order: [['id', 'DESC']]
    }).then(prizes => {
      res.render('../views/front_pull', {prizes})
    }).catch(error => {
      console.log(error.toString())
      res.redirect('back')
    })
  },

  result: (req, res) => {
    prize.findAll({
      where : { is_deleted : null},
      include: user,
      order: [['id', 'DESC']]
    }).then(prizes => {
      const idArr = getArr(prizes, 'id')
      const probabilityArr = getArr(prizes, 'probability')
      const id = weightedRamdom(idArr, probabilityArr)
      prize.findOne({where : {id}})
      .then(prize => {
        res.render('../views/front_result', {prize})
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


module.exports = frontControler