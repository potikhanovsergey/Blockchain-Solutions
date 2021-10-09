import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chartsData2: {
      BTC: [],
      ETH: [],
      BNB: []
    },
    chartsDataFetching: true,
    chartsData: {

    },
    dataFetching: true,
    convertionUSDFetching: true,
    portfolio: {
      BTC: {
        amount: 3,
        icon: 'bitcoin'
      },
      ETH: {
        amount: 50,
        icon: 'ethereum'
      },
      USD: {
        amount: 100010,
        icon: 'currency-usd'
      }
    },
    convertionRates: {

    },
    convertionUSD: {

    }
  },
  mutations: {
    setChartData(store, payload) {
      store.chartsData[payload.currency] = [];
      payload.data.map(a => {
        store.chartsData[payload.currency].push([a.timestamp, Math.floor(a.rate)]);
      })
    },
    dataFetched(store) {
      store.dataFetching = false;
    },
    convertionUSDFetched(store) {
      store.convertionUSDFetching = false;
    },
    subtractAmount(store, payload) {
      store.portfolio[payload].amount -= 1;
    } ,
    addAmount(store, payload) {
      store.portfolio[payload].amount += 1;
    },
    setAmount(store, {key, amount}) {
      store.portfolio[key].amount = amount;
    },
    addConvertionRates(store, data) {
      for (let [k, v] of Object.entries(data)) {
        store.convertionRates[k] = v; 
      }
    },
    addConvertionUSD(store, data) {
      store.convertionUSD = data;
    },
    pushData(store, {data, c}) {
      let firstKey = Object.keys(data)[0];
      let secondKey = Object.keys(data)[1];


      data[firstKey] = data[firstKey] + 'T00:00:00Z';
      let arr = [];
      arr.push(data[firstKey]);
      arr.push(data[secondKey]);

      store.chartsData2[c.toUpperCase()].push(arr);
      store.chartsDataFetching = false;

    },
  },
  actions: {
    async getConvertionUSD({commit}) {
      fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json')
      .then((response) => response.json())
      .then((data) => {
        commit('addConvertionUSD', data.usd);
        commit('convertionUSDFetched')
      });
    },
    async getChartData({commit}, payload) {
      console.log(payload.fetchString)
      fetch(payload.fetchString)
      .then((response) => {
          return response.json();
      })
      .then((data) =>  {
        commit('setChartData', {data, currency: payload.currency})
      })
    },
    getAllCharts2({commit}) {
      let twoWeeks = 1000 * 60 * 60 * 24 * 15;
      let twoWeeksTime = new Date().getTime() - twoWeeks;
      let currencies = ['btc', 'eth', 'bnb'];
      for (let j = 0; j < currencies.length; j++) {
        for (let i = 0; i < 14; i++) {

          let date = new Date(twoWeeksTime + (1000 * 60 * 60 * 24 * (i + 1)));
          let dateFormatted = (date.getFullYear()) + '-' +
            ((date.getMonth()+1) < 10 ? "0"+ (date.getMonth()+1): (date.getMonth()+1)) + '-' +
            (date.getDate() < 10 ? "0"+(date.getDate()): (date.getDate()));
          console.log(i, dateFormatted)

          fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${dateFormatted}/currencies/${currencies[j]}/usd.json`)
          .then((response) => response.json())
          .then((data) => commit('pushData', {data, c: currencies[j]}))
        }
      }
    },
    getAllCharts({commit}) {
      let twoWeeks = 1000 * 60 * 60 * 24 * 14;
      let twoWeeksTime = new Date(new Date().getTime() - twoWeeks);
      let twoWeeksAgo = (twoWeeksTime.getFullYear()) + '-' +
      ((twoWeeksTime.getMonth()+1) < 10 ? "0"+(twoWeeksTime.getMonth()+1): (twoWeeksTime.getMonth()+1)) + '-' +
      (twoWeeksTime.getDate() < 10 ? "0"+(twoWeeksTime.getDate()): (twoWeeksTime.getDate())) + 'T00%3A00%3A00Z';

      let now = new Date();
      let nowFormatted = (now.getFullYear()) + '-' +
      ((now.getMonth()+1) < 10 ? "0"+ (now.getMonth()+1): (now.getMonth()+1)) + '-' +
      (now.getDate() < 10 ? "0"+(now.getDate()): (now.getDate())) + 'T00%3A00%3A00Z';

      let currencies = ['BTC', 'ETH', 'BNB'];
      for (let i = 0; i < currencies.length; i++) {

        let fetchString = `https://api.nomics.com/v1/exchange-rates/history?key=b80e96c0a178a1c8569facd9f5bac1840eab8ec2&currency=${currencies[i]}&start=${twoWeeksAgo}&end=${nowFormatted}`

        setTimeout(() => {
          fetch(fetchString)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            commit('setChartData', {data, currency: currencies[i]});
          })
          .then(() => {
            commit('dataFetched');
          })
        }, 1500 * (i + 1))

      }

    },
    subtractAmount({commit}, payload) {
      commit('subtractAmount', payload)
    },
    addAmount({commit}, payload) {
      commit('addAmount', payload);
    },
    setAmount({commit}, payload) {
      console.log(payload);
      commit('setAmount', payload)
    }

  },
  getters: {
    usdNetworth: (_, getters) => {
      let sum = 0;
      getters.portfolioAsArray.map(a => {
        let key = a.currency.toLowerCase();
        sum += Math.floor(a.amount * (1 / getters.convertionUSD[key]));
      })

      return sum;
    },
    chartsData: (state) => (cur) => {
      if (state.chartsData[cur]) {
        return state.chartsData[cur];
      }
      return [];
    },
    chartsDataGetter: (state) => (cur) => {
      if (state.chartsData2[cur]) {
        return state.chartsData2[cur];
      }
    },
    dataFetching: (state) => {
      return state.dataFetching;
    },
    convertionUSDFetching: (state) => {
      return state.convertionUSDFetching;
    },
    portfolio: (state) => {
      return state.portfolio;
    },
    portfolioAsArray: (state) => {
      let arr = [];
      for (let k in state.portfolio) {
        let obj = {
          currency: k,
          amount: state.portfolio[k].amount,
          icon: state.portfolio[k].icon,
        }
        arr.push(obj);
      }
      return arr;
    },
    convertionRates: (state) => {
      return state.convertionRates;
    },
    convertionUSD: (state) => {
      return state.convertionUSD;
    },
    chartsData2: (state) => {
      return state.chartsData2;
    },
    chartsDataFetching: (state) => {
      return state.chartsDataFetching;
    }
  },
  modules: {
  }
})
