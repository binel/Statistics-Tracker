var width = 600;
var height = 400;
var margin = {
    top: 30,
    right: 25,
    bottom: 80,
    left: 50
};


//set scales
var xScale = d3.scale.ordinal()
    .rangeRoundBands([margin.left, width], 0.05);
var yScale = d3.scale.linear()
    .rangeRound([height - margin.top, 0]);
var color = d3.scale.category20c(); 

//create svg
var svg = d3.select("#diversity")
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.bottom + margin.top);

var dataset = null;

//define axes
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

//import CSV and build dataset
d3.csv("college_by_race.csv", function (data) {

    //assign a color to each race
    color.domain(d3.keys(data[0]).filter(function (key) {
        return key !== 'college';
    }));

    //build data
    data.forEach(function (d) {
        var y0 = 0;
        d.races = color.domain().map(function (race) { //add a race object to each data point
            return {
                race: race,
                y0: y0, //initial y
                y1: y0 += +d[race] //height
            };
        });
        d.total = d.races[d.races.length - 1].y1; //total height
    });

    //sort descending by total enrollment
    data.sort(function (a, b) {
        return b.total - a.total;
    });

    //set x domain based on colleges 
    xScale.domain(data.map(function (d) {
        return d.college;
    }));
    //set y domain on max value in data
    yScale.domain([0, d3.max(data, function (d) {
        return d.total;
    })]);

    dataset = data;

    console.log(dataset);

    generateGraph();

});


function generateGraph() {

    //college groups
    var college = svg.selectAll("g.college")
        .data(dataset)
        .enter()
        .append("g")
        .attr("class", "college")
        .attr("transform", function (d) {
            return "translate(" + xScale(d.college) + ",0)";
        });

    //rectangles
    college.selectAll("rect")
        .data(function (d) {
            return d.races;
        })
        .enter()
        .append("rect")
        .attr("width", xScale.rangeBand())
        .attr("y", function (d) {
            return yScale(d.y1);
        })
        .attr("height", function (d) {
            return yScale(d.y0) - yScale(d.y1);
        })
        .attr("fill", function (d) {
            return color(d.race)
        });

    //x-axis
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0, " + (height - 25) + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-10px")
        .attr("dy", "-5px")
        .attr("transform", "rotate(-30)");

    //y-axis
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(yAxis);

}

//functions for sorting dataset and then updating graph
//will remove data on whites if set to true, will replace it if set to false 
function removeMajority(isTrue) { 
    var data = dataset; 
    //build data
    data.forEach(function (d) {
        var y0 = 0;
        d.races = color.domain().map(function (race) { //add a race object to each data point
            if(race == "white" && isTrue) {
                return {
                    race: race,
                    y0: y0, 
                    y1: y0 
                };
            }
            else { 
                return {
                    race: race,
                    y0: y0, //initial y
                    y1: y0 += +d[race] //height
                };
            }
  
        });
        d.total = d.races[d.races.length - 1].y1; //total height
    });

    //sort descending by total enrollment
    data.sort(function (a, b) {
        return b.total - a.total;
    });

    dataset = data;
    console.log(dataset);
    updateGraph(1500);
}

//function for updating a graph given a transtion duration

function updateGraph(duration) {

    //set x domain based on majors
    xScale.domain(dataset.map(function (d) {
        return d.college;
    }));
    //set y domain on max value in data
    yScale.domain([0, d3.max(dataset, function (d) {
        return d.total;
    })]);

    var majors = svg.selectAll(".college");
    //perform changes
    
    majors.data(dataset); //rebind data

    majors.selectAll("rect") //redraw rectangles
        .data(function (d) {
            return d.races;
        })
        .transition()
        .duration(duration)
        .attr("width", xScale.rangeBand())
        .attr("y", function (d) {
            return yScale(d.y1);
        })
        .attr("height", function (d) {
            return yScale(d.y0) - yScale(d.y1);
        })
        .attr("fill", function (d) {
            return color(d.race)
        });

    //relabel x-axis
    svg.selectAll("g.x-axis")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-10px")
        .attr("dy", "-5px")
        .attr("transform", "rotate(-30)");
    
    //relabel y-axis
    svg.selectAll("g.y-axis")
        .call(yAxis)
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(yAxis);

}
