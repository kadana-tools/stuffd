<template>
  <q-card class="my-rewards" flat>
    <q-card-section>
      <div class="text-h4"></div>
        
      <div class="q-card-elements" v-if="Reward_Data">    
        
        <q-card class="subcard">
            <q-card-section>
              <div class="text-h5 q-mt-sm q-mb-xs">Mining:
                <div class="text">
                  {{ Reward_Data["Total wallet mining rewards"] }} dollar
                </div>
              </div>
            </q-card-section>
          </q-card>

          <q-card class="subcard">
            <q-card-section>
              <div class="text-h5 q-mt-sm q-mb-xs">Royalties:
                <div class="text">
                  {{ Reward_Data["Total wallet royalties"] }} ada
                </div>
              </div>
            </q-card-section>
          </q-card>

          <q-card class="subcard">
            <q-card-section>
              <div class="text-h5 q-mt-sm q-mb-xs">Ecosystem fees:
                <div class="text">
                  {{ Reward_Data["Total wallet ecosystem fees"] }} ada
                </div>
              </div>
            </q-card-section>
          </q-card>

          <q-card class="subcard">
            <q-card-section>
              <div class="text-h5 q-mt-sm q-mb-xs">$Derp:
                <div class="text">
                  {{ Reward_Data["Total wallet derp rewards"] }} / epoch
                </div>
              </div>
            </q-card-section>
          </q-card>
      
      </div>

      <div v-else>No rewards data available.</div>

    </q-card-section>
  </q-card>
</template>


<script>
export default {
  props: {
    Reward_Data: Object
  },
  setup(props) {
    console.log("Reward_Data in child:", props.Reward_Data); // Log Reward_Data in child component
  }
};
</script>


<style scoped>

.subcard {
  margin-top: 50px; /* Adjust this value to move the card further down */
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




