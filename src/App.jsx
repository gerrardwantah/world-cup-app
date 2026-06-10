import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import Auth from './Auth'

function App() {
  const [fixtures, setFixtures] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
  }, [])

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

  if (!user) return <Auth />

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-white text-4xl font-bold">🏆 World Cup 2026</h1>
          <button
            onClick={() => supabase.auth.signOut()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>

        {fixtures.map(match => (
          <div key={match.id} className="bg-gray-800 rounded-xl p-6 mb-4">
            <div className="flex justify-between text-gray-400 text-sm mb-4">
              <span>{match.stage.replace(/_/g, ' ')}</span>
              <span>
                {new Date(match.utcDate).toLocaleDateString()} • {new Date(match.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 w-2/5 justify-end">
                <p className="text-white font-bold text-lg text-right">{match.homeTeam.name}</p>
                <img src={match.homeTeam.crest} alt={match.homeTeam.name} className="w-8 h-8 object-contain" />
              </div>
              
              <div className="text-center w-1/5">
                {match.status === 'FINISHED' || match.status === 'IN_PLAY' ? (
                  <p className="text-white font-bold text-2xl">
                    {match.score.fullTime.home} - {match.score.fullTime.away}
                  </p>
                ) : (
                  <p className="text-gray-400 font-bold text-xl">vs</p>
                )}
              </div>

              <div className="flex items-center gap-3 w-2/5">
                <img src={match.awayTeam.crest} alt={match.awayTeam.name} className="w-8 h-8 object-contain" />
                <p className="text-white font-bold text-lg">{match.awayTeam.name}</p>
              </div>
            </div>

            <div className="text-center mt-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                match.status === 'FINISHED' ? 'bg-green-800 text-green-200' :
                match.status === 'IN_PLAY' ? 'bg-red-600 text-white' :
                'bg-gray-700 text-gray-300'
              }`}>
                {match.status === 'IN_PLAY' ? '🔴 LIVE' : match.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App