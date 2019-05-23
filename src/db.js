// 引入数据库模块
let MongoClient = require('mongodb').MongoClient;
// 数据库连接
let url = "mongodb://localhost:27017/";

/**
 * 所有操作都需要先连接数据库
 * @param {*} callback 回调函数　
 */
function _connectDB(callback) {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) {
      console.log(err);
      callback(null);
      db.close();
      return;
    } else
      callback(db);
  })
}

/**
 * 查找数据库所有的数据
 */

exports.queryAll = (callback) => {
  _connectDB(function (db) {
    if (db === null)
      return;
    else {
      let netAss = db.db('netAss');

      netAss.collection("blog").find().toArray(function (err, result) {
        if (err) throw err;
        else {
          callback(result);
        }
      });
      db.close();
    }
  })
};


