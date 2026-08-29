export default async function handler(req, res) {
  try {
    const token = process.env.ZAFRONIX_API_KEY;

    if (!token) {
      return res.status(500).json({
        error: "Falta configurar ZAFRONIX_API_KEY en Vercel."
      });
    }

    const response = await fetch(
      "https://api.zafronix.com/uefa/championsleague/v1/matches?year=2026",
      {
        headers: {
          "X-API-Key": token
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
