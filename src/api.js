import { AUTH_TOKEN } from "./const";

const BASE_URL = '/api/v1';

const getErrorFromResponse = (error) => {
  const issues = error?.data?.issues;
  const message = error?.message;
  if (!issues || !issues.length) return message || 'Неизвестная ошибка';
  return issues.map((issue) => issue.message).join(', ');
};

export const api = async({url, method = 'GET', data}) => {
  try {
    const response = await fetch(BASE_URL +  url, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Token': localStorage.getItem(AUTH_TOKEN)
      },
      body: data
    })
      const json = await response.json();
      if (!response.ok) {
        throw new Error(getErrorFromResponse(json.error));
      }
      return json
  } catch (error) {
    console.error(error)
    throw error
  }
}
