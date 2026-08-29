export default async function handler(req, res) {
  const token = process.env.FOOTBALL_DATA_API_TOKEN;

  if (!token) {
    return res.status(500).json({
      error: "No se encontró FOOTBALL_DATA_API_TOKEN"
    });
  }

  try {
    const response = await fetch(
      "https://api.football-data.org/v4/matches",
      {
        method: "GET",
        headers: {
          "X-Auth-Token": token
        }
      }
    );

    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
