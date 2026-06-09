export default async function handler(req, res) {
    const response = await fetch('https://api.football-data.org/v4/competitions/PL/matches', {
      headers: {
        'X-Auth-Token': process.env.VITE_FOOTBALL_API_KEY
      }
    })
  
    const data = await response.json()
    res.status(200).json(data)
  }