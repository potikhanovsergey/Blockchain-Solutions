<template>
  <v-container mt-12>
    <currency-wallet></currency-wallet>
    <v-row>
      <v-col class="justify-center">
        <v-card>
          <v-card-title class="display-1 justify-center mb-5">Диаграмма</v-card-title>
          <v-card-text class="justify-center display-1 text-center mb-5">Текущая оценка портфеля в долларах: <strong>${{ usdNetworth }}</strong></v-card-text>
          <portfolio-chart class="chart"></portfolio-chart>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CurrencyWallet from '../components/CurrencyWallet.vue'
import PortfolioChart from '../components/PortfolioChart.vue'



import { mapGetters } from 'vuex';
export default {
  components: { CurrencyWallet, PortfolioChart},
  computed: {
    ...mapGetters(['usdNetworth'])
  },

}
</script>

<style lang="scss" scoped>
  .chart {
    display: flex;
    justify-content: center;
  }
</style>
