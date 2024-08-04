import Axios from 'axios'

// const BASE_URL = process.env.NODE_ENV === 'production'
//   ? '/api/'
//   : '//localhost:3032/api/' 
   // For them to know that there is a request from a certain port  for another port 
  // of the backend
  //  cause we still in development and We haven't connected the front and the back yet  to the same domain .

  const BASE_URL ='//localhost:3030/api/' 
const axios = Axios.create({
  withCredentials: true    //  Can send cookis and other staff
})



export const httpService = {
  get(endpoint, data) {
    return ajaxWithAsyncAwait(endpoint, 'GET', data)
  },
  post(endpoint, data) {
    return ajaxWithAsyncAwait(endpoint, 'POST', data)
  },
  put(endpoint, data) {
    return ajaxWithAsyncAwait(endpoint, 'PUT', data)
  },
  delete(endpoint, data) {
    return ajaxWithAsyncAwait(endpoint, 'DELETE', data)
  }
}




async function ajaxWithAsyncAwait(endpoint, method = 'GET', data = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: (method === 'GET') ? data : null
    })
    return res.data
  } catch (err) {
    console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`, data)
    console.dir(err)
    if (err.response && err.response.status === 401) {
      sessionStorage.clear()
      window.location.assign('/')
      // Depends on routing startegy - hash or history
      // window.location.assign('/#/login')
      // window.location.assign('/login')
      // router.push('/login')
    }
    throw err
  }
}



// function ajax(endpoint, method = 'GET', data = null) {
//   return axios({
//     url: `${BASE_URL}${endpoint}`,
//     method,
//     data,
//     params: (method === 'GET') ? data : null
//   })
//     .then(res => res.data)
//     .catch(err => {
//       console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`, data)
//       console.dir(err)
//       if (err.response && err.response.status === 401) {
//         sessionStorage.clear()
//         window.location.assign('/')
//       }
//       throw err
//     })
// }