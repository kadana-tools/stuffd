<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form class="q-gutter-md">
      <q-input
        filled
        v-model="address"
        label="submit $handle or wallet address"
      />
    </q-form>
    <div>
      <q-btn @click="updateAddress" label="Check wallet" color="primary" />
    </div>
  </div>
</template>

<script>
// de @click is de button action, die de store action triggered
// bij :rules kun je lazy-rules in voeren voor de input
import { useformDataStore } from "/src/stores/formDataStore"; // Importeerd Pinia store altijd use....
import { ref } from "vue";

export default {
  setup() {
    const formDataStore = useformDataStore(); // Toegang krijgen tot de Pinia store
    const address = ref("");

    const updateAddress = () => {
      formDataStore.updateAddress(address.value); // de action
    };

    return {
      address,
      updateAddress,
    };
  },
};
</script>
