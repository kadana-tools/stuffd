// myPythonStore.js
import { defineStore } from "pinia";
import axios from "axios";
import { useformDataStore } from "./formDataStore";
import { store } from "quasar/wrappers";

// De state - pythonResponce is de server output een lijst in json format.
export const usemyPythonStore = defineStore("pythonStore", {
  state: () => ({
    pythonResponse: [],
  }),

  // de getter importeert het address dat is invoerd ven maakt hier de benodigde
  // formData van die nodig is voor de axios call.
  getters: {
    getAddress() {
      const formData = useformDataStore();
      return formData.address;
    },
  },

  // binnen actions word de axios call gedaan, nadat we de benodigde data hebben verkregen van de getter.
  actions: {
    async fetchPost() {
      const formData = useformDataStore();
      const address = formData.address;

      try {
        const data = await axios.post(
          "http://127.0.0.1:5000/get_metadata",
          { address }
        );
        this.pythonResponse = data.data;
      } catch (error) {
        console.function(error);
        if (error.response) {
          // Na of tijdens het maken van een request kan een fout optreden
          // die foutcode zal buiten de range van 2xx vallen.
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request is gedaan maar geen responce
          // `error.request` is een  instance van  XMLHttpRequest in de  browser en een instance van
          // http.ClientRequest in node.js.
          console.log(error.request);
        } else {
          // iets is voorgekomen tijdens het maken van een request die een fout heeeft veroorzaakt.
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    },
  },

  // Registering dependencies
  // This ensures that fetchPost action is called whenever the address in formDataStore changes
  // This is a Pinia specific way of handling dependencies
  // This is specific to Pinia
  // het onderstaande heb ik niet gedaan maar het werkt wel, weet dus niet wat er mee bedoeld word.
  // Make sure to import this store in main.js or equivalent
  // And call app.use(store) with both stores
  // Pinia will automatically handle the rest
  setup: (store) => {
    const formDataStore = useformDataStore();
    store.$subscribe(formDataStore, () => {
      store.fetchPost();
    });
  },
});
