import { useEffect, useState } from 'react'

const Currency = () => {
  const [baseCurrency, setBaseCurrency] = useState('eur')
  const [secondCurrency, setSecondCurrency] = useState('usd')
  const [conversionRate, setConversionRate] = useState(null)
  const [amount, setAmount] = useState(0)
  const [convertedResult, setConvertedResult] = useState(null)

  useEffect(() => {
    if (!amount || amount === 0) {
      return
    }

    const controller = new AbortController()

    const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`

    const fetchData = async () => {
      try {
        setConversionRate(null)

        const res = await fetch(URL, { signal: controller.signal })

        if (!res.ok) {
          throw new Error('Something went wrong!')
        }

        const data = await res.json()

        if (data.Response === 'False') {
          throw new Error('conversion rate not found')
        }

        setConversionRate(data[baseCurrency][secondCurrency])
        const result = (amount * conversionRate).toFixed(2)
        setConvertedResult(result)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [amount, baseCurrency, conversionRate, secondCurrency])

  return (
    <>
      <input
        type='number'
        name='amount'
        id='amount'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        name='baseCurrency'
        id='baseCurrency'
        value={baseCurrency}
        onChange={(e) => setBaseCurrency(e.target.value)}
      >
        <option value='eur'>Euro</option>
        <option value='usd'>US Dollar</option>
        <option value='gbp'>British Pound</option>
      </select>
      <select
        name='secondCurrency'
        id='secondCurrency'
        value={secondCurrency}
        onChange={(e) => setSecondCurrency(e.target.value)}
      >
        <option value='usd'>US Dollar</option>
        <option value='eur'>Euro</option>
        <option value='gbp'>British Pound</option>
      </select>

      <div>
        {convertedResult && (
          <p style={{ fontSize: '20px', marginTop: '10px' }}>
            {amount} {baseCurrency} = {convertedResult} {secondCurrency}
          </p>
        )}
      </div>
    </>
  )
}

export default Currency
