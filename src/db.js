// 引入数据库模块
let MongoClient = require('mongodb').MongoClient;
// 数据库连接
let url = "mongodb://localhost:27017/";
// 数据库的名字
const dbName = 'netAss';
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
 * 查找一条记录
 */
exports.queryOneDocument = (collectionName,documentName, callback) => {
  _connectDB(db => {
    if (db === null) 
      return;
    else {
      let netAss = db.db(dbName);
      
      netAss.collection(collectionName).find(documentName).limit(1).next((err, doc) => {
        if (err) throw err;
        else callback(doc);
      })
      db.close();
    }
  });
};

/**
 * 查找数据库所有的记录
 */
exports.queryAll = (callback) => {
  _connectDB(db => {
    if (db === null)
      return;
    else {
      let netAss = db.db(dbName);

      netAss.collection("blog").find({}).toArray(function (err, result) {
        if (err) throw err;
        else {
          callback(result);
        }
      });
      db.close();
    }
  })
};


/**
 * 插入一条记录
 */
exports.insertData = (data, callback) => {
  _connectDB(db => {
    if (db === null) 
      return;
    else {
      let netAss = db.db(dbName);
      // 生成时间戳
      data.timeStamp = new Date().toLocaleString();

      netAss.collection('blog').insertOne(data, function(err, res) {
        if (err) throw err;
          else {
            console.log("插入一条数据成功！");
            callback(res.insertedCount);
          }
      })
    }
  });
}