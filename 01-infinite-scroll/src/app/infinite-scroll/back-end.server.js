const people = [
  {name: 'Ricardo', last_name: 'Silva'},
  {name: 'Ricardo1', last_name: 'Silva'},
  {name: 'Ricardo2', last_name: 'Silva'},
  {name: 'Ricardo3', last_name: 'Silva'},
  {name: 'Ricardo4', last_name: 'Silva'},
  {name: 'Ricardo5', last_name: 'Silva'},
  {name: 'Ricardo6', last_name: 'Silva'},
  {name: 'Ricardo7', last_name: 'Silva'},
  {name: 'Ricardo8', last_name: 'Silva'},
  {name: 'Ricardo9', last_name: 'Silva'},
  {name: 'Ricardo10', last_name: 'Silva'},
  {name: 'Ricardo11', last_name: 'Silva'},
  {name: 'Ricardo12', last_name: 'Silva'},
  {name: 'Ricardo13', last_name: 'Silva'},
  {name: 'Ricardo14', last_name: 'Silva'},
  {name: 'Ricardo15', last_name: 'Silva'},
  {name: 'Ricardo16', last_name: 'Silva'},
  {name: 'Ricardo17', last_name: 'Silva'},
  {name: 'Ricardo18', last_name: 'Silva'},
  {name: 'Ricardo19', last_name: 'Silva'},
  {name: 'Ricardo', last_name: 'Silva'},
  {name: 'Ricardo1', last_name: 'Silva'},
  {name: 'Ricardo2', last_name: 'Silva'},
  {name: 'Ricardo3', last_name: 'Silva'},
  {name: 'Ricardo4', last_name: 'Silva'},
  {name: 'Ricardo5', last_name: 'Silva'},
  {name: 'Ricardo6', last_name: 'Silva'},
  {name: 'Ricardo7', last_name: 'Silva'},
  {name: 'Ricardo8', last_name: 'Silva'},
  {name: 'Ricardo9', last_name: 'Silva'},
  {name: 'Ricardo10', last_name: 'Silva'},
  {name: 'Ricardo11', last_name: 'Silva'},
  {name: 'Ricardo12', last_name: 'Silva'},
  {name: 'Ricardo13', last_name: 'Silva'},
  {name: 'Ricardo14', last_name: 'Silva'},
  {name: 'Ricardo15', last_name: 'Silva'},
  {name: 'Ricardo16', last_name: 'Silva'},
  {name: 'Ricardo17', last_name: 'Silva'},
  {name: 'Ricardo18', last_name: 'Silva'},
  {name: 'Ricardo19', last_name: 'Silva'},
  {name: 'Ricardo', last_name: 'Silva'},
  {name: 'Ricardo1', last_name: 'Silva'},
  {name: 'Ricardo2', last_name: 'Silva'},
  {name: 'Ricardo3', last_name: 'Silva'},
  {name: 'Ricardo4', last_name: 'Silva'},
  {name: 'Ricardo5', last_name: 'Silva'},
  {name: 'Ricardo6', last_name: 'Silva'},
  {name: 'Ricardo7', last_name: 'Silva'},
  {name: 'Ricardo8', last_name: 'Silva'},
  {name: 'Ricardo9', last_name: 'Silva'},
  {name: 'Ricardo10', last_name: 'Silva'},
  {name: 'Ricardo11', last_name: 'Silva'},
  {name: 'Ricardo12', last_name: 'Silva'},
  {name: 'Ricardo13', last_name: 'Silva'},
  {name: 'Ricardo14', last_name: 'Silva'},
  {name: 'Ricardo15', last_name: 'Silva'},
  {name: 'Ricardo16', last_name: 'Silva'},
  {name: 'Ricardo17', last_name: 'Silva'},
  {name: 'Ricardo18', last_name: 'Silva'},
  {name: 'Ricardo19', last_name: 'Silva'},
  {name: 'Ricardo', last_name: 'Silva'},
  {name: 'Ricardo1', last_name: 'Silva'},
  {name: 'Ricardo2', last_name: 'Silva'},
  {name: 'Ricardo3', last_name: 'Silva'},
  {name: 'Ricardo4', last_name: 'Silva'},
  {name: 'Ricardo5', last_name: 'Silva'},
  {name: 'Ricardo6', last_name: 'Silva'},
  {name: 'Ricardo7', last_name: 'Silva'},
  {name: 'Ricardo8', last_name: 'Silva'},
  {name: 'Ricardo9', last_name: 'Silva'},
  {name: 'Ricardo10', last_name: 'Silva'},
  {name: 'Ricardo11', last_name: 'Silva'},
  {name: 'Ricardo12', last_name: 'Silva'},
  {name: 'Ricardo13', last_name: 'Silva'},
  {name: 'Ricardo14', last_name: 'Silva'},
  {name: 'Ricardo15', last_name: 'Silva'},
  {name: 'Ricardo16', last_name: 'Silva'},
  {name: 'Ricardo17', last_name: 'Silva'},
  {name: 'Ricardo18', last_name: 'Silva'},
  {name: 'Ricardo19', last_name: 'Silva'}
];

let init = 0;
let end = 10;

const express = require("express");

const app = express();

app.use(express.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", '*');
    res.header("Access-Control-Allow-Methods", '*');
    next();
})

app.get("/pessoas", (req, res) => {

  const lista = people.slice(init, end);
  init += 10;
  end += 10;

  res.status(200).json(lista);
});

app.listen(3030, () => {
  console.log('server working');
});
