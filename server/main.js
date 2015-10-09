var router 	= require("./router");
var http		= require("http");
var port = 8383;
function start(route){
  function onRequest(request, response){
    var postData = "";

    request.setEncoding("utf8");

    request.addListener("data", function(chunk) {
      postData+= chunk;
    });

    request.addListener("end", function() {
      route(request, response, postData);
    });
  }

  http.createServer(onRequest).listen(port);
  console.log("server has started on http://127.0.0.1:"+port);
}


start(router.route);