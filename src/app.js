const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const path = require('path');
// 引入数据库操作
const dbUtil = require('./db.js');

// 解析 application/json
app.use(bodyParser.json());

/**
 * 查询端口请求
 */
app.post('/port', function (req, res) {
  console.log('->接到查询端口请求: %o', req.body);

  // 验证请求数据格式
  if (JSON.stringify(req.body) === '{}') {
    res.sendStatus(500);
  } 
  else if (req.body.bed < 0 
        || req.body.bed > 3 
        || req.body.building == "" 
        || req.body.room == ""
        ) {
    console.log('->端口查询失败：请求参数有误');
    res.sendStatus(500);
  } 
  else {
    dbUtil.queryOneDocument('port', {building: req.body.building, room: req.body.room}, doc => {
      let data;
      if (doc == null) {
        console.log('->无该端口');
        data = {};
      } else {
        console.log('->端口查询成功：%s', doc.port[req.body.bed]);

        data = JSON.stringify({
          port: doc.port[req.body.bed]
        })
      }
      res.send(data);
    });
  }
})

/**
 * 查询所有的文章
 */
app.get('/queryAllBlog', (req, res) => {
  // 在数据库中查询
  let dataList;
  // dbUtil.insertData({test: 123}, function() {});
  dbUtil.queryAll(function (result) {
    
    dataList = result;
    // 响应请求
    res.send(JSON.stringify(dataList));
  });
});

app.get('/doc/:docName', function (req, res) {
  console.log(req.params.docName);
  let docName = req.params.docName;
  const docRootPath = path.resolve(__dirname, '..');


  fs.readFile(docRootPath + '/public/doc/' + docName, function (err, data) {
    if (err) {
      res.send("0");
    } else {
      console.log(data.toString());
      let str = data.toString();
      res.setHeader('Content-Type', 'text/html');
      res.send(str);
    }
  })
})



/**
 * 启动服务器
 */
var server = app.listen(8001, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("app running in http://%s:%s", host, port)

})


