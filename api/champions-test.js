export default async function handler(req, res) {
  try {
    return res.status(200).json({
      ok: true,
      mensaje: "champions-test funciona"
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
