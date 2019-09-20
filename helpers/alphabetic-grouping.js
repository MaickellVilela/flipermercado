const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

export const createSectionData = users => ALPHABET
  .toUpperCase()
  .split('')
  .map(letter => ({
    title: letter,
    data: users.filter(user => user.name.startsWith(letter))
  })
)
