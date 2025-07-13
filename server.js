const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/cupons', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'cupons.json');
  const data = fs.readFileSync(filePath, 'utf8');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.post('/api/adicionar-cupom', (req, res) => {
  const { titulo, descricao, imagem, link, cupom } = req.body;

  if (!titulo || !descricao || !imagem || !link || !cupom) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const novoCupom = { titulo, descricao, imagem, link, cupom };
  const filePath = path.join(__dirname, 'data', 'cupons.json');
  const data = fs.readFileSync(filePath, 'utf8');
  const cupons = JSON.parse(data);
  cupons.push(novoCupom);
  fs.writeFileSync(filePath, JSON.stringify(cupons, null, 2), 'utf8');
  res.json({ mensagem: 'Cupom adicionado com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
