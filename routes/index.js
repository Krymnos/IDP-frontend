var express = require('express');
var router = express.Router();
const axios = require('axios');
var moment = require('moment');
const url = "http://" + process.env.BACKEND_HOST + "/v1";
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
                            nodes.push({id:x.id,label:x.name+"\\nS: "+y.sendRate + "\\nR: "+y.receiveRate, color: y.color, shape: 'circle',font: {size:12, color:'white', face:'arial'} });
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
                if(x.inputDatapoints != undefined) {
                    nodes.push({id:x.id,label:x.context.hostId, title:"Contribution:"+x.inputDatapoints[0].contribution+"\\nLocation:"+x.context.loc.lable+"\\nLineNo:"+x.context.lineNo});
                    edges.push({from: x.id, to: x.inputDatapoints[0].dp.id, arrows: 'to'});
                }
            });
            res.render('provenance', { title: req.params.id,nodes: JSON.stringify(nodes), edges:JSON.stringify(edges)});
    }).catch(error =>{
        console.log(error);
    });

});
module.exports = router;
