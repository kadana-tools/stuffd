<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="text-white header">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div class="q-px-lg q-pt-xl q-mb-lg">
            <div class="text-h4">Outposts - Derp Birds</div>
            <div class="text-subtitle1">by Kadana Labs</div>
          </div>
        </q-toolbar-title>

        <q-img src="~/assets/SoMuchFun.png" class="header-image absolute top" />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="My Wallet" />
        <q-route-tab to="/Project" label="Project" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above :width="300" :breakpoint="600">
      <template v-if="isRootPath">
        <div>
          <comp-input-form :posts="posts" />
        </div>

        <q-list padding>
          <q-item to="/" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="assessment" />
            </q-item-section>
            <q-item-section> My Overview</q-item-section>
          </q-item>

          <q-item to="/MyRewards" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="account_balance" />
            </q-item-section>
            <q-item-section> My Rewards </q-item-section>
          </q-item>

          <q-item to="/MyOutposts" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="wallet" />
            </q-item-section>
            <q-item-section> My Outposts </q-item-section>
          </q-item>
        </q-list>
      </template>

      <template v-else>
        <q-list padding>
          <q-item to="/Project-Performance" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section> Project Performance </q-item-section>
          </q-item>
        </q-list>
      </template>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import CompInputForm from "src/components/Comp-InputForm.vue";

export default {
  name: "MainLayout",

  components: {
    CompInputForm, // Register the address input form
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const route = useRoute();

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const isRootPath = computed(() => route.path === "/");

    const handleFormSubmitted = () => {
      // this is probably a remnant of previous attempts
    };

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      isRootPath,
      handleFormSubmitted,
      posts: []
    };
  }
};
</script>

<style lang="scss">
.header-image {
  height: 140px;
  z-index: -1;
}
.header {
  background-color: rgb(67, 69, 98); /* Replace with your desired color */
}
</style>
