// const baseUrl = process.env.BASE_URL
const baseUrl = 'https://3k8qtydd9g.execute-api.us-east-1.amazonaws.com'
async function fetchQuery(path, params = null) {
  let url
  if (params !== null) {
    url = `${baseUrl}/${path}/${params}`
  } else {
    url = `${baseUrl}/${path}`
  }
  const response = await fetch(`${url}`)
  const data = await response.json()
  return data
}

async function postData(data = {}) {
  // Default options are marked with *
  const response = await fetch(`${baseUrl}/items`, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    // headers: {
    //   'Content-Type': 'application/json',
    //   // 'Content-Type': 'application/x-www-form-urlencoded',
    // },
    statusCode: 200,
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // b
  })
  return response // parses JSON response into native JavaScript objects
}


export { baseUrl, fetchQuery, postData }
