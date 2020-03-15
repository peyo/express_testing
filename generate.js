const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("common"));

app.get('/generate', (req, res) => {
  // get n from the query string in the request
  const { n } = req.query;

  // coerce n to a numeric value
  const num = parseInt(n);

  if (isNaN(num)) {
    return res
      .status(400)
      .send('Invalid request');
  }

  // generate array [1..n]
  const initial = Array(num)
    .fill(1)
    .map((_, i) => i + 1);

  // shuffle the array
  initial.forEach((e, i) => {
    let ran = Math.floor(Math.random() * num);
    let temp = initial[i];
    initial[i] = initial[ran];
    initial[ran] = temp;
  })

  res.json(initial);
});

module.exports = app;