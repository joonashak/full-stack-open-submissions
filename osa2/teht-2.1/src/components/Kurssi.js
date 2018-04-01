import React from 'react'

const Kurssi = ({ kurssi }) =>
  <div>
    <Otsikko text={ kurssi.nimi } />
    <Sisalto osat={ kurssi.osat } />
  </div>

const Otsikko = ({ text }) => <h2>{ text }</h2>

const Sisalto = ({ osat }) =>
  <div>
    <Osat osat={ osat } />
    <Yhteensa osat={ osat } />
  </div>

const Osat = ({ osat }) => 
  osat.map(({ nimi, tehtavia, id }) => <Osa nimi={ nimi } tehtavia={ tehtavia } key={ id } />)

const Osa = ({ nimi, tehtavia }) => <p>{ nimi } { tehtavia }</p>

const Yhteensa = ({ osat }) => 
  <p>Yhteensä { osat.reduce((prev, curr) => prev + curr.tehtavia, 0) } tehtävää</p>

export default Kurssi