const fs = require('fs');

function LogReqRes(filename){
    return (req,res,next) => {
        fs.appendFile(filename,`\n${req.id} ${req.method}: ${req.path}\n`,(err,data)=>{
            next()
        })
    }
}

module.exports = { LogReqRes };