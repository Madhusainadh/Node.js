const fs = require("fs")
const fsPromises = require('fs').promises;
const path = require("path")

const fileOps = async()=>{
    try{
        const data = await fsPromises.readFile(path.join(__dirname,"files","starter.txt"),'utf8')//,'utf8',(err,data)=
    console.log(data)
    await fsPromises.unlink(path.join(__dirname,"files","starter.txt"))
    await fsPromises.writeFile(path.join(__dirname,"files","promiseWrite.txt"),data)
    await fsPromises.writeFile(path.join(__dirname,"files","promiseWrite.txt"),"/n/nappending to the existing or file not exist will create the new file.")
    await fsPromises.rename(path.join(__dirname,"files","promiseWrite.txt"),path.join(__dirname,"files","promiseCompleted.txt"))
    const newdata = await fsPromises.readFile(path.join(__dirname,"files","promiseCompleted.txt"),'utf8')//,'utf8',(err,data)=
    console.log(newdata)
}catch(err){
        console.log(err)
    }
}
fileOps()

// fs.readFile(path.join(__dirname,"files","starter.txt"),'utf8',(err,data)=>{
//     if(err) throw err;
//     console.log(data)
// })


// fs.writeFile(path.join(__dirname,"files","reply.txt"),"this text will show in the file.",(err)=>{
//     if(err) throw err;
//     console.log("write complete")

//     fs.appendFile(path.join(__dirname,"files","reply.txt"),"/n/nappending to the existing or file not exist will create the new file.",(err)=>{
//         if(err) throw err;
//         console.log("Append complete")
//     })

    
//     fs.rename(path.join(__dirname,"files","reply.txt")," sai file.",(err)=>{
//         if(err) throw err;
//         console.log("rename complete")
//     })
// })

// fs.appendFile(path.join(__dirname,"files","test.txt"),"appending to the existing or file not exist will create the new file.",(err)=>{
//     if(err) throw err;
//     console.log("Append complete")
// })




console.log("Hello")

process.on('uncaughtException',err=>{
    console.error(`there was an unCaught error : ${err}`)
    process.exit(1);
})