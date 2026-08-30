export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const API_FOOTBALL_KEY = "15a5eabb2d17b76fb922cd808a574779";
  const url = "https://v3.football.api-sports.io/fixtures?league=61&season=2026&team=85&next=1";

  try {
    const response = await fetch(url, {
      headers: { "x-apisports-key": API_FOOTBALL_KEY }
    });
    const data = await response.json();
    return res.status(200).json({
      statusHttp: response.status,
      urlTestee: url,
      contenuApi: data
    });
  } catch (e) {
    return res.status(500).json({ erreurInterne: e.message });
  }
}
