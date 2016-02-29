var svg = dimple.newSvg("#barChart", 600, 525);
d3.csv("hs_gender.csv", function (data) {
    var barChart = new dimple.chart(svg, data);
    barChart.setBounds(60, 30, 510, 305);
    var x = barChart.addCategoryAxis("x", "Major");
    var y = barChart.addMeasureAxis("y", "Students");
    y.tickFormat = ",.f";
    var mySeries = barChart.addSeries(["Gender"], dimple.plot.bar);
    mySeries.addEventHandler("click", function(e){
        console.log(e);
        console.log(e.xValue);
        window.location.assign(getLink(data, e.xValue));
    })

    barChart.draw(1000);
});


function sortMale() {
    svg.selectAll('*').remove();
    d3.csv("hs_gender.csv", function (data) {
        var barChart = new dimple.chart(svg, data);
        barChart.setBounds(60, 30, 510, 305);
        var x = barChart.addCategoryAxis("x", "Major");
        x.addOrderRule(function (a, b) {
            console.log(a);
            return b.Students[0] - a.Students[0];
        });
        var y = barChart.addMeasureAxis("y", "Students");
        y.tickFormat = ",.f";
        var mySeries = barChart.addSeries(["Gender"], dimple.plot.bar);
        mySeries.addEventHandler("click", function(e){
            console.log(e);
            console.log(e.xValue);
            window.location.assign(getLink(data, e.xValue));
        })

        barChart.draw(2000);
    });
}

function sortFemale() {
    svg.selectAll('*').remove();
    d3.csv("hs_gender.csv", function (data) {
        var barChart = new dimple.chart(svg, data);
        barChart.setBounds(60, 30, 510, 305);
        var x = barChart.addCategoryAxis("x", "Major");
        x.addOrderRule(function (a, b) {
            console.log(a);
            return b.Students[0] - a.Students[0];
        });
        var y = barChart.addMeasureAxis("y", "Students");
        y.tickFormat = ",.f";
        var mySeries = barChart.addSeries(["Gender"], dimple.plot.bar);
        mySeries.addEventHandler("click", function(e){
            console.log(e);
            console.log(e.xValue);
            window.location.assign(getLink(data, e.xValue));
        })
        mySeries.addOrderRule(["Female", "Male"]);
        barChart.defaultColors = [
            new dimple.color("#d26b5f"),
            new dimple.color("#80b1d3")
        ];

        barChart.draw(2000);
    });
}

function sortMalePercent() {
    svg.selectAll('*').remove();
    d3.csv("hs_gender.csv", function (data) {
        var barChart = new dimple.chart(svg, data);
        barChart.setBounds(60, 30, 510, 305);
        var x = barChart.addCategoryAxis("x", "Major");
        x.addOrderRule(function (a, b) {
            console.log(a);
            return (b.Students[0] / b.Students[2]) - (a.Students[0] / a.Students[2]);
        });
        var y = barChart.addMeasureAxis("y", "Students");
        y.tickFormat = ",.f";
        var mySeries = barChart.addSeries(["Gender"], dimple.plot.bar);
        mySeries.addEventHandler("click", function(e){
            console.log(e);
            console.log(e.xValue);
            window.location.assign(getLink(data, e.xValue));
        })
        barChart.draw(2000);
    });
}

function sortFemalePercent() {
    svg.selectAll('*').remove();
    d3.csv("hs_gender.csv", function (data) {
        var barChart = new dimple.chart(svg, data);
        barChart.setBounds(60, 30, 510, 305);
        var x = barChart.addCategoryAxis("x", "Major");
        x.addOrderRule(function (a, b) {
            console.log(a);
            return (b.Students[0] / b.Students[2]) - (a.Students[0] / a.Students[2]);
        });
        var y = barChart.addMeasureAxis("y", "Students");
        y.tickFormat = ",.f";
        var mySeries = barChart.addSeries(["Gender"], dimple.plot.bar);
        mySeries.addEventHandler("click", function(e){
            console.log(e);
            console.log(e.xValue);
            window.location.assign(getLink(data, e.xValue));
        })
        mySeries.addOrderRule(["Female", "Male"]);
        barChart.defaultColors = [
            new dimple.color("#d26b5f"),
            new dimple.color("#80b1d3")
        ];
        barChart.draw(2000);
    });
}

function getLink(a, key){
    for (var j = 0;  j < a.length; j++){
        console.log(a[j].Major);
        if ((a[j].Major) == key) return a[j].Link;
    }
    return null;
}
