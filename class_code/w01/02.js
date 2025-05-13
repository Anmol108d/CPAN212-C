import http from "node:http";

const server = http.createServer((req, res)=> {
    // do something
    console.log(req.url)
    if (req.url == "/home") {
       return res.end("Hello from Home")
    }
    else if (req.url == "/about") {
       return res.end("Hello from About")
    }
    res.end("Hello from Anmol")
});

server.listen(8000, ()=>{
    console.log("Server running at http://localhost:8000")
})