var exports = module.exports = {};

exports.ExecuteStatement = function(req, conn){
    var Request = req;
    var Connection = conn;

    request = new Request("Select * from AdminUser ", function(err, rowCount) {
        if (err) {
          console.log(err);
        } else {
          console.log(rowCount + ' rows');
        }
      });
      request.on('row', function(columns) {
        columns.forEach(function(column) {
          console.log(column.value);
        });
      });
      Connection.execSql(request); 
} 