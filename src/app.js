const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const path = require('path');



// 解析 application/json
app.use(bodyParser.json()); 
// 解析 application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded());
 
app.post('/port', function (req, res) {
  console.log(req.body);

  let data = JSON.stringify({
          port: 'JPSDe123'
      })
  res.send(data);
})

app.get('/doc/:docName', function(req, res) {
  console.log(req.params.docName);
  let docName = req.params.docName;
  const docRootPath = path.resolve(__dirname, '..');
  

  fs.readFile(docRootPath + '/public/doc/' + docName, function(err, data) {
    if(err) {
      res.send("0");
    } else {
      console.log(data.toString());
      let str = data.toString();
      res.setHeader('Content-Type', 'text/html');
      res.send(str);
    }
  })
})
 
var server = app.listen(8001, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("app running in http://%s:%s", host, port)
 
})
