$(function() {
  $('#hcContainer').highcharts({
    // Load Data in from Google Sheets
    data: {
      googleSpreadsheetKey: '1Kcya18x3BzxArcSA3bzcPuOTh089cVlrnsbIEqmiWtk',
      googleSpreadsheetWorksheet: 1,
      complete: function (data) {
        // Display legend alphabetically
        const dataItems = data.series
        let dataNames = []

        dataItems.forEach(item => {
            item.legendIndex = ''
            dataNames.push(item.name)
          })

        let notSorting = dataNames.filter(arrayItem => arrayItem === 'Others')
        let alphaSorting = dataNames.filter(arrayItem => arrayItem !== 'Others')
        alphaSorting.sort()
        if (notSorting.length > 0) {
          alphaSorting.push(notSorting[0])
        }

          dataItems.forEach(item => {
            for (i = 0; i < alphaSorting.length; i++) {
              if (item.name === alphaSorting[i]) {
                item.legendIndex = i
              }
            }
          })
        },
    },
    // General Chart Options
    chart: {
      zoomType: 'x',
      type: 'line'
    },
    colors: ['#196c95', '#f9bc65', '#d66e42', '#4f9793', '#b5bdc1'],
    // Chart Title and Subtitle
    title: {
      text: "Количество космических пусков по странам"
    },
    subtitle: {
      text: "Количество пусков США, КНР, РФ, Японии и других стран с 1957 по " + (new Date().getFullYear())
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "Источник: Space-Track.org"
    },
    // Chart Legend
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
    },
    // Y Axis
    yAxis: {
      title: {
        text: "Количество пусков по годам"
      },
    },
    // Tooltip
    /*
    tooltip: {
        formatter: function () {
            return '<span style="color:' + this.series.color + '">● </span><b>' + this.point.series.name + '</b><br> x: ' + this.x + ' y: ' + this.y + '<br><i>x: ' + this.x + ' y: ' + this.y + '</i><br><b>x: ' + this.x + ' y: ' + this.y + '</b>';
        }
    },    */
    // Additional Plot Options
    plotOptions:
    {
      area: {
        stacking: null, // Normal bar graph
        // stacking: "normal", // Stacked bar graph
        fillOpacity: .7,
        marker: {
          enabled: false,
          symbol: "circle"
        }
      }
    }
  });
});
