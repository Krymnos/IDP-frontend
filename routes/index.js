var express = require('express');
var router = express.Router();
const axios = require('axios');
var moment = require('moment');
const url = "http://122.129.79.67:5000/v1";
/* GET home page. */
router.get('/', function(req, res, next) {
    let list = {};
    let nodes = [];
    let edges = [];
    let stats = {};
    axios.get(url+'/cluster/topology')
        .then(response => {
        list = response.data;
        axios.get(url+'/cluster/stats')
            .then(data=> {
                var stats = data.data;
                list.forEach(x => {
                    stats.forEach(y => {
                        if(x.id == y.id){
                            nodes.push({id:x.id,label:x.name+"\\nS: "+y.sendRate + "\\nR: "+y.receiveRate, title:"ProvenanceDeamon:"+y.provenanceDaemonHealth+" PipelineHealth:"+y.pipelineDaemonHealth,color: y.nodeHealth, border:y.outgoingChannelHealth, shape: 'circle',font: {size:12, color:'white', face:'arial'} });
                        }
                    });

                    if(x.id != x.successor) {
                        edges.push({from: x.id, to: x.successor, arrows: 'to'});
                    }
                });
                res.render('index', { title: 'Express',nodes: JSON.stringify(nodes), edges:JSON.stringify(edges),baseURL:JSON.stringify(url)});

        }).catch(error => {
                console.log(error);
        });
    }).catch(error => {
            console.log(error);
    });
});

router.get('/query', function(req, res, next) {
    res.render('query');
});


router.get('/fetchstats',function(req,res,next){
    axios.get(url+'/cluster/stats')
        .then(data=> {
            res.send(JSON.stringify(data.data));
    }).catch(error => {
        console.log(error);
    });
});

router.get('/fetchdatapoints/:id',function(req,res,next){
    axios.get(url+'/cluster/'+req.params.id+'/provenance?size=50')
    .then(response=> {
        var list = response.data;
        var result = {};
        let i = 1;
        var data = [];
        list.forEach(x => {
            var lineNo, appName, location, className, created, sent, received;
            if(x.context.lineNo != undefined){
                lineNo = x.context.lineNo;
            }else{
                lineNo = '';
            }

            if(x.context.appName != undefined){
                appName = x.context.appName;
            }else{
                appName = '';
            }

            if("loc" in x.context){
                location = x.context.loc.lable;
            }else{
                location = ""
            }

            if(x.context.className != undefined){
                className = x.context.className;
            }else{
                className = '';
            }
            if(x.context.timestamp != undefined){
                created = moment.unix(x.context.timestamp/1000).format("DD/MM/YYYY HH:mm:ss.SSS");
            }else{
                created = '';
            }
            if(x.context.sendTime != undefined){
                sent = moment.unix(x.context.sendTime/1000).format("DD/MM/YYYY HH:mm:ss.SSS");
            }else{
                sent = '';
            }
            if(x.context.receiveTime != undefined){
                received = moment.unix(x.context.receiveTime/1000).format("DD/MM/YYYY HH:mm:ss.SSS");
            }else{
                received = '';
            }
            data.push({no: i,location: location, lineNo: lineNo, appName: appName, className:className, created:created, sent:sent,received:received,id: x.id});
            i++;
        });
        result = { data: data};
        res.send(JSON.stringify(result));
    }).catch(error => {
        console.log(error);
    });
});

router.get('/provenance/:id',function(req,res,next){
    axios.get(url+'/provenance/'+req.params.id+"?structure=linear")
        .then(response => {
            let list = response.data;
            let nodes = [];
            let edges = [];
            list.forEach(x => {
                if(x.context != undefined) {
                    if (x.context.timestamp != undefined) {
                        created = moment.unix(x.context.timestamp / 1000).format("DD/MM/YYYY HH:mm:ss.SSS");
                    } else {
                        created = '';
                    }
                    if (x.context.sendTime != undefined) {
                        sent = moment.unix(x.context.sendTime / 1000).format("DD/MM/YYYY HH:mm:ss.SSS");
                    } else {
                        sent = '';
                    }
                    if (x.context.receiveTime != undefined) {
                        received = moment.unix(x.context.receiveTime / 1000).format("DD/MM/YYYY HH:mm:ss.SSS");
                    } else {
                        received = '';
                    }
                    nodes.push({id:x.context.hostId,label:x.context.hostId, title:"\\nLine No:"+x.context.lineNo+"\\nAppName:"+x.context.appName+"\\nClassName:"+x.context.className+"\\nCreatedTime:"+created+"\\nSendTime:"+sent+"\\nReceivedTime:"+received+"\\nMeter Id:"+x.context.meterId+"\\nMetricId:"+x.context.metricId});
                    edges.push({from: x.context.hostId, to: x.successor, arrows: 'to'});
                }
            });
            res.render('provenance', { title: req.params.id,nodes: JSON.stringify(nodes), edges:JSON.stringify(edges)});
    }).catch(error =>{
        console.log(error);
    });

});


router.get('/querycli/:id',function(req,res,next){
    axios.post(url+'/provenance/',{query: req.params.id})
        .then(response=> {
        var list = response.data;
        console.log(list);
        if(list.error == true){
            res.send(JSON.stringify(false));
        }else {
            var result = {};
            let i = 1;
            var data = [];
            list.datapoints.forEach(x => {
                var lineNo, appName, location, className, created, sent, received;
            if (x.context.lineNo != undefined) {
                lineNo = x.context.lineNo;
            } else {
                lineNo = '';
            }

            if (x.context.appName != undefined) {
                appName = x.context.appName;
            } else {
                appName = '';
            }

            if ("loc" in x.context) {
                location = x.context.loc.lable;
            } else {
                location = ""
            }

            if (x.context.className != undefined) {
                className = x.context.className;
            } else {
                className = '';
            }
            if (x.context.timestamp != undefined) {
                created = moment.unix(x.context.timestamp / 1000).format("DD/MM/YYYY HH:mm:ss.SSS");
            } else {
                created = '';
            }
            if (x.context.sendTime != undefined) {
                sent = moment.unix(x.context.sendTime / 1000).format("DD/MM/YYYY HH:mm:ss.SSS");
            } else {
                sent = '';
            }
            if (x.context.receiveTime != undefined) {
                received = moment.unix(x.context.receiveTime / 1000).format("DD/MM/YYYY HH:mm:ss.SSS");
            } else {
                received = '';
            }
            data.push({
                no: i,
                location: location,
                lineNo: lineNo,
                appName: appName,
                className: className,
                created: created,
                sent: sent,
                received: received,
                id: x.id
            });
            i++;
        });
        result = {data: data};
        res.send(JSON.stringify(result));
    }
}).catch(error => {
        console.log(error);
});
});


router.get('/querycli/:id',function(req,res,next){
    axios.post(url+'/provenance/',{query: req.params.id})
        .then(response=> {
        var list = response.data;
        var result = {};
        result = {data: list};
        res.send(JSON.stringify(result));
    }).catch(error => {
            console.log(error);
    });
});

router.get('/queryclicheck/:id',function(req,res,next){
    axios.post(url+'/provenance/',{query: req.params.id})
        .then(response=> {
        var list = response.data;
        console.log(list);
        if(list.error == true){
            res.send(JSON.stringify(false));
        }else {
            res.send(JSON.stringify(true));
        }
    }).catch(error => {
            console.log(error);
    });
});


module.exports = router;
