/**
 * Created by rishabhkhanna on 12/11/17.
 */
const cluster = require('cluster');
const os = require('os');
const express = require('express');


if(cluster.isMaster){
    let numWorkers = os.cpus().length;
    console.log("Master Cluster setting up " + numWorkers + ' workers..');

    for (let i =0 ; i <=numWorkers; i++){
        cluster.fork();
    }

    cluster.on('online', function (worker) {
        console.log('Worker ' + worker.process.pid + ' is online :)');
    });

    cluster.on('exit', function (worker, code, signal) {
        console.log('worker ' + worker.process.pid + 'died with code : ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    })

}else{
    const app = express();
    app.all('/*', (r,s)=>{
        s.send('process ' + process.pid + ' says hello !!')
    })
    app.listen(8990, ()=>{console.log('Process ' + process.pid + ' is listening to all incoming requests !!')} );
}