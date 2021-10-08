import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chartsData: {

    }
  },
  mutations: {
    setChartData(store, payload) {
      console.log(payload.currency)
      store.chartsData[payload.currency] = [];
      payload.data.map(a => {
        store.chartsData[payload.currency].push([a.timestamp, Math.floor(a.rate)]);
      })
      console.log(payload.data, store.chartsData['BTC'])
    }
  },
  actions: {
    async getChartData({commit}, payload) {
      console.log(payload.fetchString)
      fetch(payload.fetchString)
      .then((response) => {
          return response.json();
      })
      .then((data) =>  {
        commit('setChartData', {data, currency: payload.currency})
      })
    }
  },
  getters: {
    chartsData: (state) => (cur) => {
      if (state.chartsData[cur]) {
        return state.chartsData[cur];
      }
      return [];
    },
  },
  modules: {
  }
})
