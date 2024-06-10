const colors = [
  '#ee4035', '#f37736', '#36abb5', '#850F8D',
  '#365E32', '#81A263', '#005C78', '#E49BFF'
]

export function generateRandomColor (lists) {
  const randomIndex = Math.floor(Math.random() * colors.length)
  const randomColor = colors[randomIndex]

  const lastLists = lists.slice(1 - colors.length)

  return lastLists.some(list => list.color === randomColor)
    ? generateRandomColor(lists)
    : randomColor
}
