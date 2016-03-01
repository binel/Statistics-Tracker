d3.csv('international_enrollment.csv', function(data){

    console.log(data);

    var dataset = {}

    var values = data.map(function(obj){return obj.Students;});

    var minValue = Math.min.apply(null, values);
    var maxValue = Math.max.apply(null, values);


    //create color palette function
    var paletteScale = d3.scale.log()
            .base(10)
            .domain([minValue, maxValue])
            .range(["#efefff", "#02386f"]);

    data.forEach(function(item){
        var iso = item.ISO,
            value = item.Students;
        dataset[iso] = {value: value, fillColor: paletteScale(value)};
    });
    dataset['USA'] = {value: 0, fillColor: 'gray'};

    var map = new Datamap({
        element: document.getElementById('map'),
        data: dataset,
        projection: 'mercator',
        fills: {
            HIGH: '#afafaf',
            LOW: '#123456',
            MEDIUM: 'blue',
            USA: 'darkgray',
            defaultFill: 'lightgray'
        },
        responsive: true,
        geographyConfig: {
            popupTemplate: function(geo, data){
                if(geo.id == 'USA'){
                    return ['<div class="hoverinfo"><strong>'+
                    geo.properties.name + '</div>'];
                }
                return ['<div class="hoverinfo"><strong>',
                    geo.properties.name,
                    '<br/>Students: ' + data.value + '',
                       '</div>'].join('');
            }
        }



    });


    window.addEventListener('resize', function(){
        map.resize();
    });
});
