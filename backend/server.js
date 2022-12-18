const express =  require('express');
const  app =  express();
const axios = require('axios');

const port = process.env.PORT || 5000;

app.get("/node/$metadata?sap-language=EN", function (req, res) {
    res.send("Hello world! Cloud Foudnry Node Js Demo");
});


app.get("/", function (req, res) {
    res.send("Hello world! Cloud Foudnry Node Js Demo");
  });

app.get("/getToDo", function (req, res) {
    axios.get('https://gorest.co.in/public/v2/todos',{
        headers: { "Accept-Encoding": "gzip,deflate,compress" }})
    .then(function (response) {
      this.send(response.data)
    }.bind(res))
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
    
});

app.get("/getListOfAlbums", function (req, res) {
    axios.get('https://jsonplaceholder.typicode.com/albums',{
    headers: { "Accept-Encoding": "gzip,deflate,compress" }})
    .then(function (response) {
      this.send(response.data)
    }.bind(res))
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
    
});


app.listen(port, function () {
    console.log("app listening at port " + port);
  });
