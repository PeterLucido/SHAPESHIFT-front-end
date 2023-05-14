import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/days`

async function index() {
  try {
    const res = await fetch(BASE_URL, {
      headers: {'Authorization': `Bearer ${tokenService.getToken()}`}
    })
    return res.json()
  } catch (err) {
    console.log(err)    
  }
}

async function show(dayId) {
  try {
    const res = await fetch(`${BASE_URL}/${dayId}`, {
      headers: {'Authorization': `Bearer ${tokenService.getToken()}`}
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

async function create(dayFormData) {
  try{
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dayFormData)
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

async function deleteDay(dayId) {
  try {
    const res = await fetch(`${BASE_URL}/${dayId}`, {
      method: 'DELETE',
      headers: {'Authorization': `Bearer ${tokenService.getToken()}`}
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

async function update(dayFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${dayFormData._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dayFormData)
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}


export {
  index,
  create,
  show,
  deleteDay,
  update,
}