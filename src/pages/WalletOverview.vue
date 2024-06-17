<template>
  <q-page class="my-overview-page">
    <div class="page-overview-header text-h4">My Overview</div>
    <div class="page-overview-subheader caption">See the important stats of your NFT collection</div>

    <div class="overview-containers">

      <div class="q-pa-md pivot-table-container">
        <comp-wallet-pivottable v-if="Pivottable_Data" :Pivottable_Data="Pivottable_Data"></comp-wallet-pivottable>
        <comp-wallet-pivottable v-else></comp-wallet-pivottable>  <!-- the if-else statement is added here so that when Pivottable is empty (no wallet address is queried), Pivottable_Data is not passed to the child, such that the default value there will be triggered. See child componenent for specification of the default value -->
      </div>

      <div class="q-pa-md overview-container">
        <comp-wallet-overview :Overview_Data="Overview_Data" />
      </div>

    </div>

  </q-page>
</template>

<script>

import CompWalletOverview from 'src/components/Comp-WalletOverview.vue';
import CompWalletPivottable from 'src/components/Comp-WalletPivottable.vue';
import { useformDataStore } from "/src/stores/formDataStore"; 
import { usemyPythonStore } from "src/stores/myPythonStore"; 
import { computed, ref } from "vue";
import { watchEffect } from "vue";

export default {
  components: {
    CompWalletOverview, 
    CompWalletPivottable,
  },

  setup() {
    const myPythonStore = usemyPythonStore();
    const formDataStore = useformDataStore();
    const address = computed(() => formDataStore.getAddress);
    const posts = ref([]);

    const Pivottable_Data = computed(() => (posts.value.length > 1 ? posts.value[1] : null));
    const Reward_Data = computed(() => (posts.value.length > 2 ? posts.value[2] : null));
    const Overview_Data = computed(() => (posts.value.length > 3 ? posts.value[3] : null));
    const NFT_List = computed(() => posts.value.slice(4));

    watchEffect(() => {
      if (address.value) {
        console.log("Address changed:", address.value);
        myPythonStore.fetchPost();
      }
    });

    watchEffect(() => {
      posts.value = myPythonStore.pythonResponse;
      console.log("posts updated:", posts.value);
      console.log("Pivottable_Data in parent:", JSON.stringify(Pivottable_Data.value, null, 2)); // Detailed log
      console.log("Reward_Data in parent:", Reward_Data.value);
      console.log("Overview_Data in parent:", Overview_Data.value);
      console.log("NFT_List in parent:", NFT_List.value);
    });

    return {
      formDataStore,
      address,
      posts,
      Reward_Data,
      Overview_Data,
      NFT_List,
      Pivottable_Data,
    };
  },
};
</script>

<style lang="sass">

.page-overview-header
  margin-top: 30px

.page-overview-subheader
  margin-bottom: 10px
  margin-top: 10px

.overview-containers 
  display: flex
  justify-content: space-around
  align-items: stretch /* Ensures children take the full height of the container */

  
.pivot-table-container 
  width: 75%


.overview-container 
  width: 22%


.example-row-nesting
  .row
    background: rgba(#aa0, .1)
  .row > div
    padding: 10px 15px
    background: rgba(#999,.15)
    border: 1px solid rgba(#999,.2)
</style>
