

const uri = 'http://localhost:9000/api/v1'

export const create = async (wallet) => {
  const req = await fetch(`${uri}/users`, {
    method: 'POST',
    headers: {
      'content-type' : 'application/json'
    },
    body: JSON.stringify({wallet})
  })
  const resp = await req.json();
  return resp
   
}

export const get = async (wallet) => {
  const req = await fetch(`${uri}/users/${wallet}`)
    const response = await req.json();
    return response
}

export const update = async (wallet, {data}) => {

} 

export const archive = async (wallet) => {

}


export const activities = async (wallet) => {
  
}