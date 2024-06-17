<template>
  <div class="app">
    <q-card class="totals-project-card" flat>
      <div class="q-pa-md text-h4" style="display: flex; justify-content: space-between; margin-left: 50px;"> Project Performance
        <q-btn-dropdown :label="formatDate(currentDate)" color="primary" v-model="dropdownOpen"> <!-- Update this line -->
          <q-list>
            <q-item v-for="(key, index) in Object.keys(data)" :key="index" clickable @click="onItemClick(key)">
              <q-item-section>
                <q-item-label>{{ formatDate(key) }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>

      <q-card-section>
        <div class="q-card-elements">
          <q-card class="subcard">
            <q-card-section>
              <div class="text-h5 q-mt-sm q-mb-xs">Mining:
                <div class="text">
                  ${{ formattedPostData['Total project mining rewards']?.toFixed(2) }}
                </div>
              </div>
            </q-card-section>
          </q-card>

          <q-card class="subcard">
            <q-card-section>
              <div class="text-h5 q-mt-sm q-mb-xs">Royalties:
                <div class="text">
                  ${{ formattedPostData['Total project royalties']?.toFixed(2) }}
                </div>
              </div>
            </q-card-section>
          </q-card>

          <q-card class="subcard">
            <q-card-section>
              <div class="text-h5 q-mt-sm q-mb-xs">Ecosystem fees:
                <div class="text">
                  ${{ formattedPostData['Total project ecosystem fees']?.toFixed(2) }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const data = ref({});
    const currentDate = ref('');
    const dropdownOpen = ref(false);  // Reactive property to control the dropdown visibility

    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get_metadata');
        data.value = response.data;
        currentDate.value = Object.keys(data.value)[0];  // Set the first date initially
        dropdownOpen.value = false;  // Ensure dropdown is closed initially
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const onItemClick = (key) => {
      currentDate.value = key;
      dropdownOpen.value = false;  // Close the dropdown when an item is clicked
    };

    const formattedPostData = computed(() => {
      return data.value[currentDate.value] || {};
    });

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    };

    return { currentDate, formattedPostData, onItemClick, formatDate, dropdownOpen, data };
  }
};
</script>

<style>
.app {
  /* max-width: 600px; */
  margin: 0 auto;
  padding: 20px;
}
.totals-project-card {
  width: 100%;
  margin-top: 20px;
}
.subcard {
  width: 300px;
  height: 250px;
}
.q-card-elements {
  display: flex;
  justify-content: space-around;
}
.text {
  display: flex;         /* Enable flexbox */
  justify-content: center; /* Center horizontally */
  align-items: center;   /* Center vertically */
  font-size: 1.2em;       /* Increase the font size for better readability */
  font-weight: bold;     /* Make numbers bold to stand out */ 
  margin: 10px;         /* Add space around the element */
  margin-top: 50px;
}
</style>
