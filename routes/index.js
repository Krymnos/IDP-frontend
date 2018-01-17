var express = require('express');
var router = express.Router();
const axios = require('axios');
const url = "http://122.129.79.67:5000/v1";
/* GET home page. */
router.get('/', function(req, res, next) {

    let list = {};
    let nodes = [];
    let edges = [];
    axios.get(url+'/nodes')
        .then(response => {
        list = response.data;
        list.forEach(x => {
            nodes.push({id:x.id,label:x.name});
            if(x.successor.length > 0){
                x.successor.forEach(y => {
                    if (x.id != y)
                {
                    edges.push({from: x.id, to: y, arrows:'to'});
                }
                });
            }
        });

        let datapoints = {};
        let data = [];
        axios.get(url+'/provenance/5a5a8538000253abcd12').then(response => {
            var id = response.data.id.substr(response.data.id.length-6);
            var node_name = nodes.find(node_name => node_name.id === id);
            datapoints = response.data.inputDatapoints;
            data.push({id:node_name.id, name: node_name.label, app: response.data.context.appName,classname: response.data.context.className,meter: response.data.context.meterId, receive: response.data.context.receiveTime})
            console.log(data);

            res.render('index', { title: 'Express',nodes: JSON.stringify(nodes), edges:JSON.stringify(edges), dp: data });
        }).catch(error=>{
            console.log(error);
        });

    }).catch(error => {
            console.log(error);
    });
});

module.exports = router;
