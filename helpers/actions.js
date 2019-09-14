import { post } from './request'

export const fetchUsers = async () => {
  try {
    const { data } = await post({ action: 'list_users' })

    return { users: data }
  } catch (error) {
    console.error(error)

    return { users: [] }
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

export const createTransaction = payload =>
  post({ action: 'create_transaction', payload})
