import React, { Component } from 'react';

const url = 'http://swapi.co/api/people'

class Starwars extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false,
      people: []
    }
  }
  
  componentWillMount() {
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error("Network request failed")
      }
      return response
    })
    .then( response => response.json() )
    .then( ({results: people}) => this.setState({people})
    , () =>
      this.setState({
        requestFailed: true
      })
    )
  }

  render() {
    if (this.state.requestFailed) return <p>Sorry, request failed!</p>
    if (!this.state.people) return <p>Loading...</p>
    return (
      <div>
      {this.state.people.map(person =>
          <li key={person.name}>{person.name}</li>
      )}
      </div>
    )
  }
}

export default Starwars;
