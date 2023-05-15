import { useEffect, useState } from 'react'
import { fetchQuoteFromAPI } from '../../services/quoteService'

function QuoteCard() {
  const [quote, setQuote] = useState(null)

  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await fetchQuoteFromAPI()
        const quoteData = await response.json()
        const randomIndex = Math.floor(Math.random() * quoteData.length)
        const randomQuote = quoteData[randomIndex]
        setQuote(randomQuote)
      } catch (err) {
        console.log(err)
      }
    }
    fetchQuote()
  }, [])

  return (
    <div>
      {quote ? (
        <div>
          <p>{quote.text}</p>
          <p>- {quote.author}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default QuoteCard