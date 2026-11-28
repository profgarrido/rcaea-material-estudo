// primeira-busca.ts
// Arquivo didatico para ilustrar o comportamento da analise estatica.
// Nao faz parte do projeto avaliado.

import express from 'express';
const app = express();

// Rota de ping — console.log deve ser sinalizado
app.get('/ping', (req, res) => {
  const name = req.query.name as string;
  console.log('Requisicao recebida de:', name);  // deve ser sinalizado
  res.json({ message: 'pong', user: name });     // deve ser sinalizado
});

// Rota de saude — res.json deve ser sinalizado
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });  // deve ser sinalizado
});

// Funcao auxiliar sem chamadas mapeadas pelas regras — nao deve ser sinalizada
function calcular(a: number, b: number): number {
  return a + b;
}

export { app, calcular };
