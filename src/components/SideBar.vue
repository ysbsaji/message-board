<template>
  <div>
    <v-navigation-drawer app width="320" v-model="sideBar" :mobile-breakpoint="770">
      <v-card class="mx-auto pa-6" flat tile>
        <v-card-title class="text-h4 font-weight-bold">Chats</v-card-title>
        <v-card-title class="my-0">Users</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="(item, index) in userLists" :key="index" class="mx-0">
              <v-list-item-icon>
                <v-avatar color="white--text" :class="getColor()" size="40">
                  <span class="white--text text-h5">{{ item.userName.charAt(0) }}</span>
                </v-avatar>
              </v-list-item-icon>

              <v-list-item-content class="mx-0 px-0">
                <v-list-item-title class="mt-3 font-weight-bold">{{ item.userName }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn depressed class="white primary--text text-start" @click="logout"> <v-icon class="mx-2">mdi-logout</v-icon>Log out </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { removeFromLocalStorage } from '../utils/localStorageHandler'
export default {
  data() {
    return {
      //
    };
  },
  computed:{
    ...mapGetters(['userLists', 'userColorList']),
    sideBar: {
      get() {
        return this.$store.getters.sideBar;
      },
      set(value) {
        this.$store.commit("setSideBarStatus", value);
      }
    }
  },
  methods: {
    getColor() {
      const color = this.userColorList[(Math.floor(Math.random() * this.userColorList.length))]
      return color
    },
    logout() {
      removeFromLocalStorage('isAuthenticated');
      removeFromLocalStorage('userDetails');
      removeFromLocalStorage('userChats');
      this.$router.go(0)
    }
  }
};
</script>

<style scoped>
.v-list-item {
  max-height: 56px !important;
}
.v-card__subtitle, .v-card__text {
  margin-left: -21px !important;
}
</style>