<template>
  <q-page>
    <div class="page-rewards-header text-h4">My Rewards</div>
    <div class="page-rewards-subheader caption">See your estimated rewards for this period</div>

    <div class="q-pa-md container">
      <comp-wallet-rewards :Reward_Data="Reward_Data" />
    </div>

  </q-page>
</template>


<script>
// in de page komt alles samen en word alles getoond,
// Addres word opgeslagen in de state van van de formdatastoren in pinia
// de server DATA word opgeslagen als json-list in de state van de mypythonstore in pinia
// address komt uit het form component geimporteeerd in de layout.vue
// Containercomp leveren de warriors
// points en total leveren de nummers
// address word geleverd door de store
// in de pagina heb ik een nested card gemaakt met data en address en daarondere worden de warriors geladen.
// door de pinia store blijft de data 'staan' als je heen en weer gaat in taps en hoeft axios maaar een keer gedaan te worden
// op het moment dat het adress veranderd en de button gedrukt veranderd gebeurt da axios call weer automatisch

import CompWalletRewards from "src/components/Comp-WalletRewards.vue"; // importeer het containercomp component
import { useformDataStore } from "/src/stores/formDataStore"; // importeer het formdatastore component
import { usemyPythonStore } from "src/stores/myPythonStore"; // importeer het myPythonstore component
import { computed, ref } from "vue"; // importeer ref en computed van vue.
import { watchEffect } from "vue"; // importeer watcheffect van vue

export default {
  components: {
    CompWalletRewards // Registreren van het containers component
  },

  setup() {
    const myPythonStore = usemyPythonStore();
    const formDataStore = useformDataStore(); // Access the store instance
    const address = computed(() => formDataStore.getAddress); // Get address from formDataStore
    const posts = ref([]); // Create a reactive ref for posts array

    // Create computed properties for sliced posts
    const Reward_Data = computed(() => posts.value[2]);    // here I use [1] as I want to have the 2nd entry from the list of the backend
    const Overview_Data    = computed(() => posts.value[3]);    // here I use [2] as I want to have the 3rd entry from the list of the backend
    const NFT_List    = computed(() => posts.value.slice(4));      // here I use a slice, as I want to have the remaining list frpm the backend
      
    // Watcher for address value and axios call
    watchEffect(() => {
      if (address.value) {
        console.log("Address changed:", address.value); // Log address change
        myPythonStore.fetchPost();
      }
    });

    // Watcher for server response changes
    watchEffect(() => {
      posts.value = myPythonStore.pythonResponse;
      console.log("posts updated:", posts.value); // Log posts update

      // Additional logs to check the newly created constants
      console.log("Reward_Data in parent:", Reward_Data.value);
      console.log("Overview_Data in parent:", Overview_Data.value);
      console.log("NFT_List in parent:", NFT_List.value);
    });

    // Return variables to be used in the template
    return {
      formDataStore,
      address,
      posts,
      Reward_Data,
      Overview_Data,
      NFT_List,
    };
  },
};
</script>

<style lang="sass">
.page-rewards-header
  margin-top: 30px

.page-rewards-subheader
  margin-bottom: 10px
  margin-top: 10px

.example-row-nesting
  .row
    background: rgba(#aa0, .1)
  .row > div
    padding: 10px 15px
    background: rgba(#999,.15)
    border: 1px solid rgba(#999,.2)
</style>
