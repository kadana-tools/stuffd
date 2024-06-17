<template>
  <q-card class="my-outposts" flat>
    <q-card-section>
      <div class="outposts-header text-h4"></div>

      <div class="container row justify-center q-gutter-sm">
        <q-intersection
          v-for="(post, index) in NFT_List"
          :key="index"
          once
          transition="scale"
          class="card"
        >
          <div>
            <q-card flat bordered class="q-ma-sm">
              <img
                :src="post.Image"
                fixed-centre
                class="image"
                alt="Outpost Image"
              />

              <q-card-section>
              <div class="text-h7 q-mt-sm q-mb-xs text-weight-bold">{{ post.Outpost_ID }}</div>
              <div class="text-caption text-black">Faction: {{ post["Faction"] }}</div>
              <div class="text-caption text-black">Mining: {{ post["MiningRewards"] }} ada</div>
              <div class="text-caption text-black" v-if="post.DerpRewards">$Derp: {{ post["DerpRewards"] }} / epoch</div>
              <div class="text-caption text-black" v-if="post.EcosystemFees">Ecosystem fees: {{ post["EcosystemFees"] }} ada</div>
              <div class="text-caption text-black" v-if="post.Royalties">Royalties: {{ post["Royalties"] }} ada</div>
              </q-card-section>
            </q-card>
          </div>
        </q-intersection>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    NFT_List: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="sass" scoped>
.container
  margin-top: 20px

.image
  max-width: 200px //* Adjust the max-width as needed */
  max-height: 200px //* Adjust the max-height as needed */
</style>
