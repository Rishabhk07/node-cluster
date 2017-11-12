/**
 * Created by rishabhkhanna on 12/11/17.
 */
const  cluster = require('cluster');
const http = require('http');
const numCPU = 4;

if(cluster.isMaster){
    for(let i = 0;i < numCPU;i++){
        cluster.fork();
    }
}else{
    http.createServer((r,s)=>{
        s.writeHead(200);
        s.end('process ' + process.pid + ' says Hello !!');
    }).listen(9099,()=>{
        console.log("Server started at 9099 with process id " + process.pid );
    });
}

