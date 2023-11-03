import Vue from 'vue'
import { createStore } from 'vuex'
// import { vuex } from 'vuex'
import {Socket}  from 'socket.io-client';


export default createStore({
  state: {
	chat:  {
		socket: null as Socket | null,
		test: "inside chat in store.. testingg",
	},
  },
  getters: {
	// getReady: state => state.ready,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
