const uri = 'http://localhost:9000/api/v1'


  export const get = async (wallet) => {
    try {
      const response = await fetch(`${uri}/users/${wallet}/activities`)
      return response.json()
    } catch (error) {
      return {}
    }
  }
  export const post = async (wallet,  data) =>  {
    const response = await fetch(`${uri}/users/${wallet}/activities`, {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }
