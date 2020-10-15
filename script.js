$(function () {

    jQuery.getJSON("https://gym-count.azurewebsites.net/api/Count",function( data ) {
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container'
            },
            xAxis: {
                type: 'datetime'
            },
            series: [{
                data:data['17'].map(function(val){return [new Date(val[1]).getTime(),val[0]]})
            }]
        });
    });


});