//Libraries
var psicquic = require('biojs-rest-psicquic');
var cytoscape = require('cytoscape');
var MITab = require('biojs-io-mitab');
var _ = require('underscore');

//Private members
var _selector = 'body', _div = null;

//Cytoscape vars
var _cyopts = {};

// psicquic vars
var _url = '', _proxy = null, _method = 'query', _params = null, _query='';

var _initSelector = function(selector){
    _div = document.querySelector(selector);
    _div.style.left = 0;
    _div.style.top = 0;
    _div.style.width = '100%';
    _div.style.height = '100%';
    _div.style.position = 'absolute';
};

// Public members
var pGraph = function(){};

pGraph.url = function(_){
    if (!arguments.length)
        return _url;
    _url = _;
    return pGraph;
};

pGraph.proxy = function(_){
    if (!arguments.length)
        return _proxy;
    _proxy = _;
    return pGraph;
};

pGraph.method = function(_){
    if (!arguments.length)
        return _method;
    _method = _;
    return pGraph;
};

pGraph.params = function(_){
    if (!arguments.length)
        return _params;
    _params = _;
    return pGraph;
};

pGraph.query = function(_){
    if (!arguments.length)
        return _query;
    _query = _;
    return pGraph;
};

pGraph.selector = function(_){
    if (!arguments.length)
        return _selector;
    
    _selector = _;
    return pGraph;
};

//Cytoscape related options
pGraph.cyopts = function(_){
    if (!arguments.length)
        return _cyopts;
    
    _cyopts = _;
    return pGraph;
};

pGraph.update = function(){
    if(_div === null) _initSelector(_selector);
    
    psicquic.url(_url).params(_params).method(_method).proxy(_proxy).query(_query, function(err, resp, body){
        var parsed = MITab.parse(body);
        
        _cyopts.elements = {
            nodes: _.map(parsed.nodes, function(n){
                return {data:n};
            }),
            edges : _.map(parsed.links, function(n){
                return {data:n};
            })
        };
        
        _cyopts.container = _div;
        var cy = cytoscape(_cyopts);
    });
};

module.exports = pGraph;