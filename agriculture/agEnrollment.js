function title(svg, title) {

    svg.selectAll("title_text")
        .data([title])
        .enter()
        .append("text")
        .attr("x", 10)
        .attr("y", 15)
        .style("font-family", "sans-serif")
        .style("font-size", "16px")
        .style("color", "Black")
        .text(function (d) {
            return d;
        });
}

d3.csv("agriculture_enrollment.csv", function (data) {

    var svg03 = dimple.newSvg("#ringChart", 800, 600);
    svg03.attr("id", "svg03");
    title(svg03, "Major / Student")
    var myChart = new dimple.chart(svg03, data);
    myChart.setBounds(20, 20, 460, 460)
    var p = myChart.addMeasureAxis("p", "Students");
    p.tickFormat = ",.f";
    var ring = myChart.addSeries("Major", dimple.plot.pie);
    ring.innerRadius = "50%";
    var myLegend = myChart.addLegend(500, 20, 90, 400, "left");

    //set default color scheme
    myChart.defaultColors = [
                new dimple.color("#1f77b4"),
                new dimple.color("#aec7e8"),
                new dimple.color("#ff7f0e"),
                new dimple.color("#ffbb78"),
                new dimple.color("#2ca02c"),
                new dimple.color("#98df8a"),
                new dimple.color("#d62728"),
                new dimple.color("#ff9896"),
                new dimple.color("#9467bd"),
                new dimple.color("#c5b0d5"),
                new dimple.color("#8c564b"),
                new dimple.color("#c49c94"),
                new dimple.color("#e377c2"),
                new dimple.color("#f7b6d2"),
                new dimple.color("#7f7f7f"),
                new dimple.color("#c7c7c7"),
                new dimple.color("#bcbd22"),
                new dimple.color("#dbdb8d"),
                new dimple.color("#17becf"),
                new dimple.color("#9edae5"),
                new dimple.color("#5254a3"),
                new dimple.color("#9c9ede"),
                new dimple.color("#8ca252"),
                new dimple.color("#cedb9c"),
                new dimple.color("#bd9e39"),
                new dimple.color("#e7cb94"),
                new dimple.color("#ad494a"),
                new dimple.color("#e7969c"),
                new dimple.color("#a55194"),
                new dimple.color("#de9ed6")

            ];

    myChart.draw();


});

function getLink(a, key) {
    for (var j = 0; j < a.length; j++) {
        console.log(a[j].Major);
        if ((a[j].Major) == key) return a[j].Students;
    }
    return null;
}
