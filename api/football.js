export default async function handler(req, res) {
  try {
    const apiKey = process.env.FOOTBALLDATA_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Falta configurar FOOTBALLDATA_API_KEY en Vercel."
      });
    }

    const response = await fetch(
      "https://api.football-data.io/v1/matches",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message
    });
  }
}
