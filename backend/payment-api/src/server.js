const app  = require('./app');

const SERVICE_PORT = process.env.PORT ? process.env.PORT : 8080;

app.listen(SERVICE_PORT, () =>{
    console.log(`Node server listening on port ${SERVICE_PORT}!`);
});