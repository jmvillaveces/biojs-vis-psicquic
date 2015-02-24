//Libraries
var psicquic = require('biojs-rest-psicquic');
var cytoscape = require('cytoscape');
var MITab = require('biojs-io-mitab');
var _ = require('underscore');

//Private members
var _div = null, _intercept = null;

//Cytoscape vars
var _cyopts = {};

// psicquic vars
var _url = '', _proxy = null, _method = 'query', _params = null, _query='';

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

//gets executed just before rendering the graph, it allow user to transform the data
pGraph.intercept = function(_){
    if (!arguments.length)
        return _intercept;
    
    _intercept = _;
    return pGraph;
};

pGraph.update = function(){
    
    psicquic.url(_url).params(_params).method(_method).proxy(_proxy).query(_query, function(err, resp, body){
        var parsed = MITab.parse(body);
        
        var elements = {
                nodes: _.map(parsed.nodes, function(n){
                    n.weight = 0;
                    return {data:n};
                }),
                edges : _.map(parsed.links, function(l){
                    var t = _.find(parsed.nodes, function(n){return n.id === l.target;});
                    var s = _.find(parsed.nodes, function(n){return n.id === l.source;});
                
                    t.weight = t.weight + 1;
                    s.weight = s.weight + 1;
                    return {data:l};
                })
        };
        
        elements = _.isFunction(_intercept) ? _intercept(elements) : elements;
        
        _cyopts.elements = elements;
        _cyopts.container = _div;
        var cy = cytoscape(_cyopts);
    });
};

module.exports = pGraph;