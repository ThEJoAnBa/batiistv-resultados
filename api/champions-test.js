export default async function handler(req, res) {
  try {
    const key = process.env.ZAFRONIX_API_KEY;

    if (!key) {
      return res.status(500).json({
        error: "Falta ZAFRONIX_API_KEY en Vercel"
      });
    }

    const respuesta = await fetch(
      "https://api.zafronix.com/uefa/championsleague/v1/matches?limit=500&order=desc",
      {
        headers: {
          "X-API-Key": key
        }
      }
    );

    const datos = await respuesta.json();

    return res.status(200).json({
      cantidad: datos.data?.length || 0,
      ultimo: datos.data?.slice(-5) || [],
      primero: datos.data?.slice(0, 5) || []
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
