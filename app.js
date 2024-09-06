const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use(express.static(__dirname));

// index
app.get('/', (_, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Proxy configuration
// app.use('/api/amos-game-statistics', createProxyMiddleware({
//   target: 'http://odevzdavani.tourdeapp.cz:1337',  // Your HTTP API
//   changeOrigin: true,  // Needed for virtual hosted sites
//   secure: false,       // Ignore SSL certificates (useful for self-signed certificates)
// }));

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
