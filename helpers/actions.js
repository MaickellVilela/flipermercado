import { post } from './request'

export const fetchUsers = async () => {
  try {
    const { data } = await post({ action: 'list_users' })

    const users = data.map((user, index) => ({
      name: user[0],
      avatar: user[1],
      balance: user[2]
    })) || []

    return users
  } catch (error) {
    console.error(error)

    return []
  }
}

export const fetchProducts = async () => {
  try {
    const { data } = await post({ action: 'list_products' })

    const products = data.map((product, index) => ({
      name: product[0],
      price: product[1]
    })) || []

    return products
  } catch (error) {
    console.error(error)

    return []
  }
}

export const createTransaction = payload =>
  post({ action: 'create_transaction', payload})
