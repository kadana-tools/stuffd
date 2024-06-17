<template>
  <div class="app">
    <q-card class="totals-project-card" flat>
      <div class="q-pa-md text-h4" style="display: flex; justify-content: space-between; margin-left: 50px;">
        Project Performance
        <q-btn-dropdown :label="formatDate(currentDate)" color="primary" v-model="dropdownOpen">
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
                  ${{ formattedPostData['Mining']?.toFixed(2) }}
                </div>
              </div>
            </q-card-section>
          </q-card>

          <q-card class="subcard">
            <q-card-section>
              <div class="text-h5 q-mt-sm q-mb-xs">Royalties:
                <div class="text">
                  ${{ formattedPostData['Royalties']?.toFixed(2) }}
                </div>
              </div>
            </q-card-section>
          </q-card>

          <q-card class="subcard">
            <q-card-section>
              <div class="text-h5 q-mt-sm q-mb-xs">Ecosystem fees:
                <div class="text">
                  ${{ formattedPostData['Ecosystem']?.toFixed(2) }}
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
    const dropdownOpen = ref(false);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get_metadata');
        data.value = response.data;
        const keys = Object.keys(data.value);
        currentDate.value = keys[keys.length - 1];  // Set the last date initially
        dropdownOpen.value = false;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const onItemClick = (key) => {
      currentDate.value = key;
      dropdownOpen.value = false;
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  font-weight: bold;
  margin: 10px;
  margin-top: 50px;
}
</style>
