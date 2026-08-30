export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const API_FOOTBALL_KEY = "15a5eabb2d17b76fb922cd808a574779";
  
  // On récupère tous les matchs du PSG pour la saison en cours
  const url = "https://v3.football.api-sports.io/fixtures?team=85&season=2026";

  try {
    const response = await fetch(url, {
      headers: { "x-apisports-key": API_FOOTBALL_KEY }
    });
    const data = await response.json();
    
    if (data.response && data.response.length > 0) {
      const now = new Date();
      // On filtre pour garder uniquement les matchs futurs
      const futureMatches = data.response.filter(m => new Date(m.fixture.date) > now);
      
      if (futureMatches.length > 0) {
        futureMatches.sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));
        return res.status(200).json({ response: [futureMatches[0]] });
      } else {
        // S'il n'y a pas de match futur, on renvoie le dernier match de la liste pour tester l'affichage
        return res.status(200).json({ response: [data.response[data.response.length - 1]] });
      }
    }
    
    return res.status(200).json({ response: [] });
  } catch (e) {
    return res.status(500).json({ error: e.message, response: [] });
  }
}
