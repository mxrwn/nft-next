

const uri = 'http://localhost:9000/api/v1'

export const create = async (wallet) => {
  const req = await fetch(`${uri}/users`, {
    method: 'POST',
    headers: {
      'content-type' : 'application/json'
    },
    body: JSON.stringify({wallet})
  })
  return await req.json()
  
}

export const get = async (id = undefined) => {

}

export const update = async (wallet, {data}) => {

} 

export const archive = async (wallet) => {

}
