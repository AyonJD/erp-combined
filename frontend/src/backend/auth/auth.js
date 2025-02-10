import { BASE_URL } from '@/utils'
import axios from 'axios'

export const loginApi = async data => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const getMe = async token => {
  try {
    const res = await axios.get(`${BASE_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(res, token)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

// export const login = async data => {
//   try {
//     const res = await axios.post('http://127.0.0.1:8000/new/meals', {
//       name: 'string',
//       rawItem: ['string'],
//       price: 0,
//     })
//     console.log(res)
//   } catch (error) {
//     console.log(error)
//   }
// }
