const express = require('express')
const server = express()
const http = require('http')
const env = require('dotenv').config()
const martaapi = "http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=" + process.env.API_KEY

server.use(express.static('public'))

server.get("/", (req, res) => {
       res.sendFile(__dirname + '/index.html');
});

server.get("/marta", (req, sres) => {
       var data = new Buffer('');
       http.get(martaapi, (res) => {
          res.on('data', (d) => {
              data = Buffer.concat([data, d]);
          });
          res.on('end', (d) => {
              sres.send(data.toString())
          });
        }).on('error', (e) => {
            sres.send(e)
        })
});

const port = 4000;
server.listen(port, () => {
        console.log(`Server listening at ${port}`);
});
