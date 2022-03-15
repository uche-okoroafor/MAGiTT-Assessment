export const createCompanyProfile = async (
  companyName,
  address,
  email,
  contact,
  location,
  username
) => {
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      companyName,
      address,
      email,
      contact,
      location,
      username
    }),
    credentials: 'include'
  }
  return await fetch(`/company/create/profile`, fetchOptions)
    .then(res => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' }
    }))
}

export const fetchAllCompany = async () => {
  const fetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  }
  return await fetch(`/company/fetch/companies`, fetchOptions)
    .then(res => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' }
    }))
}

export const fetchCompanyData = async companyId => {
  const fetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  }

  return await fetch(`/company/fetch/data/${companyId}`, fetchOptions)
    .then(res => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' }
    }))
}

export const sendConnectionRequest = async ({
  requesterName,
  requesterId,
  requesterAddress,
  requesterLocation,
  recipientName,
  recipientId,
  recipientAddress,
  recipientLocation
}) => {
  const fetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requesterName,
      requesterId,
      requesterAddress,
      requesterLocation,
      recipientName,
      recipientId,
      recipientAddress,
      recipientLocation
    }),
    credentials: 'include'
  }
  return await fetch(`/company/request/connection`, fetchOptions)
    .then(res => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' }
    }))
}

export const acceptConnectionRequest = async ({
  requesterName,
  requesterId,
  requesterAddress,
  requesterLocation,
  recipientName,
  recipientId,
  recipientAddress,
  recipientLocation,
  _id
}) => {
  const fetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requesterName,
      requesterId,
      requesterAddress,
      requesterLocation,
      recipientName,
      recipientId,
      recipientAddress,
      recipientLocation,
      requestId: _id
    }),
    credentials: 'include'
  }
  return await fetch(`/company/accept/connection`, fetchOptions)
    .then(res => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' }
    }))
}

export const rejectConnectionRequest = async ({
  requesterId,
  recipientId,
  _id
}) => {
  const fetchOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requesterId,
      recipientId,
      requestId: _id
    }),
    credentials: 'include'
  }
  return await fetch(`/company/reject/connection`, fetchOptions)
    .then(res => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' }
    }))
}

export const removeConnection = async ({
  companyId,
  connectedCompanyId,
  connectionId
}) => {
  const fetchOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      companyId,
      connectedCompanyId,
      connectionId
    }),
    credentials: 'include'
  }
  return await fetch(`/company/remove/connection`, fetchOptions)
    .then(res => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' }
    }))
}
export const addUserToCompany = async ({
  username,
  userId,
  occupation,
  email,
  companyName,
  companyId
}) => {
  const fetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      userId,
      occupation,
      email,
      companyName,
      companyId
    }),
    credentials: 'include'
  }
  return await fetch(`/company/add/user`, fetchOptions)
    .then(res => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' }
    }))
}

export const removeUser = async ({ companyId, userId }) => {
  const fetchOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      companyId,
      userId
    }),
    credentials: 'include'
  }
  return await fetch(`/company/remove/user`, fetchOptions)
    .then(res => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' }
    }))
}
