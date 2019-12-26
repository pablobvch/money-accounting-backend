Money account

Clone project and initilize by runing npm start on the console.

```
 npm start

> money-accounting@1.0.0 start C:\Git-projects\money-accounting
> node index.js

Example app listening on port 8080
```

Requests

HEADER Content-type: application/JSON
Request: GET
Descriptions: Get All Transactions
url: http://localhost:8080/api

Example Response

```
{
    "transactions": [
        {
            "id": 1,
            "type": "credit",
            "amount": 50,
            "effectiveDate": "2019-12-25T23:48:44.696Z"
        },
        {
            "id": 2,
            "type": "debit",
            "amount": 50,
            "effectiveDate": "2019-12-25T23:48:52.710Z"
        }
    ],
    "balance": 0
}
```

Requests

HEADER Content-type: application/JSON
Request: POST
Descriptions: Get All Transactions
url: http://localhost:8080/api

Example Body

```
{
  "type":"debit",
  "amount":500
}

Default response

{
    "balance": 500
}
```

Error Case
Debit higher than balance

```
{
"message": "The balance cannot be negative. Transaction declined."
}
```
