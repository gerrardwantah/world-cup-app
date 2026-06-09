import { useState, useEffect } from 'react'

function App() {
  const [fixtures, setFixtures] = useState([])

  useEffect(() => {
    const url = import.meta.env.DEV 
      ? 'https://world-cup-app-nine.vercel.app/api/matches'
      : '/api/matches'
      
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setFixtures(data.matches)
      })
  }, [])

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h1 className="text-white text-4xl font-bold mb-8">World Cup 2026</h1>
      {fixtures.map(match => (
        <div key={match.id} className="bg-white rounded-lg p-4 mb-4">
          <p className="text-gray-500 text-sm">
            {new Date(match.utcDate).toLocaleDateString()} {new Date(match.utcDate).toLocaleTimeString()}
          </p>
          <p className="text-xl font-bold my-2">
            {match.homeTeam.name} vs {match.awayTeam.name}
          </p>
          <p className="text-sm text-blue-500">{match.status}</p>
        </div>
      ))}
    </div>
  )
}

export default App