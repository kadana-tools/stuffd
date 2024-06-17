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
              <div class="bar-chart-container">
                <apexchart 
                  ref="fortificationChart"
                  width="100%" 
                  type="radialBar"
                  :options="chartOptionsFortification"
                  :series="chartSeriesFortification">
                </apexchart>
                <div class="image-toggle-container">
                  <img 
                    v-for="(image, index) in images" 
                    :key="index" 
                    :src="image.src" 
                    :alt="image.alt" 
                    class="toggle-image"
                    :class="{ selected: selectedImageIndex === index }" 
                    @click="toggleSeries(image.alt, index)">
                </div>
                <div v-if="selectedSeriesValue !== null" class="series-value">
                  {{ selectedSeriesValue }}%
                </div>
                <div v-else class="series-value">
                  {{ fortifiedPercTotal }}%
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-card>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import img_pred from 'src/assets/pred.png';
import img_derpbird from 'src/assets/derpbird.png';
import img_derpling from 'src/assets/derpling.png';
import img_derpape from 'src/assets/derpape.png';

import VueApexCharts from "vue3-apexcharts";
import { ref, onMounted, watch } from 'vue';

export default {
  components: {
    apexchart: VueApexCharts
  },

  props: {
    Overview_Data: Object
  },

  setup(props) {
    const fortificationChart = ref(null);
    const selectedImageIndex = ref(null);
    const selectedSeriesValue = ref(null);
    const chartSeriesFortification = ref([0, 0, 0, 0]);

    const fortifiedPercTotal = ref(props.Overview_Data?.["Fortification perc_and_count"]?.["fortified_perc_total"] || 0);

    const updateChartSeries = () => {
      chartSeriesFortification.value = [
        props.Overview_Data?.["Fortification perc_and_count"]?.["fortified_perc_pred"].toFixed(1) || 0,
        props.Overview_Data?.["Fortification perc_and_count"]?.["fortified_perc_derp"].toFixed(1) || 0,
        props.Overview_Data?.["Fortification perc_and_count"]?.["fortified_perc_derpling"].toFixed(1) || 0,
        props.Overview_Data?.["Fortification perc_and_count"]?.["fortified_perc_derpape"].toFixed(1) || 0,
      ];
      fortifiedPercTotal.value = props.Overview_Data?.["Fortification perc_and_count"]?.["fortified_perc_total"].toFixed(1) || 0;
    };

    const toggleSeries = (seriesName, index) => {
      if (selectedImageIndex.value === index) {
        selectedImageIndex.value = null;
        selectedSeriesValue.value = null;
        fortificationChart.value.updateSeries(chartSeriesFortification.value);
      } else {
        const seriesNames = ["Preds", "Derp Birds", "Derplings", "Derp Apes"];
        seriesNames.forEach((name, i) => {
          if (name === seriesName) {
            selectedSeriesValue.value = chartSeriesFortification.value[i];
            selectedImageIndex.value = index;
          }
        });
        fortificationChart.value.updateOptions({
          series: chartSeriesFortification.value.map((val, i) =>
            i === index ? val : 0
          )
        });
      }
    };

    onMounted(() => {
      if (props.Overview_Data) {
        updateChartSeries();
      }
    });

    watch(() => props.Overview_Data, () => {
      if (props.Overview_Data) {
        updateChartSeries();
      }
    });

    return {
      fortificationChart,
      images: [
        { src: img_pred, alt: 'Preds' },
        { src: img_derpbird, alt: 'Derp Birds' },
        { src: img_derpling, alt: 'Derplings' },
        { src: img_derpape, alt: 'Derp Apes' }
      ],
      toggleSeries,
      selectedImageIndex,
      selectedSeriesValue,
      chartSeriesFortification,
      fortifiedPercTotal
    };
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
          position: 'bottom' 
        },
        colors: ['rgba(112,163,158,255)', 'rgba(182,63,106,255)', 'rgb(67, 69, 98)'],
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
              minAngleToShowLabel: 360 
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
          height: '100%',
          type: 'radialBar',
          expandOnClick: true,
          offsetY: -40,
          offsetX: 0,
        },
        labels: ["Preds", "Derp Birds", "Derplings", "Derp Apes"],
        colors: ['rgba(255,32,55,255)', 'rgba(0,210,219,255)', 'rgba(35,218,133,255)', 'rgba(247,160,62,255)'],
        legend: {
          show: false,
        },
        tooltip: {
          shared: false,
          intersect: true,
        },
        markers: {
          size: 0.1,
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 5,
              size: '47%',
              background: 'transparent',
            },
            track: {
              show: true,
              background: '#40475D',
              strokeWidth: '10%',
              opacity: 0.6,
              margin: 3,
            },
            dataLabels: {
              name: {
                show: false,
                fontSize: '16px',
                fontWeight: 600,
                offsetY: -10
              },
              value: {
                show: true,
                fontSize: '16px',
                fontWeight: 600,
                formatter: function (val, w) {
                  return val.toFixed(1) + '%';
                }
              },
              total: {
                show: false,
                fontSize: '16px',
                fontWeight: 600,
                color: 'rgb(0,0,0)',
              }
            },
            startAngle: -125,
            endAngle: 125,
          }
        }
      }
    }
  },

  computed: {
    chartSeriesTotal() {
      if (!this.Overview_Data || !this.Overview_Data["nr of NFTs"]) {
        return [0, 0, 0];
      }

      return [
        this.Overview_Data["nr of NFTs"]["#Smalls"] || 0,
        this.Overview_Data["nr of NFTs"]["#Mediums"] || 0,
        this.Overview_Data["nr of NFTs"]["#Larges"] || 0,
      ];
    },

    derpLockedValue() {
      if (!this.Overview_Data || !this.Overview_Data["Total $Derp Locked"]) {
        return '0';
      }
      return this.Overview_Data["Total $Derp Locked"];
    }
  }
};
</script>

<style scoped>
.image-toggle-container {
  display: flex;
  justify-content: center;
  margin-top: -10px;
}

.toggle-image {
  width: 30px;
  height: 30px;
  margin: 0 10px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: transform 0.2s ease;
}

.toggle-image.selected {
  transform: scale(1.75); /* Increase size by 33% */
}

.series-value {
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
}
</style>
