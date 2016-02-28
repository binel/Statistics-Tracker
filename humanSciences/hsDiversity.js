var hsByRaceSVG = dimple.newSvg("#hsDiversity", 600, 400);
var chartData;
var allValues;
//import CSV and build dataset
d3.csv("HSByRace.csv", function (data) {
    chartData = data;
    chart = new dimple.chart(hsByRaceSVG, data);
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
