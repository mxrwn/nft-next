const uri = 'http://localhost:9000/api/v1'

export const get = async () => {
  try {
    const response = await fetch(`${uri}/categories/`)
    return response.json()
  } catch (error) {
    return {}
  }
}

export const getCategory = async (name) => {
  try {
    const response = await fetch(`${uri}/categories/${name}`)
    return response.json()
  } catch (error) {
    return {}
  }
}