function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let index = i + Math.floor(Math.random() * (arr.length - i))
    let temp = arr[i]
    arr[i] = arr[index]
    arr[index] = temp
  }
  return arr
}

let arr = [1, 2, 3, 4, 5, 6]
console.log(shuffle(arr))
