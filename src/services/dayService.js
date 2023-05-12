import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/days`

async function index() {

}

async function create() {

}

async function show(dayId) {
  try {
    const res = await fetch(`{BASE_URL/${dayId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}`}
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

export {
  show
}