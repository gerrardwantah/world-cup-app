import { useState, useEffect } from 'react'

function App() {
  const [fixtures, setFixtures] = useState([])

  useEffect(() => {
    fetch('https://api.football-data.org/v4/competitions/WC/matches', {
      headers: {
        'X-Auth-Token': import.meta.env.VITE_FOOTBALL_API_KEY
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setFixtures(data.matches)
      })
  }, [])

  return (
    <div>
      <h1>World Cup App</h1>
      <p>Check the console for data!</p>
    </div>
  )
}

export default App