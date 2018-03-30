import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => ( <h1>{props.name}</h1> )

const Osa = (props) => ( <p>{props.osa.nimi} {props.osa.tehtavia}</p> )

const Sisalto = (props) => (
  <div>
    <Osa osa={props.osat[0]} />
    <Osa osa={props.osat[1]} />
    <Osa osa={props.osat[2]} />
  </div>
)

const Yhteensa = (props) => {
  const count = props.osat.reduce((prev, curr) => prev + curr.tehtavia, 0)

  return ( <p>yhteensä {count} tehtävää</p> )
} 

const Kurssi = (props) => (
  <div>
    <Otsikko name={props.kurssi.nimi} />
    <Sisalto osat={props.kurssi.osat} />
    <Yhteensa osat={props.kurssi.osat} />
  </div>
)

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)