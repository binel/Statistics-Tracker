var width = 1000;
var height = 500;

//define a projection for the map
var projection = d3.geo.albersUsa()
    .translate([width / 2, height / 2])
    .scale([1000]);

var path = d3.geo.path()
    .projection(projection);

//make svg canvas
var svg = d3.select("#map1").append("svg")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g")
    .append("g")
    .attr("id", "states");

var data = {};

var color = d3.scale.log()
                .range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,22)", "rgb(0,80,0)"]);
color.base(1000);

//import CSV data then generate map
d3.csv("UndergradEnrollmentISU.csv", function (csv_data) {
    console.log(data);
    data = csv_data;
    generateMap();
});


function generateMap() {

    //import json data for state boundaries
    d3.json("us-states.json", function (json) {


        //set color input domain
        color.domain([
            d3.min(data, function(d){return d.electorate;}),
            d3.max(data, function(d){return d.electorate;})
        ]);

        //merge csv data with geo json
        for (var i = 0; i < data.length; i++) {
            //store csv data values
            var dataState = data[i].state;
            var dataElectorate = data[i].electorate;
            console.log(dataElectorate);
            //for each state, store csv data in json.properties
            for (var j = 0; j < json.features.length; j++) {
                var jsonState = json.features[j].properties.name;
                if (dataState == jsonState) {
                    json.features[j].properties.electorate = dataElectorate;

                    break;
                }
            }
        }

        console.log(json);

        //create states
        g.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "state")
            .style("stroke", "white")
            .style("stroke-width", "0.5")
            .style("fill", function (d) {
                var electorate = d.properties.electorate;
                if(electorate){
                    return color(electorate);
                }
                else return "#ccc";
            });


        //add labels
        g.selectAll("text")
            .data(json.features)
            .enter()
            .append("svg:text")
            .text(function (d) {
                return d.properties.electorate;
            })
            .attr("x", function (d) {
                return (path.centroid(d))[0];
            })
            .attr("y", function (d) {
                return (path.centroid(d))[1];
            })
            .attr("text-anchor", "middle")
            .attr('font-size', '6pt')
            .attr('fill', function(d) {
                return 'black';

        });


    });
}
