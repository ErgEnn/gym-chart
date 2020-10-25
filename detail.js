$(function () {
    Highcharts.setOptions({
        time: {
            timezone: 'Europe/Tallinn'
        }
    });
    var chart = Highcharts.chart('container',{
        chart: {
            backgroundColor: '#212121'
        },
        title:{
            text: "Gym Eesti käesoleva nädala külastused",
            style: { "color": "#ebebeb", "fontSize": "18px" }
        },
        yAxis:{
            title:{
                enabled: false
            }
        },
        tooltip:{
            shared: true
        },
        xAxis: {
            type: 'datetime'
        },
        series: [{
            name:"Tehnopol",
            color: "#b99a00"
        },{
            name:"Vanalinn",
            color: "#00b93e"
        },{
            name:"Ülemiste",
            color: "#001fb9"
        }]
    });
    chart.showLoading();
    jQuery.getJSON("https://gym-count.azurewebsites.net/api/Count",function( data ) {
        chart.series[0].setData(data['18'].map(function(val){return [new Date(val[1]).getTime(),val[0]]}));
        chart.series[1].setData(data['374'].map(function(val){return [new Date(val[1]).getTime(),val[0]]}));
        chart.series[2].setData(data['491'].map(function(val){return [new Date(val[1]).getTime(),val[0]]}));
        chart.hideLoading();
    });


});