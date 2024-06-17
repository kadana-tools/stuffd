// formDataStore.js

import { defineStore } from "pinia";

export const useformDataStore = defineStore("formData", {
  state: () => ({
    address: "", // Wanneer de app voor de eerste keer geladen, word een leeg address "" string geinitieerd.
  }),

  getters: {
    getAddress() {
      return this.address; // de getter haald in dit geval het address als sting uit de state om hem als formdata aan axios te kunnen doorgeven.
    },
  },

  actions: {
    updateAddress(address) {
      this.address = address; // Actions (soort methods), in dit geval word hier de adress sting geupdate.
    },
  },
});
