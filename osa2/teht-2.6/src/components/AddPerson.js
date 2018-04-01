import React from 'react'

class AddPerson extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      newName: '',
      newNumber: '',
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.addPerson }>
          <p>
            Nimi: &nbsp;
            <input 
              value={ this.state.newName }
              onChange={ this.handleInputChange('newName') }
            />
          </p>
          <p>
            Numero: &nbsp;
            <input 
              value={ this.state.newNumber }
              onChange={ this.handleInputChange('newNumber') }
            />
          </p>
          <button type="submit">Lisää</button>
        </form>
      </div>
    )
  }

  handleInputChange = type => event => this.setState({ [type]: event.target.value })

  addPerson = event => {
    event.preventDefault()

    this.props.action({
      name: this.state.newName,
      number: this.state.newNumber,
    })

    this.setState({
      newName: '',
      newNumber: '',
    })
  }
}

export default AddPerson