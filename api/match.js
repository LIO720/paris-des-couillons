export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const API_FOOTBALL_KEY = "15a5eabb2d17b76fb922cd808a574779";
  
  // La saison 2025 correspond à la saison 2025/2026 sur l'API-Football
  const urls = [
    "https://v3.football.api-sports.io/fixtures?team=85&season=2025&next=1",
    "https://v3.football.api-sports.io/fixtures?team=85&season=2025",
    "https://v3.football.api-sports.io/fixtures?team=85&next=1"
  ];

  for (let url of urls) {
    try {
      const response = await fetch(url, {
        headers: { "x-apisports-key": API_FOOTBALL_KEY }
      });
      const data = await response.json();
      
      if (data.response && data.response.length > 0) {
        const now = new Date();
        const futureMatches = data.response.filter(m => new Date(m.fixture.date) > now);
        
        if (futureMatches.length > 0) {
          futureMatches.sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));
          return res.status(200).json({ response: [futureMatches[0]] });
        } else if (url.includes("next=1")) {
          return res.status(200).json({ response: [data.response[0]] });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  return res.status(200).json({ response: [] });
}
