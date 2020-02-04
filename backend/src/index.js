const express = require('express');

const app = express();
const port = process.env.PORT | 4000;

app.get('/', (req,res) => {
  res.status(200).json({msg: "ok"});
});

app.listen(port, (err, req, res, next) => {
  console.log(`Server running at port ${port}...`)
});
