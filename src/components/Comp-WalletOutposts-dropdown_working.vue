<template>
  <q-card class="my-outposts" flat>
    <q-card-section>
      <div class="outposts-header text-h4"></div>

      <q-btn-dropdown :label="currentDate ? rewardDate(currentDate) : 'Select Date'" color="primary" v-model="dropdownOpen">
        <q-list>
          <q-item v-for="(date, index) in availableDates" :key="index" clickable @click="onItemClick(date)">
            <q-item-section>
              <q-item-label>{{ rewardDate(date) }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <div class="container row justify-center q-gutter-sm">
        <q-intersection
          v-for="(post, index) in NFT_List"
          :key="index"
          once
          transition="scale"
          class="card"
        >
          <div>
            <q-card flat bordered class="q-ma-sm">
              <img
                :src="post.Image"
                fixed-centre
                class="image"
                alt="Outpost Image"
              />

              <q-card-section>
                <div class="text-h7 q-mt-sm q-mb-xs text-weight-bold">{{ post.Outpost_ID }}</div>
                <div class="text-caption text-black">Faction: {{ post.Faction }}</div>

                <div v-if="currentDate">
                  <div class="text-caption text-black">Mining: {{ post.MiningRewards[currentDate] || 'N/A' }} ada</div>
                  <div class="text-caption text-black" v-if="post.DerpRewards">$Derp: {{ post.DerpRewards }} / epoch</div>
                  <div class="text-caption text-black" v-if="post.EcosystemFees">Ecosystem fees: {{ post.EcosystemFees[currentDate] || 'N/A' }} ada</div>
                  <div class="text-caption text-black" v-if="post.Royalties">Royalties: {{ post.Royalties[currentDate] || 'N/A' }} ada</div>
                </div>
                <div v-else>No rewards data available for selected date.</div>
              </q-card-section>
            </q-card>
          </div>
        </q-intersection>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  props: {
    NFT_List: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const currentDate = ref('');
    const dropdownOpen = ref(false);

    const availableDates = computed(() => {
      const dates = new Set();
      props.NFT_List.forEach(post => {
        Object.keys(post.MiningRewards || {}).forEach(date => dates.add(date));
      });
      return Array.from(dates);
    });

    const onItemClick = (date) => {
      currentDate.value = date;
      dropdownOpen.value = false;
    };

    const rewardDate = (dateString) => {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    };

    return { currentDate, dropdownOpen, availableDates, onItemClick, rewardDate };
  }
};
</script>

<style lang="sass" scoped>
.container
  margin-top: 20px

.image
  max-width: 200px //* Adjust the max-width as needed */
  max-height: 200px //* Adjust the max-height as needed */
</style>
