const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/hello', (req, res) => {
  res.json({ mensagem: 'Site rodando no Render com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});