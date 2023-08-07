import Vue from 'vue'
import Vuex from 'vuex'
import { saveToLocalStorage } from '../utils/localStorageHandler'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    sideBar: true,
    userLists: [
      { id: 1, userName: 'Jason Susanto' },
      { id: 2, userName: 'JJ Jinggg' },
      { id: 3, userName: 'Benkaii' },
      { id: 4, userName: 'Asterisk' },
      { id: 5, userName: 'Aleck' },
      { id: 6, userName: 'Tyson' }
    ],
    chatLists: [
      { id: 1, chat: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', createAt: '2023-07-01T11:11:40+05:30', user: { id: 1, userName: 'Jason Susanto' } },
      { id: 2, chat: 'Aliquam tincidunt mauris eu risus.', createAt: '2023-08-01T12:11:40+05:30', user: { id: 2, userName: 'JJ Jinggg' } },
      { id: 3, chat: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', createAt: '2023-08-01T21:11:40+05:30', user: { id: 4, userName: 'Asterisk' } },
      { id: 4, chat: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', createAt: '2023-08-02T14:11:40+05:30', user: { id: 1, userName: 'Jason Susanto' } },
      { id: 5, chat: 'Vestibulum auctor dapibus neque', createAt: '2023-08-02T14:17:40+05:30', user: { id: 5, userName: 'Aleck' } },
      { id: 6, chat: 'Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.', createAt: '2023-08-02T15:11:40+05:30', user: { id: 1, userName: 'Jason Susanto' } },
      { id: 7, chat: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', createAt: '2023-08-04T12:11:40+05:30', user: { id: 3, userName: 'Benkaii' } },
      { id: 8, chat: 'Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.', createAt: '2023-08-04T22:11:40+05:30', user: { id: 6, userName: 'Tyson' } },
      { id: 9, chat: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', createAt: '2023-08-04T23:11:40+05:30', user: { id: 1, userName: 'Jason Susanto' } },
      { id: 10, chat: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', createAt: '2023-08-05T16:11:40+05:30', user: { id: 3, userName: 'Benkaii' } },
      { id: 11, chat: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', createAt: '2023-08-05T17:11:40+05:30', user: { id: 1, userName: 'Jason Susanto' } },
      { id: 12, chat: 'Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.', createAt: '2023-08-05T18:11:40+05:30', user: { id: 1, userName: 'Jason Susanto' } },
      { id: 13, chat: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', createAt: '2023-08-06T09:11:40+05:30', user: { id: 3, userName: 'Benkaii' } },
      { id: 14, chat: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', createAt: '2023-08-06T10:11:40+05:30', user: { id: 1, userName: 'Jason Susanto' } },
      { id: 15, chat: 'Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.', createAt: '2023-08-07T21:11:40+05:30', user: { id: 6, userName: 'Tyson' } },
      { id: 16, chat: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', createAt: '2023-08-07T21:12:40+05:30', user: { id: 1, userName: 'Jason Susanto' } },
      { id: 17, chat: 'Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.', createAt: '2023-08-07T21:41:40+05:30', user: { id: 6, userName: 'Tyson' } },
    ],
    userColorList: [
      'primary', 'red', 'blue', 'green', 'orange', 'pink'
    ],
    userDetails: {},
    filterType: 'all'
  },
  getters: {
    sideBar: (state) => state.sideBar,
    userLists: (state) => state.userLists,
    userColorList: (state) => state.userColorList,
    isAuthenticated: (state) => state.isAuthenticated,
    userDetails: (state) => state.userDetails,
    chatLists: (state) => state.chatLists,
    filterType: (state) => state.filterType
  },
  mutations: {
    setSideBarStatus(state, payload) {
      state.sideBar = payload
    },
    setAuthenticated(state, payload) {
      state.isAuthenticated = payload;
      saveToLocalStorage('isAuthenticated', payload)
    },
    userDetails(state, payload) {
      state.userDetails = payload
      state.userLists.unshift(payload)
    },
    addChat(state, payload) {
      state.chatLists.push(payload)
    },
    filterByDayType(state, payload) {
      state.filterType = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
