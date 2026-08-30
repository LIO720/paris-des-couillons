export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const API_FOOTBALL_KEY = "15a5eabb2d17b76fb922cd808a574779";
  
  const today = new Date().toISOString().split('T')[0];
  const futureDate = new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  try {
    // 1. Recherche par date (prochains mois)
    const url = `https://v3.football.api-sports.io/fixtures?team=85&from=${today}&to=${futureDate}`;
    let response = await fetch(url, { headers: { "x-apisports-key": API_FOOTBALL_KEY } });
    let data = await response.json();

    if (data.response && data.response.length > 0) {
      data.response.sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));
      return res.status(200).json({ response: [data.response[0]] });
    }

    // 2. Secours : derniers matchs si aucun futur trouvé
    const fallbackUrl = "https://v3.football.api-sports.io/fixtures?team=85&last=5";
    response = await fetch(fallbackUrl, { headers: { "x-apisports-key": API_FOOTBALL_KEY } });
    data = await response.json();

    if (data.response && data.response.length > 0) {
      return res.status(200).json({ response: [data.response[0]] });
    }

    return res.status(200).json({ response: [] });
  } catch (e) {
    return res.status(500).json({ error: e.message, response: [] });
  }
}
