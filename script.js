$(function () {
    var tehnopol = Highcharts.chart('tehnopol', getChartTemplate('Tehnopol'));
    tehnopol.showLoading();
    var ylemiste = Highcharts.chart('ylemiste', getChartTemplate('Ülemiste'));
    ylemiste.showLoading();
    var vanalinn = Highcharts.chart('vanalinn', getChartTemplate('Vanalinn'));
    vanalinn.showLoading();

    jQuery.getJSON("https://gym-count.azurewebsites.net/api/month-statistics", function (data) {
        tehnopol.series[0].setData(data['18']);
        tehnopol.hideLoading();
        ylemiste.series[0].setData(data['491']);
        ylemiste.hideLoading();
        vanalinn.series[0].setData(data['374']);
        vanalinn.hideLoading();
    });
});

function getChartTemplate(name) {
    chart_template.title.text = name;
    chart_template.series[0].name = name;
    return chart_template;
}

function getPointCategoryName(point, dimension) {
    var series = point.series,
        isY = dimension === 'y',
        axis = series[isY ? 'yAxis' : 'xAxis'];
    return axis.categories[point[isY ? 'y' : 'x']];
}

var chart_template = {

    chart: {
        type: 'heatmap',
        backgroundColor: '#212121'
    },

    title: {
        text: '',
        style: { "color": "#ebebeb", "fontSize": "18px" }
    },

    xAxis: {
        categories: ['00:00 - 01:00',
            '01:00 - 02:00',
            '02:00 - 03:00',
            '03:00 - 04:00',
            '04:00 - 05:00',
            '05:00 - 06:00',
            '06:00 - 07:00',
            '07:00 - 08:00',
            '08:00 - 09:00',
            '09:00 - 10:00',
            '10:00 - 11:00',
            '11:00 - 12:00',
            '12:00 - 13:00',
            '13:00 - 14:00',
            '14:00 - 15:00',
            '15:00 - 16:00',
            '16:00 - 17:00',
            '17:00 - 18:00',
            '18:00 - 19:00',
            '19:00 - 20:00',
            '20:00 - 21:00',
            '21:00 - 22:00',
            '22:00 - 23:00',
            '23:00 - 00:00']
    },

    yAxis: {
        categories: ['Esmaspäev', 'Teisipäev', 'Kolmapäev', 'Neljapäev', 'Reede', 'Laupäev', 'Pühapäev'],
        title: null,
        reversed: true
    },

    colorAxis: {
        min: 0,
        minColor: '#212121',
        maxColor: '#ffd400'
    },

    legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
    },

    tooltip: {
        formatter: function () {
            return '<b>' + getPointCategoryName(this.point, 'y') + '</b> kell <br><b>' + getPointCategoryName(this.point, 'x') + '</b> oli klubis <br><b>' + this.series.name + '</b> inimesi <br><b>' + this.point.value + '</b>';
        }
    },

    exporting: {
        enabled: false
    },

    credits: {
        enabled: false
    },

    series: [{
        borderWidth: 0,
        data: null
    }],
    plotOptions:{
        heatmap:{
            dataLabels:{
                enabled: true,
                style: { color:'#665d4a',textOutline: 'none'}
            }
        }
    },

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                yAxis: {
                    labels: {
                        formatter: function () {
                            return this.value.charAt(0);
                        }
                    }
                }
            }
        }]
    }

}
