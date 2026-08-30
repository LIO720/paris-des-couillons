export default async function handler(req, res) {
  const API_FOOTBALL_KEY = "15a5eabb2d17b76fb922cd808a574779";
  const urls = [
    "https://v3.football.api-sports.io/fixtures?league=61&season=2026&team=85&next=1",
    "https://v3.football.api-sports.io/fixtures?team=85&next=1",
    "https://v3.football.api-sports.io/fixtures?team=85&season=2026"
  ];

  for (let url of urls) {
    try {
      const response = await fetch(url, {
        headers: { "x-apisports-key": API_FOOTBALL_KEY }
      });
      const data = await response.json();
      if (data.response && data.response.length > 0) {
        return res.status(200).json(data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return res.status(200).json({ response: [] });
}
