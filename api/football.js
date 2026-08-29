export default async function handler(req, res) {
  try {
    const token = process.env.FOOTBALL_DATA_API_TOKEN;

    if (!token) {
      return res.status(500).json({
        error: "Falta configurar FOOTBALL_DATA_API_TOKEN en Vercel."
      });
    }

    const fecha =
      req.query.date ||
      new Date().toISOString().slice(0, 10);

    const competiciones = [
  "PL",
  "PD",
  "CL",
  "EL",
  "BL1",
  "SA",
  "FL1",
  "DED",
  "PPL",
  "BSA"
];
    const competenciaPrueba = req.query.competition;

const listaCompeticiones = competenciaPrueba
  ? [competenciaPrueba]
  : competiciones;
    const resultados = await Promise.all(
      listaCompeticiones.map(async (codigo) => {

        const url =
          `https://api.football-data.org/v4/competitions/${codigo}/matches?dateFrom=${fecha}&dateTo=${fecha}`;

        const respuesta = await fetch(url, {
          headers: {
            "X-Auth-Token": token
          }
        });

        if (!respuesta.ok) {
          return [];
        }

        const datos = await respuesta.json();

        return datos.matches || [];
      })
    );

    const matches =
      resultados.flat();

    return res.status(200).json({
      resultSet: {
        count: matches.length
      },
      matches
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Error interno",
      details: error.message
    });
  }
}
