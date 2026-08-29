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
  url += `?dateFrom=${fecha}&dateTo=${fecha}`;
}

const response = await fetch(
  url,
  {
    headers: {
      "X-Auth-Token": token
    }
  }
);
      {
        headers: {
          "X-Auth-Token": token
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
