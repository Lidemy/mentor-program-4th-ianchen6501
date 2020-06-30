function capitalize(str) {
    var a = str[0].toUpperCase()
    var StrCap = str.replace(str[0],a)
    return StrCap
}

console.log(capitalize('you and me'));
console.log(capitalize('2020.06.28'));
console.log(capitalize('????'));
console.log(capitalize('    '));