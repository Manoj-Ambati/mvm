import { useMutation } from 'react-query'
import axios from 'axios'
import { ApiEndpoints } from '../utils/apiEndpoints'

async function addDetails(payload) {
  try {
    const host = `${window.location.href.replace('3000','3001')}`
    const apiResponse = await axios({
        method: 'post',
        url: `${host}${ApiEndpoints.addUser}`,
        data: payload
      });
    const { data } = apiResponse
    return data
  } catch (e) {
    if (e.response) {
      throw e.response
    }
    throw new Error(e.message)
  }
}

export default function useAddDetailsService() {
  return useMutation((payload) => addDetails(payload), {})
}
