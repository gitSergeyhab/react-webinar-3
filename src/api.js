import { getErrorFromResponse } from "./utils";

const BASE_URL = '/api/v1';

export const api = async({url, method = 'GET', data}) => {

  try {
    console.log({url, method, data})
    const response = await fetch(BASE_URL +  url, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'X-Token': localStorage.getItem('token')
      },
      body: data ? JSON.stringify(data) : null
    })
      const json = await response.json();
      console.log({json})
      if (!response.ok) {
        throw new Error(getErrorFromResponse(json.error));
      }
      return json
  } catch (error) {
    console.error(error)
    throw error
  }
}
