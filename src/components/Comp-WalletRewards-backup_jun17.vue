<template>
  <q-card class="my-rewards" flat>
    <q-card-section>
      <div class="text-h4"></div>

      <q-btn-dropdown :label="currentDate ? rewardDate(currentDate) : 'Select Date'" color="primary" v-model="dropdownOpen" v-if="Reward_Data">
        <q-list>
          <q-item v-for="(date, index) in availableDates" :key="index" clickable @click="onItemClick(date)">
            <q-item-section>
              <q-item-label>{{ rewardDate(date) }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <!-- v-if="currentDate && Reward_Data && Reward_Data['Total wallet mining rewards'] && Reward_Data['Total wallet royalties'] && Reward_Data['Total wallet ecosystem fees']" -->
      <div class="q-card-elements" >    

        <q-card class="subcard">
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">Mining:
              <div class="text">
                {{ miningRewards }} ada
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="subcard">
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">Royalties:
              <div class="text">
                {{ royalties }} ada
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="subcard">
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">Ecosystem fees:
              <div class="text">
                {{ ecosystemFees }} ada
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="subcard">
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">$Derp:
              <div class="text">
                {{ derpRewards }} / epoch
              </div>
            </div>
          </q-card-section>
        </q-card>

      </div>

      <!-- <div v-else>...</div> -->

    </q-card-section>
  </q-card>
</template>

<script>
import { ref, watch, computed } from 'vue';

export default {
  props: {
    Reward_Data: Object
  },
  setup(props) {
    const currentDate = ref('');
    const dropdownOpen = ref(false);
    const availableDates = ref([]);

    const fetchData = () => {
      if (props.Reward_Data && props.Reward_Data["Total wallet mining rewards"]) {
        availableDates.value = Object.keys(props.Reward_Data["Total wallet mining rewards"] || {});
        currentDate.value = availableDates.value[0] || '';  // Set the first date initially
      } else {
        console.error('Reward_Data is not properly initialized or missing required properties.');
      }
    };

    watch(() => props.Reward_Data, fetchData, { immediate: true });

    const onItemClick = (date) => {
      currentDate.value = date;
      dropdownOpen.value = false;
    };

    const rewardDate = (dateString) => {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    };

    // computed functions are defined to return 0 values in case no data is queried yet
    const miningRewards = computed(() => {
      return props.Reward_Data && props.Reward_Data['Total wallet mining rewards'][currentDate.value] || 0;
    });

    const royalties = computed(() => {
      return props.Reward_Data && props.Reward_Data['Total wallet royalties'][currentDate.value] || 0;
    });

    const ecosystemFees = computed(() => {
      return props.Reward_Data && props.Reward_Data['Total wallet ecosystem fees'][currentDate.value] || 0;
    });

    const derpRewards = computed(() => {
      return props.Reward_Data && props.Reward_Data['Total wallet derp rewards'] || 0;
    });

    return { currentDate, dropdownOpen, availableDates, onItemClick, rewardDate, miningRewards, royalties, ecosystemFees, derpRewards };  
  }
};
</script>

<style scoped>
.subcard {
  margin-top: 50px;
  width: 300px;
  height: 250px;
}

.q-card-elements {
  display: flex;
  justify-content: space-around;
}

.text {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  font-weight: bold;
  margin: 10px;
  margin-top: 50px;
}
</style>
