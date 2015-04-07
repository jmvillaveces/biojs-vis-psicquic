# biojs-vis-PSICQUICGraph

## About
PSICQUICGraph is a [BioJS](http://biojs.io) component to visualize molecular interactions from [PSICQUIC](https://github.com/MICommunity/psicquic) services. Click [here](http://biojs.io/d/biojs-vis-psicquic) to see a working example!

## Getting Started
Install it using npm: `npm install biojs-vis-psicquic`

```
    var yourDiv = document.getElementById('snippetDiv');
    //Require the app
    var biojsvispsicquic = require('biojs-vis-psicquic');
    
    // Intercept elements before rendering in order to set property type based on intTypes
        var intercept = function(elements){
            for (i = 0, len = elements.edges.length; i < len; i++) { 
                elements.edges[i].data.type = elements.edges[i].data.intTypes[0].value;
            }
            return elements;
        };

        // Create container div
        var yourDiv = document.getElementById('snippetDiv');
            yourDiv.style.left = 0;
            yourDiv.style.top = 0;
            yourDiv.style.width = "100%";
            yourDiv.style.height = "100%";
            yourDiv.style.position = "absolute";

        var cyopts = {
            container:yourDiv,
            ready: function(){ 
                console.log('rendering finished.') 
            },
            headless: false,
            renderer: {
                name: 'canvas'
            },
          style: cytoscape.stylesheet()
            .selector('node')
              .css({
                'height': 80,
                'width': 80,
                'content': 'data(id)',
                'text-valign': 'center',
                'color': 'white',
                'border-color': '#000',
                'border-width': 3,
                'border-opacity': 0.5
              })
            .selector('edge')
              .css({
                'curve-style': 'haystack',
                'opacity': 0.6,
                'width': 'mapData(normalized_max_weight, 0, 0.01, 5, 10)'
              })
            .selector('edge[type = "association"]')
                .css({
                    'line-color': '#D0B7D3'
                })
            .selector('edge[type = "physical association"]')
                .css({
                    'line-color': '#9BD8DD'
                })
            .selector('edge[type = "direct interaction"]')
                .css({
                    'line-color': '#A0B3D8'
                })
            .selector('edge[type = "atpase reaction"]')
                .css({
                    'line-color': '#EAA2A3'
                })
        ,
        layout: {
            name: 'concentric',
            concentric: function(){
                return this.data('weight');
            },
            levelWidth: function(nodes){
                return 0.5;
            },
            padding: 10
          }
        };
        
        // IntAct REST url
        var url = 'http://www.ebi.ac.uk/Tools/webservices/psicquic/intact/webservices/current/search';
        
        // User heroku proxy
        var proxy = function(url){
            return 'https://cors-anywhere.herokuapp.com/'+url;
        };
        
        //Init the app
        biojsvispsicquic.url(url)
            .query('species:human&id:(BRCA1 OR BRCA2)')
            .proxy(proxy)
            .cyopts(cyopts)
            .intercept(intercept)
            .update();
```

## Cite
If you use PSICQUICGraph please cite the article [here](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC4097353/).

## Contributing

Please submit all issues and pull requests to the [jmVillaveces/biojs-vis-psicquic](http://github.com/jmVillaveces/biojs-vis-psicquic) repository!

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/jmVillaveces/biojs-vis-psicquic/issues).

## License 


This software is licensed under the Apache 2 license, quoted below.

Copyright (c) 2014, José Villaveces

Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
