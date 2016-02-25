var svg = dimple.newSvg("#barChart", 600, 525);
d3.csv("gender_ex.csv", function (data) {
    var barChart = new dimple.chart(svg, data);
    barChart.setBounds(60, 30, 510, 305);
    var x = barChart.addCategoryAxis("x", "Major");
    var y = barChart.addMeasureAxis("y", "Students");
    y.tickFormat = ",.f";
    barChart.addSeries(["Gender"], dimple.plot.bar);
    barChart.draw(1000);
});


function sortMale() {
    svg.selectAll('*').remove();
    d3.csv("gender_ex.csv", function (data) {
        var barChart = new dimple.chart(svg, data);
        barChart.setBounds(60, 30, 510, 305);
        var x = barChart.addCategoryAxis("x", "Major");
        x.addOrderRule(function (a, b) {
            console.log(a);
            return b.Students[0] - a.Students[0];
        });
        var y = barChart.addMeasureAxis("y", "Students");
        y.tickFormat = ",.f";
        barChart.addSeries(["Gender"], dimple.plot.bar);
        barChart.draw(2000);
    });
}

function sortFemale() {
    svg.selectAll('*').remove();
    d3.csv("gender_ex.csv", function (data) {
        var barChart = new dimple.chart(svg, data);
        barChart.setBounds(60, 30, 510, 305);
        var x = barChart.addCategoryAxis("x", "Major");
        x.addOrderRule(function (a, b) {
            console.log(a);
            return b.Students[0] - a.Students[0];
        });
        var y = barChart.addMeasureAxis("y", "Students");
        y.tickFormat = ",.f";
        barChart.addSeries(["Gender"], dimple.plot.bar).addOrderRule(["Female", "Male"]);
        barChart.defaultColors = [
        new dimple.color("#ff0000"),
        new dimple.color("#0000ff")
    ];
        barChart.draw(2000);
    });
}

function sortMalePercent() {
    svg.selectAll('*').remove();
    d3.csv("gender_ex.csv", function (data) {
        var barChart = new dimple.chart(svg, data);
        barChart.setBounds(60, 30, 510, 305);
        var x = barChart.addCategoryAxis("x", "Major");
        x.addOrderRule(function (a, b) {
            console.log(a);
            return (b.Students[0] / b.Students[2]) - (a.Students[0] / a.Students[2]);
        });
        var y = barChart.addMeasureAxis("y", "Students");
        y.tickFormat = ",.f";
        barChart.addSeries(["Gender"], dimple.plot.bar);
        barChart.draw(2000);
    });
}

function sortFemalePercent() {
    svg.selectAll('*').remove();
    d3.csv("gender_ex.csv", function (data) {
        var barChart = new dimple.chart(svg, data);
        barChart.setBounds(60, 30, 510, 305);
        var x = barChart.addCategoryAxis("x", "Major");
        x.addOrderRule(function (a, b) {
            console.log(a);
            return (b.Students[0] / b.Students[2]) - (a.Students[0] / a.Students[2]);
        });
        var y = barChart.addMeasureAxis("y", "Students");
        y.tickFormat = ",.f";
        barChart.addSeries(["Gender"], dimple.plot.bar).addOrderRule(["Female", "Male"]);
        barChart.defaultColors = [
        new dimple.color("#ff0000"),
        new dimple.color("#0000ff")
    ];
        barChart.draw(2000);
    });
}
