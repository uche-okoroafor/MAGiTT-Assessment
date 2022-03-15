const logoutAPI = async () => {
  const fetchOptions = {
    method: 'GET',
    credentials: 'include'
  }
  return await fetch(`/auth/logout`, fetchOptions)
    .then(res => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' }
    }))
}

export default logoutAPI
