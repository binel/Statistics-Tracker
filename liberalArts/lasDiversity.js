var lasByRaceSVG = dimple.newSvg("#lasDiversity", 600, 400);

//import CSV and build dataset
d3.csv("LASByRace.csv", function (data) {
    var chart = new dimple.chart(lasByRaceSVG, data);
    var x = chart.addCategoryAxis("x", "Major");
    x.addOrderRule("Ordinal");
    chart.addMeasureAxis("y", "Students");
    chart.addSeries("Race", dimple.plot.bar);
    chart.draw();
});
