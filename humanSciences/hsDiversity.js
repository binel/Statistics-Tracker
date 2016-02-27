var hsByRaceSVG = dimple.newSvg("#hsDiversity", 600, 400);

//import CSV and build dataset
d3.csv("HSByRace.csv", function (data) {
    var chart = new dimple.chart(hsByRaceSVG, data);
    var x = chart.addCategoryAxis("x", "Major");
    x.addOrderRule("Ordinal");
    chart.addMeasureAxis("y", "Students");
    chart.addSeries("Race", dimple.plot.bar);
    chart.draw();
});
