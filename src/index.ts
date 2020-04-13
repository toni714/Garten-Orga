import express from "express"
import {Request, Response} from "express";

const app=express();
const server=app.listen(80, ()=>{
  console.log("Now listening on Port "+80+"\n");
});

app.get("/*", (req:Request, res:Response)=>{
  res.statusCode=200;
  res.setHeader("Content-Type", "text/html");
  res.send("<html><head><title>Trololol</title></head><body><p>Finally, you're here</p><p>I've been witing for a long time.</p><p>Good to know you are well.<br>Allright then, come in.</p></body></html>")
});
