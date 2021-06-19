import axios from 'axios';

export default async function query(
  method, url, data, 
  responseType='json', 
  contentType='application/json'
) {
  try {
    return (await axios ({
      method,
      headers: {
        'Content-Type': contentType,
        'Authorization': `JWT ${localStorage.getItem('access_token')}`
      },
      url: `http://127.0.0.1:8000/api/${url}`,
      data,
      responseType,
    }))
  } catch (error) {
    console.log(error)
  }
}