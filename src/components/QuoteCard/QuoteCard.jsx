import { useEffect, useState } from 'react'
import { fetchQuoteFromAPI } from '../../services/quoteService'

function QuoteCard() {
  const [quote, setQuote] = useState(null)

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
    <div>
      {!quote ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>{quote.text}</p>
          <p>- {quote.author}</p>
        </div>
      )}
    </div>
  );
}

export default QuoteCard