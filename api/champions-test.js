export default async function handler(req, res) {
  try {
    const key = process.env.ZAFRONIX_API_KEY;

    if (!key) {
      return res.status(500).json({
        error: "Falta ZAFRONIX_API_KEY en Vercel"
      });
    }

    const respuesta = await fetch(
      "https://api.zafronix.com/uefa/championsleague/v1/matches?season=2026",
      {
        headers: {
          "X-API-Key": key
        }
      }
    );

    const datos = await respuesta.json();

    return res.status(200).json(
  datos.data?.[0] || {}
);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
