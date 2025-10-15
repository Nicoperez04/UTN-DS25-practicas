import app from "./app";

// Para poder hacer los supertest de integracion lo separamos del app.ts
const PORT = Number(process.env.PORT) || 3000
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})