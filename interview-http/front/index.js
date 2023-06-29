const http = require("http");
http
  .createServer((req, res) => {
    if (req.url === "/sum") {
      let total = 0;
      for (let index = 0; index < 1000 * 100000; index++) {
        total += index;
      }
      res.end(total + "");
    } else {
      res.end("other");
    }
  })
  .listen(3000);
