<template>
  <q-card class="totals-wallet-card">
    <q-card-section>
      <div class="subcard-elements">
        <q-card class="subcard">
          <q-card-section class="text-h6 q-mt-sm q-mb-xs">
            Total:

            <apexchart 
              width="100%"
              type="donut"
              :options="chartOptionsTotal"
              :series="chartSeriesTotal">
            </apexchart>

          </q-card-section>
        </q-card>

        <q-card class="subcard">
          <q-card-section class="text-h6 q-mt-sm q-mb-xs">Fortification:</q-card-section>
            <q-card>
              <q-card-section class="fully-fortified-data">
                Fully Fortified:

                <apexchart 
                  width="100%"
                  type="bar"
                  :options="chartOptionsFortification"
                  :series="chartSeriesFortification">
                </apexchart>
                
              </q-card-section>
            </q-card>
          <q-card>
            <q-card-section class="derp-locked">
              <div class="derp-locked-wrapper">
                <div class="common-label">$DERP locked:</div>
                <div class="derp-locked-value text-h6">{{ derpLockedValue }}</div>
              </div>
            </q-card-section>
          </q-card>
        </q-card>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts
  },

  props: {
    Overview_Data: Object
  },

  setup(props) {
    console.log("Overview_Data in child:", props.Overview_Data); // Log Overview_Data in child component
  },

  data() {
    return {
      chartOptionsTotal: {
        chart: {
          type: 'donut',
          id: 'vuechart-example',
        },
        labels: ['Small', 'Medium', 'Large'],
        legend: {
          position: 'bottom' // Adjust legend position if needed
        },
        colors: ['rgba(112,163,158,255)', 'rgba(182,63,106,255)', 'rgb(67, 69, 98)'], // Updated color for the third slice
        plotOptions: {
          pie: {
            startAngle: 0,
            endAngle: 360,
            expandOnClick: true,
            offsetX: 0,
            offsetY: 0,
            customScale: 1.14,
            dataLabels: {
              offset: 0,
              minAngleToShowLabel: 360    // I set this value to 360 to prevent the % labels to appear
            }, 
            donut: {
              size: '70%',
              background: 'transparent',
              labels: {
                show: true,
                name: {
                  show: false,
                  fontSize: '22px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 600,
                  color: undefined,
                  offsetY: 0,
                  formatter: function (val) {
                    return val
                  }
                },
                value: {
                  show: true,
                  fontSize: '22px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 600,
                  color: undefined,
                  offsetY: 8,
                  formatter: function (val) {
                    return val
                  }
                },
                total: {
                  show: true,
                  showAlways: true,
                  label: 'Total',
                  fontSize: '22px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 600,
                  color: ' #000000',
                  formatter: function (w) {
                    return w.globals.seriesTotals.reduce((a, b) => {
                      return a + b
                    }, 0)
                  }
                }
              }
            },      
          }
        }
      },
      chartOptionsFortification: {
        chart: {
        height: 50,
        type: 'bar',
        stacked: true,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          // borderRadius: 4,
          // borderRadiusApplication: 'end',
          horizontal: true,
          barHeight: '20%',
          colors: {
              ranges: [{
                  from: 0,
                  to: 0,
                  color: undefined
              }],
              backgroundBarColors: ['rgba(112,163,158,255)'], // 'rgb(67, 69, 98)' for series color?
              backgroundBarOpacity: 1,
              backgroundBarRadius: 0,
          },
        },
      },
      colors: ['rgb(67, 69, 98)'],
      dataLabels: {
          enabled: true,
          textAnchor: 'start',
          tyle: {
            colors: ['#fff']
          },    
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
      stroke: {
        width: 0,
      },
      tooltip: {
        enabled: false
      },
      xaxis: {
        categories: ['Process 1'],
      },
      yaxis: {
        max: 100
      },
      fill: {
        opacity: 1
      }
      }
    }
  },

  computed: {
    chartSeriesTotal() {
      if (!this.Overview_Data || !this.Overview_Data["nr of NFTs"]) {
        console.log("No data available");
        return [0, 0, 0];
      }

      const seriesData = [
        this.Overview_Data["nr of NFTs"]["#Smalls"] || 0,
        this.Overview_Data["nr of NFTs"]["#Mediums"] || 0,
        this.Overview_Data["nr of NFTs"]["#Larges"] || 0,
      ];

      console.log("Series Data:", seriesData);
      return seriesData;
    },
    
    formattedFortificationPercentage() {
      if (!this.Overview_Data || !this.Overview_Data["Fortification percentage"]) {
        return '0.0'; // or any other default value you want to display
      }
      return parseFloat(this.Overview_Data["Fortification percentage"]).toFixed(1);
    },

    derpLockedValue() {
      if (!this.Overview_Data || !this.Overview_Data["Total $Derp Locked"]) {
        return '0'; // or any other default value you want to display
      }
      return this.Overview_Data["Total $Derp Locked"];
    },

    chartSeriesFortification() {
      if (!this.Overview_Data || !this.Overview_Data["Fortification percentage"]) {
        return '0.0'; // or any other default value you want to display
      }

      const seriesFortificationData = [{
        name: 'Process 1',
        data: [this.Overview_Data["Fortification percentage"] || 0]
      }];

      console.log("Series Fortification Data:", seriesFortificationData);
      return seriesFortificationData;
    }
  } 
};
</script>

<style scoped>
</style>
