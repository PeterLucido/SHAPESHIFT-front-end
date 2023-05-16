import { useEffect, useState } from 'react'
import { fetchQuoteFromAPI } from '../../services/quoteService'

function QuoteCard() {
  const [quote, setQuote] = useState()

  useEffect(() => {
    const fetchQuote = async () => {
      const quoteData = await fetchQuoteFromAPI()
      const randomIndex = Math.floor(Math.random() * quoteData.length)
      const randomQuote = quoteData[randomIndex]
      setQuote(randomQuote)
    }
    fetchQuote()
  }, [])

  return (
    <div className="quote-container">
      {!quote ? (
        <p>Inspiration coming in hot...</p>
      ) : (
        <div>
          <p>{quote.text}</p>
          <p>- {quote.author}</p>
        </div>
      )}
    </div>
  )
}

export default QuoteCard