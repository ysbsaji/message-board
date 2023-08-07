<template>
  <v-app>
    <side-bar v-if="isAuthenticated" />
    <app-bar v-if="isAuthenticated" />

    <v-main class="bg">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { readFromLocalStorage } from "./utils/localStorageHandler";
export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  components: {
    "side-bar": () => import("@/components/SideBar.vue"),
    "app-bar": () => import("@/components/AppBar.vue"),
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      const userDetails = readFromLocalStorage("userDetails");
      this.$store.commit("userDetails", userDetails);
    },
  },
};
</script>
<style>
::-webkit-scrollbar {
  margin-bottom: 14px !important;
  width: 6px !important;
}
::-webkit-scrollbar-track {
  -webkit-border-radius: 6px !important;
  margin-bottom: 14px !important;
  border-radius: 6px !important;
  -webkit-box-shadow: inset 0 0 6px rgba(250, 250, 250, 1) !important;
}
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 6px !important;
  margin-bottom: 14px !important;
  border-radius: 6px !important;
  background: #6d42d8 !important;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;
}
</style>
