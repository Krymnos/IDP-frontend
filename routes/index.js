var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {

    let list = {};
    let nodes = [];
    let edges = [];
    axios.get('http://122.129.79.67:5000/v1/nodes')
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
    res.render('index', { title: 'Express',nodes: JSON.stringify(nodes), edges:JSON.stringify(edges) });
    }).catch(error => {
            console.log(error);
    });
});

module.exports = router;
