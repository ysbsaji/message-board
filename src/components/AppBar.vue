<template>
  <div>
    <v-app-bar app color="white" elevation="0" min-height="100">
      <v-row class="mt-3">
        <v-col cols="12" lg="7" md="4" sm="10"  xs="6">
          <v-avatar color="primary" class="ml-6" size="54">
            <span class="white--text text-h5">{{ userDetails.userName.charAt(0) }}</span>
          </v-avatar>
          <label class="mt-3 mx-3 font-weight-bold text-h6">
            <span>{{ userDetails.userName }}</span>
          </label>
        </v-col>
        <v-col class="my-2 mx-auto" cols="12" lg="5" md="8" sm="2" xs="6">
          <v-btn
            icon
            class="primary--text"
            @click="setSideBarStatus"
            v-if="!$vuetify.breakpoint.mdAndUp"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>

          <v-menu offset-y v-if="!$vuetify.breakpoint.mdAndUp">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-if="!$vuetify.breakpoint.mdAndUp"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon class="primary--text">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in filterOptions" :key="index">
                <v-list-item-title @click="filterType = item.value">{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <div class="bg pa-3 filter-btn" v-else>
            <v-btn
              :class="filterType == 'all' ? 'primary white--text' : 'depressed'"
              elevation="0"
              class="btn-custom"
              @click="filterType = 'all'"
              >All</v-btn
            >
            <v-btn
              :class="
                filterType == 'today' ? 'primary white--text' : 'depressed'
              "
              elevation="0"
              class="mx-2 btn-custom"
              @click="filterType = 'today'"
              >Today</v-btn
            >
            <v-btn
              :class="
                filterType == 'last7Days' ? 'primary white--text' : 'depressed'
              "
              class="btn-custom"
              elevation="0"
              @click="filterType = 'last7Days'"
              >Last 7 days</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      filterType: "all",
      filterOptions: [
        { title: "All", value: 'all' },
        { title: "Today", value: 'today' },
        { title: "Last 7 days", value: 'last7Days' },
      ],
    };
  },
  computed: {
    ...mapGetters(['userDetails']),
    sideBar: {
      get() {
        return this.$store.getters.sideBar;
      },
      set(value) {
        this.$store.commit("setSideBarStatus", value);
      },
    },
  },
  watch: {
    filterType(value) {
      this.$store.commit('filterByDayType', value)
    }
  },
  methods: {
    setSideBarStatus() {
      this.$store.commit("setSideBarStatus", !this.sideBar);
    },
  },
};
</script>

<style scoped>
.btn-custom {
  min-width: 100px !important;
}
.filter-btn {
  max-width: 370px;
}
</style>