export const fetchAllUser = async () => {
  const fetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  }
  return await fetch(`/user/fetch/all-users`, fetchOptions)
    .then(res => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' }
    }))
}

export const searchEmail = async search => {
  const fetchOptions = {
    method: 'GET',
    credentials: 'include'
  }
  return await fetch(`/user?search=${search}`, fetchOptions)
    .then(res => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' }
    }))
}
