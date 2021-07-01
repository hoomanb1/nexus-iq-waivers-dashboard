var express  = require('express');
var app      = express();
var httpProxy = require('http-proxy');
var config = require('./config.json');
var apiProxy = httpProxy.createProxyServer();
var iqServer = config.iqServerUrl;



app.all("/api/v2/*", function(req, res) {
    console.log('redirecting to ' + iqServer);
    console.log(req.protocol + '://' + req.get('host') + req.originalUrl);

    const auth = "Basic " + Buffer.from(config.usercode + ":" + config.passcode, 'utf-8').toString('base64');
    console.log(config.usercode + " : " + config.passcode);
    // const auth = "Basic " + Buffer.alloc(config.usercode + ":" + config.passcode).toString("base64");
    // req.append('Authorization', auth);
    req.headers['Authorization'] = auth;

    if (req.method === "OPTIONS") {
      res.append('Access-Control-Allow-Origin', [req.headers.origin]);
      res.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
      res.append('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Origin,Range,Authorization');

      return res.status(200).end();
    }

    if (req.method === "POST") {
      res.append('Access-Control-Allow-Origin', ['*']);
      res.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.append('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range');
      res.append('Access-Control-Expose-Headers', 'Content-Length,Content-Range');
    }

    if (req.method === "GET") {
      res.append('Access-Control-Allow-Origin', ['*']);
      res.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.append('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range');
      res.append('Access-Control-Expose-Headers', 'Content-Length,Content-Range');
    }

    if (req.method === "DELETE") {
      res.append('Access-Control-Allow-Origin', ['*']);
      res.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
      res.append('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range');
      res.append('Access-Control-Expose-Headers', 'Content-Length,Content-Range');
    }

    apiProxy.web(req, res, {target: iqServer});
});

app.listen(3000);
