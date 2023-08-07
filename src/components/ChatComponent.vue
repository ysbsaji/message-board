<template>
  <div>
    <div class="chats-class">
      <v-col
        v-for="(item, index) of showChatList"
        :key="index"
        class="my-0 py-0"
        :class="
          userDetails.userName == item.user.userName ? 'text-end' : 'text-start'
        "
      >
        <div
          :class="
            userDetails.userName == item.user.userName
              ? 'white--text pa-2 my-1 fit-to-content primary'
              : 'white pa-2 fit-to-content'
          "
        >
          {{ item.chat }}
        </div>
        <div
          class="grey--text mx-2 my-2"
          v-if="userDetails.userName !== item.user.userName"
        >
          {{ item.user.userName }} - {{ getTimeByDate(item.createAt) }}
        </div>
        <div v-else class="grey--text mx-2 my-2">
          {{
            userDetails.userName !== showChatList[index + 1]?.user.userName
              ? getTimeByDate(item.createAt, index)
              : ""
          }}
        </div>
      </v-col>
      <v-col class="my-7">
        <div></div>
      </v-col>
    </div>
    <div class="chat-input-holder mt-10" :style="!$vuetify.breakpoint.mdAndUp ? 'width: 100%;': 'width: 80%;'">
      <v-textarea
        class="chat-input"
        placeholder="write a message ..."
        v-model="message"
      >
        <template #append>
          <div style="width: 80px; cursor: pointer;" @click="sendChat">
            <v-img
              style="margin: auto 0"
              max-height="50"
              max-width="38"
              src="../assets/images/send-icon.svg"
            />
          </div>
        </template>
      </v-textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import dayjs from "dayjs";
import {
  readFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorageHandler";
export default {
  data() {
    return {
      message: "",
      showChatList: [],
    };
  },
  computed: {
    ...mapGetters(["chatLists", "userDetails", "filterType"]),
  },
  watch: {
    filterType(value) {
      switch (value) {
        case "all":
          this.showChatList = this.chatLists;
          break;
        case "today":
          this.showChatList = this.chatLists.filter((value) => {
            if (
              dayjs(value.createAt).format("DD/MM/YYYY") ==
              dayjs().format("DD/MM/YYYY")
            )
              return value;
          });
          break;
        case "last7Days":
          /* eslint-disable */
          let last7Days = dayjs().subtract(7, "day");
          const today = dayjs();
          this.showChatList = this.chatLists.filter((value) => {
            const date = value.createAt;
            if (dayjs(date).isAfter(last7Days) && dayjs(date).isBefore(today))
              return value;
          });
          break;
      }
    },
  },
  mounted() {
    this.getChatLists();
  },
  methods: {
    getChatLists() {
      this.showChatList = this.chatLists;
      const userChats = readFromLocalStorage("userChats");
      if (userChats) {
        userChats.forEach((payload) => this.$store.commit("addChat", payload));
      }
    },
    sendChat() {
      if (this.message) {
        let ID = this.chatLists.length;
        const payload = {
          id: ID++,
          chat: this.message,
          createAt: dayjs().format(),
          user: this.userDetails,
        };
        const userChats = readFromLocalStorage("userChats");
        if (userChats) {
          userChats.push(payload);
          saveToLocalStorage("userChats", userChats);
        } else {
          saveToLocalStorage("userChats", [payload]);
        }
        this.$store.commit("addChat", payload);
        this.message = "";
      }
    },
    getTimeByDate(time) {
      return dayjs(time).format("h:mm A");
    },
  },
};
</script>

<style scoped>
.fit-to-content {
  display: inline-block;
  border-radius: 3px;
}
.float-right-msg {
  float: right;
}
.chat-input-holder {
  display: flex;
  position: fixed;
  bottom: 0px;
  margin-left: -12px !important;
}

.chat-input {
  resize: none;
  height: 80px;
  font-size: 14px;
  color: #111;
  flex: 1;
  border: none;
  background: #fff;
}

.chats-class {
  margin-bottom: 79px !important;
  margin-top: 46px !important;
}
</style>