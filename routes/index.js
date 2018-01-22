var express = require('express');
var router = express.Router();
const axios = require('axios');
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
                            nodes.push({id:x.id,label:x.name+"\\nS: "+y.sendRate + "\\nR: "+y.receiveRate, color: y.color, shape: 'circle',font: {size:12, color:'white', face:'arial'} });
                        }
                    });

                    if(x.id != x.successor) {
                        edges.push({from: x.id, to: x.successor, arrows: 'to'});
                    }
                });
                res.render('index', { title: 'Express',nodes: JSON.stringify(nodes), edges:JSON.stringify(edges)});

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
            var lineNo, appName, location;
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
            data.push({no: i,location: location, lineNo: lineNo, appName: appName, id: x.id});
            i++;
        });
        result = { data: data};
        res.send(JSON.stringify(result));
    }).catch(error => {
        console.log(error);
    });
});

router.get('/provenance/:id',function(req,res,next){
    axios.get(url+'/provenance/'+req.params.id)
        .then(response => {
            console.log(response.data);
            res.render('provenance', { title: 'Express',data: JSON.stringify(response.data)});
    }).catch(error =>{
        console.log(error);
    });

});

module.exports = router;
