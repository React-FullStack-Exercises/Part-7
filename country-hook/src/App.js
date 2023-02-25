import React, { useState } from 'react'

import { useField, useCountry } from './hooks'
import Country from './components/Country'

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const [country, findCountry] = useCountry(name)
  
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    findCountry(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      {
        country ?
        <Country country={country} />
        : <div>not found...</div>
      }

      
    </div>
  )
}

export default App