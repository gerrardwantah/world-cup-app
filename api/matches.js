export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
    if (req.method === 'OPTIONS') {
      return res.status(200).end()
    }
  
    const response = await fetch('https://api.football-data.org/v4/competitions/WC/matches', {
      headers: {
        'X-Auth-Token': process.env.VITE_FOOTBALL_API_KEY
      }
    })
  
    const data = await response.json()
    res.status(200).json(data)
  }