
const Country = ({ country }) => {

  const countryObject = country[0]

  return (
    <div>
      <h3>{countryObject.name.common} </h3>
      <div>capital {countryObject.capital[0]} </div>
      <div>population {countryObject.population}</div>
      <img src={countryObject.flags.png} height='100' alt={`flag of ${countryObject.name.common}`} />
    </div>
  )
}

export default Country