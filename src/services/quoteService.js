const BASE_URL='https://type.fit/api/quotes'


export async function fetchQuoteFromAPI() {
  try {
    const res = await fetch(BASE_URL)
    return res.json()
  } catch (err) {
    console.log(err)
  }
}