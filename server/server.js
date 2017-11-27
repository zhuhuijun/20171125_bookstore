let http = require('http');
let url = require('url');
let fs = require('fs');

function readBooks(callback) {
  fs.readFile('./books.json', 'utf8', function (error, data) {
    if (error || data.length === 0) data = '[]';
    var des = JSON.parse(data);
    callback(des);
  });
}

/*readBooks(function () {});*/

function writeBooks(data, callback) {
  fs.writeFile("./books.json", JSON.stringify(data), callback);
}

http.createServer(function (req, res) {
  let {pathname, query} = url.parse(req.url, true);
  if (pathname === "/book") {
    let id = query.id;
    switch (req.method) {
      case "GET":
        readBooks(function (data) {
          if (id) {
            var book = data.find(item => item.id == id);
            res.end(JSON.stringify(book));
          } else {
            res.end(JSON.stringify(data));
          }

        });
        break;
      case"POST":
        var str = '';
        req.on('data', function (data) {
          str += data;
        });
        req.on('end', function () {
          var book = JSON.parse(str);
          readBooks(function (books) {
            book.id = books.length ? books[books.length - 1].id + 1 : 1;
            books.push(book);
            writeBooks(books, function () {
              //添加成功后返回那一项
              res.end(JSON.stringify(books));
            })
          });
        });
        break;
      case "PUT":
        var str = "";
        req.on('data', function (data) {
          str += data;
        });
        req.on('end', function (data) {
          //book前台的数据
          var book = JSON.parse(str);
          readBooks(function (data) {
            data = data.map(item => {
              if (item.id == id) {
                return book;
              }
              return item;
            });
            writeBooks(data, function () {
              //返回修改的那一项
              res.end(JSON.stringify(book));
            });
          });
        });

        break;
      case "DELETE":
        readBooks(function (data) {
          data = data.filter(item => item.id != id)
          writeBooks(data, function () {
            //删除成功返回空对象
            res.end(JSON.stringify({}));
          })
        });
        break;
    }
  } else {
    res.statusCode = 404;
    res.end();
  }
}).listen(4000);
