$(function () {

    jQuery.getJSON("https://gym-count.azurewebsites.net/api/Count",function( data ) {
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container'
            },
            xAxis: {
                type: 'datetime'
            },
            series: data
        });
    });


});