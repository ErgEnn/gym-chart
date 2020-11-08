$(function () {
    var tehnopol = Highcharts.chart('tehnopol', getChartTemplate('Tehnopol'));
    tehnopol.showLoading();
    var ylemiste = Highcharts.chart('ylemiste', getChartTemplate('Ülemiste'));
    ylemiste.showLoading();
    var vanalinn = Highcharts.chart('vanalinn', getChartTemplate('Vanalinn'));
    vanalinn.showLoading();
    var allTemplate = getChartTemplate('Kõik');
    allTemplate.chart.width = 1195;
    allTemplate.colorAxis={stops:[
        [0,"#004015"],
        [0.05,"#004015"],
        [0.06,"#00ff55"],
        [0.2,"#00ff55"],
        [0.21,"#ffd400"],
        [0.39,"#ffd400"],
        [0.4,"#ff00ab"],
        [0.54,"#ff00ab"],
        [0.55,"#ff006a"],
        [1,"#ff006a"],
    ],
        max:100};
    var all = Highcharts.chart('all',allTemplate );
    all.showLoading();

    jQuery.getJSON("https://gym-count.azurewebsites.net/api/month-statistics", function (data) {
        tehnopol.series[0].setData(data['18']);
        tehnopol.hideLoading();
        ylemiste.series[0].setData(data['491']);
        ylemiste.hideLoading();
        vanalinn.series[0].setData(data['374']);
        vanalinn.hideLoading();
        all.series[0].setData(data['-1']);
        all.hideLoading();
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
            return '<b>' + getPointCategoryName(this.point, 'y') + '</b> kell <br><b>' + getPointCategoryName(this.point, 'x') + '</b> oli klubis <br><b>' + this.series.name + '</b> inimesi keskmiselt<br><b>' + this.point.value + '</b>';
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
