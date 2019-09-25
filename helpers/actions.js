import { post } from './request'

export const fetchUsers = async () => {
  try {
    const { data } = await post({ action: 'list_users' })

    const users = data.map((user, index) => ({
      id: index,
      name: user[0],
      avatar: user[1],
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

    return { products: data }
  } catch (error) {
    console.error(error)

    return { products: [] }
  }
}

export const createTransaction = (payload) =>
  post({ action: 'create_transaction', payload })
