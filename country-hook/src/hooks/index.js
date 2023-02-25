import { useState } from "react"
import axios from "axios"


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const findCountry = async (Cname) => {

    try{
      await axios
        .get(`https://restcountries.com/v3.1/name/${Cname}?fullText=true`)
        .then(response => {
          setCountry(response.data);
        })
    } catch (error){
      setCountry(null)
    }
  };

  return [country, findCountry]
}
