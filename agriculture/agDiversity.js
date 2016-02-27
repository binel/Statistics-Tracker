var agByRaceSVG = dimple.newSvg("#agDiversity", 600, 400);

//import CSV and build dataset
d3.csv("Agriculture.csv", function (data) {
    var chart = new dimple.chart(agByRaceSVG, data);
    var x = chart.addCategoryAxis("x", "Major");
    x.addOrderRule("Ordinal");
    chart.addMeasureAxis("y", "Students");
    chart.addSeries("Race", dimple.plot.bar);
    chart.draw(); 
});

