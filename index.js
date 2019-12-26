const bodyParser = require("body-parser");
const express = require("express");
const moment = require("moment");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

const transactionType = {
  debit: "debit",
  credit: "credit"
};

let account = {
  transactions: [],
  balance: 0
};

app.get("/api", function(req, res) {
  res.json(account);
});

app.get("/api/:id", function(req, res) {
  const found = account.transactions.find(
    transaction => transaction.id == req.params.id
  );
  res.json(found);
});

const getTransaction = function(req) {
  return {
    id: account.transactions.length + 1,
    type: req.body.type,
    amount: req.body.amount,
    effectiveDate: moment()
  };
};

app.post("/api", function(req, res) {
  if (req.body.type === transactionType.credit) {
    account.balance += req.body.amount;
    account.transactions.push(getTransaction(req));
  } else {
    if (req.body.type === transactionType.debit) {
      if (account.balance < req.body.amount) {
        return res.status(400).send({
          message: "The balance cannot be negative. Transaction declined."
        });
      }
      account.balance -= req.body.amount;
      account.transactions.push(getTransaction(req));
    }
  }
  res.json({ balance: account.balance });
});

app.listen(8080, function() {
  console.log("Example app listening on port 8080");
});
