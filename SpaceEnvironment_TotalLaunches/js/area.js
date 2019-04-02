$(function() {
  $('#hcContainer').highcharts({
    // Load Data in from Google Sheets
    data: {
      googleSpreadsheetKey: '1FpDY2RRA1EW5Pk7cK9tRSstaH6P0f-2GEDc_VjNRI4o',
      googleSpreadsheetWorksheet: 1,
      complete: function (data) {
        // Display legend alphabetically
        let dataItem = data.series
        let dataNames = []

          dataItem.forEach(item => {
              item.legendIndex = ''
              dataNames.push(item.name)
            })

            notSorting = dataNames.filter(arrayItem => arrayItem === 'Others')
            alphaSort = dataNames.filter(arrayItem => arrayItem !== 'Others')
            alphaSort.sort().push(notSorting[0])

            dataItem.forEach(item => {
              for (i = 0; i < alphaSort.length; i++) {
                if (item.name === alphaSort[i]) {
                  item.legendIndex = i
                }
              }
            })
          },
    },
    // General Chart Options
    chart: {
      zoomType: 'x',
      type: 'area'
    },
    colors: ['#196c95', '#f9bc65', '#d66e42', '#b5bdc1'],
    // Chart Title and Subtitle
    title: {
      text: "Space Environment: Total Launches by Country"
    },
    subtitle: {
      text: "Total Lauches from the United States, China, Russia, and All Other Space-faring Nations from 1957 to 2018"
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS Aerospace Security | Source: Space-Track.org"
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
        text: "Total Launches per Year"
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
        fillOpacity: .8,
        marker: {
          enabled: false,
          symbol: "circle"
        }
      }
    }
  });
});
