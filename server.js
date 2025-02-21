import express from "express"
import cors from "cors"
import {spawn} from "child_process"
import {fileURLToPath} from 'url'
import fs from 'fs'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
app.use(cors())
app.use(express.json())

app.post('/find',(req,res)=>{
    const dt = req.body.date
    console.log(dt)
    const filePath=path.join(__dirname,'date1.txt')
    fs.writeFile(filePath,dt,(err)=>{
        if(err){
            console.log("Error in creating file")
            // return res.status(500).json({ error: "File write failed" });
        }
        else{
            console.log("File Created Successfully!")
            // return res.status(200).json({ message: "File written successfully" }); 
        }
    })
    const pythonRun = spawn("/opt/anaconda3/bin/python3", ["read.py"]);
    let result;
    pythonRun.stdout.on("data",(data)=>{
        result=Buffer(data).toString()
    })
    pythonRun.on("close",(code)=>{
        if(code==0){
            const jsonData=JSON.parse(result)
            console.log(result)

            return res.json(jsonData);
        }
        else{
            return res.status(404).json({error:"Python script not executed"})
        }
    })
    
})
app.listen(4000)