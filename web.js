const app = require('./app')

const PORT = 8001

app.listen(PORT, () => {
  console.log(`On http://localhost:${PORT}`);
})