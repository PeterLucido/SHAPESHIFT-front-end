const BASE_URL='https://type.fit/api/quotes'

async function fetchQuoteFromAPI() {
  const res = await fetch(BASE_URL)
  return res.json()
}

export {
  fetchQuoteFromAPI
}