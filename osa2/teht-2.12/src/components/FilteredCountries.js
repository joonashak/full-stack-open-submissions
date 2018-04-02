import React from 'react'
import axios from 'axios'

class FilteredCountries extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      countries: [],
      selectedCountry: null,
    }
  }

  render() {
    const visibleCountries = this.state.countries
      .filter(c => c.name.toLowerCase().includes(this.props.filter.toLowerCase()))

    let content;
    if (this.state.selectedCountry != null) {
      content = <Country country={ this.state.selectedCountry } />
    } else if (visibleCountries.length === 1) {
      content = <Country country={ visibleCountries[0] } />
    } else if (visibleCountries.length < 10) {
      content = <CountryList countries={ visibleCountries } action={ this.selectCountry } />
    } else {
      content = <p>Start typing to narrow down the results...</p>
    }

    return (
      <div>
        { content }
      </div>
    )
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then( res => this.setState({ countries: res.data }))
  }

  selectCountry = selectedCountry => () => this.setState({ selectedCountry })
}

const CountryList = ({ countries, action }) =>
  <div>
    { countries.map(c => <CountryListItem country={ c } action={ action } key={ c.name } />) }
  </div>

const CountryListItem = ({ country, action }) => 
<p onClick={ action(country) }>
  { country.name }
</p>

const Country = ({ country }) =>
  <div>
    <h3>{ country.name } - { country.nativeName }</h3>
    <p>Capital: { country.capital }</p>
    <p>Population: { country.population }</p>
    <p>
      <img 
        src={ country.flag } 
        width="200" 
        style={{ border: '1px solid black' }} 
        alt={ country.name }
      />
    </p>
  </div>

export default FilteredCountries
