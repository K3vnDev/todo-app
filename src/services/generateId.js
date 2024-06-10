const letters = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

export const generateId = lists => {
  let id = ''
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length)
    if (Math.random() > 0.33) {
      id += letters[randomIndex]
    } else {
      id += String(Math.floor(Math.random() * 10))
    }
  }
  return lists.some(list => list.id === id)
    ? generateId(lists)
    : id
}
