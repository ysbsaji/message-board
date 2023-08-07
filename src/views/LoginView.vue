<template>
  <v-container fill-height>
    <v-row class="justify-center">
      <v-col cols="12" sm="6" md="5">
        <v-row class="justify-center my-10">
          <img src="../assets/images/logo.svg" alt="" />
        </v-row>
        <v-card class="elevation-3 pa-6" height="250">
          <v-card-title class="my-4">
            <v-row class="justify-center primary--text font-weight-bold">
              Log in
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row class="justify-center">
              <v-col cols="10">
                <div>User name</div>
                <v-text-field
                  dense
                  outlined
                  hide-details
                  v-model="userName"
                ></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-btn
                  depressed
                  :disabled="!userName"
                  color="primary"
                  style="width: 100%"
                  @click="login"
                >
                  Log in
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { saveToLocalStorage } from "../utils/localStorageHandler";
export default {
  data() {
    return {
      userName: "",
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "userLists"]),
  },
  methods: {
    login() {
      this.$store.commit("userDetails", {
        id: this.userLists[this.userLists.length - 1].id++,
        userName: this.userName,
      });
      saveToLocalStorage("userDetails", {
        id: this.userLists[this.userLists.length - 1].id++,
        userName: this.userName,
      });
      this.$store.commit("setAuthenticated", true);
      this.$router.push("/message_board");
      window.location.reload()
    },
  },
  mounted() {
    this.isAuthenticated && this.$router.push("/message_board");
  },
};
</script>
