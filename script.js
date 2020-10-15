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
                name:"Tehnopol",
                data:data['18'].map(function(val){return [new Date(val[1]).getTime(),val[0]]})
            },{
                name:"Vanalinn",
                data:data['374'].map(function(val){return [new Date(val[1]).getTime(),val[0]]})
            },{
                name:"Ülemistel",
                data:data['491'].map(function(val){return [new Date(val[1]).getTime(),val[0]]})
            }]
        });
    });


});