var lasByRaceSVG = dimple.newSvg("#lasDiversity", 600, 400);
var chartData;
var allValues;
var chart;
//import CSV and build dataset
d3.csv("LASByRace.csv", function (data) {
    chartData = data;
    chart = new dimple.chart(lasByRaceSVG, data);
    var x = chart.addCategoryAxis("x", "Major");
    x.addOrderRule("Ordinal");
    chart.addMeasureAxis("y", "Students");
    chart.addSeries("Race", dimple.plot.bar);
    chart.draw();
    allValues = dimple.getUniqueValues(chartData, "Race");
});

function removeMajority(removeMajority) {
    filterValues =  allValues.slice();
    if(removeMajority){
        filterValues.shift();
    }
    chart.data = dimple.filterData(chartData, "Race", filterValues);
    chart.draw();
}
