import { useState, useEffect } from 'react'

function App() {
  const [fixtures, setFixtures] = useState([])

  useEffect(() => {
    fetch('/api/matches')
      .then(res => res.json())
      .then(data => {
        setFixtures(data.matches)
      })
  }, [])

  return (
    <div>
      <h1>World Cup App</h1>
      {fixtures.map(match => (
        <div key={match.id}>
          <p>
            {match.homeTeam.name} vs {match.awayTeam.name}
          </p>
        </div>
      ))}
    </div>
  )
}

export default App