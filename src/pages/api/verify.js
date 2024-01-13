// `pages/api/verify.js`
// this is an example of a next.js api route
// this code runs on the server
const endpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const secret = '0x4AAAAAAAP8-qyaCeZVoIuSriJJXDa43Qc'

export default async function handler(request, response) {
  const body = `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(request.body.token)}`

  const res = await fetch(endpoint, {
    method: 'POST',
    body,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })

  const data = await res.json()
  return response.json(data)
}