export default async function handler(req, res) {
  try {
    const key = process.env.ZAFRONIX_API_KEY;

    if (!key) {
      return res.status(500).json({
        error: "Falta ZAFRONIX_API_KEY en Vercel"
      });
    }

    const fecha = req.query.date;

    let url =
      "https://api.zafronix.com/uefa/championsleague/v1/matches?year=2026";

    const respuesta = await fetch(url, {
      headers: {
        "X-API-Key": key
      }
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      return res.status(respuesta.status).json(datos);
    }

    let partidos = datos.data || [];

    if (fecha) {
      partidos = partidos.filter(
        partido => partido.date === fecha
      );
    }

    return res.status(200).json({
      count: partidos.length,
      matches: partidos
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
