import { BASE_URL } from "@/utils"
import axios from "axios"

export const submitFeedback = async data => {
  try {
    const res = await axios.post(`${BASE_URL}/new/feedback`, data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
