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
      <h1>World Cup 2026</h1>
      {fixtures.map(match => (
        <div key={match.id}>
          <p>{new Date(match.utcDate).toLocaleDateString()}</p>
          <p>
            {match.homeTeam.name} vs {match.awayTeam.name}
          </p>
          <p>{match.status}</p>
        </div>
      ))}
    </div>
  )
}

export default App