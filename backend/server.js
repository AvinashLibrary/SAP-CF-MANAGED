const express = require('express');
const app = express();
const axios = require('axios');
const passport = require('passport');
const { JWTStrategy } = require('@sap/xssec');
const xsenv = require('@sap/xsenv');
xsenv.loadEnv();
// XSUAA Middleware
const serviceBindings = xsenv.getServices({ uaa: { tag: 'xsuaa' } });
const UAA_CREDENTIALS = serviceBindings.uaa;
passport.use(new JWTStrategy(UAA_CREDENTIALS));

app.use(passport.initialize());
app.use(passport.authenticate('JWT', { session: false }));
app.use(express.json());
app.use(logJwtMiddle)

app.get("/loadFeatureFlag", async function (req, res) {
  const featureFlagBindings = await xsenv.getServices({ feature: { tag: 'feature-flags' } });
  axios.get(featureFlagBindings.feature.uri + "/api/v2/evaluate/flag-name-1", {
    headers: { "Authorization": `Basic ${Buffer.from(`${featureFlagBindings.feature.username}:${featureFlagBindings.feature.password}`).toString("base64")}` }
  }).then(function (response) {
    this.send(response.data)
  }.bind(res))
    .catch(function (error) {
      // handle error
      this.send(error);
    })
    .finally(function () {
      // always executed
    });
  })


  function logJwtMiddle(req, res, next) {
    const tokenEncoded = req.headers["authorization"].substring(7)
    let jwtBase64Encoded = tokenEncoded.split('.')[1]
    let jwtDecodedAsString = Buffer.from(jwtBase64Encoded, 'base64').toString('ascii')
    let jwtDecoded = JSON.parse(jwtDecodedAsString)

    console.log(`===> The full JWT decoded: ${JSON.stringify(jwtDecoded)}`)
    console.log(`==> JWT scope: ${jwtDecoded.scope}`)
    console.log(`==> JWT role collections: ${JSON.stringify(jwtDecoded['xs.system.attributes'])}`)
    console.log(`==> JWT user attributes: ${JSON.stringify(jwtDecoded['xs.user.attributes'])}`)
    next()
  }

  app.get("/", function (req, res) {
    res.send("Hello world! Cloud Foudnry Node Js Demo");
  });


  app.get("/getToDo", function (req, res) {
    axios.get('https://gorest.co.in/public/v2/todos', {
      headers: { "Accept-Encoding": "gzip,deflate,compress" }
    })
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
    axios.get('https://jsonplaceholder.typicode.com/albums', {
      headers: { "Accept-Encoding": "gzip,deflate,compress" }
    })
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

  const port = process.env.PORT || 5000;

  app.listen(port, function () {
    console.log("app listening at port " + port);
  });
