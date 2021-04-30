const express = require("express");
var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var desktop_app_version = "1.0.0";
var desktop_app_URL = "http://127.0.0.1:8083/update.asar"; // or ../update.zip

app.post("/update", function(req, res) {
  if (req.body && req.body.current != desktop_app_version) {
    // check for server side
    res.write(
      JSON.stringify({
        last: desktop_app_version,
        source: desktop_app_URL
      }).replace(/[\/]/g, "\\/")
    );
  } else {
    res.write(
      JSON.stringify({ last: desktop_app_version }).replace(/[\/]/g, "\\/")
    );
  }
  res.end();
});

app.post("/update", function(req, res) {
  res.write(
    JSON.stringify({
      name: "app",
      version: "0.0.1",
      asar: "http://127.0.0.1:8083/update.asar",
      info: "1.fix bug\n2.feat..."
    }).replace(/[\/]/g, "\\/")
  );
  res.end();
});

app.listen(3000);
console.log("run port: 3000");
