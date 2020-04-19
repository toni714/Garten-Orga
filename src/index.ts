import http from "http"
import https from "https"
import fs from "fs"

import express from "express"
import {Request, Response} from "express"
import helmet from "helmet"
import compression from "compression"

//Setup http Redirect
http.createServer((req, res)=>{
  res.writeHead(301, {Location: 'https://'+req.headers.host+req.url})
  res.end()
}).listen(8080)
console.log("Http-Redirect now running on Port 8080")

//Setup https
const ssl_options={
  key: fs.readFileSync("cert/key.pem"),
  cert: fs.readFileSync("cert/server.crt"),
  dhparam: fs.readFileSync("cert/hd-ssl.pem")
}

//Setup Middleware
const app=express()
app.use(helmet())
app.use(compression())

const _app_dir='garden-client/dist/garden-client'

app.get("*.*", express.static(_app_dir, {maxAge:'1y'}))

app.all("/", (req:Request, res:Response)=>{
  res.status(200).sendFile(`/`, {root:_app_dir})
})

https.createServer(ssl_options, app).listen(8443)
console.log("Express-Server now running on Port 8443")
