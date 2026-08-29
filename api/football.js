export default async function handler(req, res) {
  try {
    const token = process.env.FOOTBALL_DATA_API_TOKEN;

    if (!token) {
      return res.status(500).json({
        error: "Falta configurar FOOTBALL_DATA_API_TOKEN en Vercel."
      });
    }

    const fecha = req.query.date;

    let url = "https://api.football-data.org/v4/matches";

    if (fecha) {
      url += `?dateFrom=${encodeURIComponent(fecha)}&dateTo=${encodeURIComponent(fecha)}`;
    }

    const response = await fetch(url, {
      headers: {
        "X-Auth-Token": token
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Error de football-data.org",
        details: data
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Error interno",
      details: error.message
    });
  }
}
