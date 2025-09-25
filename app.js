const express = require('express');
const app = express();

app.use(express.static(__dirname));

// index
app.get('/', (_, res) => {
  res.sendFile(__dirname + "/index.html");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
