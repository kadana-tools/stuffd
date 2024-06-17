<template>
  <q-page>
    <div class="page-outposts-header text-h4">My Outposts</div>
    <div class="page-outposts-subheader caption">See more details for each NFT</div>

    <div class="q-pa-md container"> 
      <comp-wallet-outposts :NFT_List="NFT_List" />
    </div>
  </q-page>
</template>

<script>
import CompWalletOutposts from 'src/components/Comp-WalletOutposts.vue';
import { useformDataStore } from "/src/stores/formDataStore"; // Ensure the path is correct
import { usemyPythonStore } from "src/stores/myPythonStore"; // Ensure the path is correct
import { computed, ref } from "vue"; // Import ref and computed from Vue
import { watchEffect } from "vue"; // Import watchEffect from Vue

export default {
  components: {
    CompWalletOutposts // Register the ContainerComp component
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

    return {
      formDataStore,
      address,
      posts,
      Reward_Data,
      Overview_Data,
      NFT_List, // actually only NFT_List needs to be returned, as it is the only const used in the template
    };
  },
};
</script>

<style lang="sass">
.page-outposts-header
  margin-top: 30px

.page-outposts-subheader
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
