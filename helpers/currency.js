export const parsePrice = (price) =>
  price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
  })

export default { parsePrice }
