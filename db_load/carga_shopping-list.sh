curl --location --request POST 'https://codeforce-shopping.herokuapp.com/list' \
--header 'Content-Type: application/json' \
--data-raw '{
    "clientId" : "00000000001",
    "dateNext" : "2022-12-31",
    "products" : [
    ]
}'

curl --location --request POST 'https://codeforce-shopping.herokuapp.com/list' \
--header 'Content-Type: application/json' \
--data-raw '{
    "clientId" : "00000000002",
    "dateNext" : "2022-12-31",
    "products" : []
}'

curl --location --request POST 'https://codeforce-shopping.herokuapp.com/list' \
--header 'Content-Type: application/json' \
--data-raw '{
    "clientId" : "00000000003",
    "dateNext" : "2022-12-31",
    "products" : []
}'