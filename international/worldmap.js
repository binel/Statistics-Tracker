d3.csv('international_enrollment.csv', function (data) {

    //console.log(data);

    var dataset = {}

    var values = data.map(function (obj) {
        return obj.Students;
    });

    var minValue = Math.min.apply(null, values);
    var maxValue = Math.max.apply(null, values);


    //create color palette function
    var paletteScale = d3.scale.log()
        .base(10)
        .domain([minValue, maxValue])
        .range(["#efefff", "#02386f"]);

    data.forEach(function (item) {
        var iso = item.ISO,
            value = item.Students;
        dataset[iso] = {
            value: value,
            fillColor: paletteScale(value)
        };
    });
    dataset['USA'] = {
        value: 0,
        fillColor: 'gray'
    };

    var map = new Datamap({
        element: document.getElementById('map'),
        data: dataset,
        projection: 'mercator',
        fills: {
            defaultFill: 'lightgray'
        },
        responsive: false,
        geographyConfig: {
            popupTemplate: function (geo, data) {
                if (geo.id == 'USA') {
                    return ['<div class="hoverinfo"><strong>' +
                    geo.properties.name + '</div>'];
                }
                return ['<div class="hoverinfo"><strong>',
                    geo.properties.name,
                    '<br/>Students: ' + data.value + '',
                       '</div>'].join('');
            }
        }



    });



    var columns = [
        {
            head: '',
            cl: 'flags',
            html:  function(d){
                return '<img src="flags/' + d.Flag + '.png" height=30, width=50></img>';
            }
        },
        {
            head: 'Country',
            cl: 'title',
            html: d3.f('Country')
        },
        {
            head: 'Students',
            cl: 'num',
            html: d3.f('Students')
        }

    ];

    // create table
    var table = d3.select('#table1')
        .append('table');

    // create table header
    table.append('thead').append('tr')
        .selectAll('th')
        .data(columns).enter()
        .append('th')
        .attr('class', d3.f('cl'))
        .text(d3.f('head'));

    // create table body
    table.append('tbody')
        .selectAll('tr')
        .data(data).enter()
        .append('tr')
        .selectAll('td')
        .data(function (row, i) {
            return columns.map(function (c) {
                // compute cell values for this specific row
                var cell = {};
                d3.keys(c).forEach(function (k) {
                    cell[k] = typeof c[k] == 'function' ? c[k](row, i) : c[k];
                });
                return cell;
            });
        }).enter()
        .append('td')
        .html(d3.f('html'))
        .attr('class', d3.f('cl'));

});
