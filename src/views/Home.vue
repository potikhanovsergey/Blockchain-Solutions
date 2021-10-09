<template>
<v-container mt-12 pb-10>
  <v-row>
    <v-col>
      <currency-charts></currency-charts>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <currency-converter></currency-converter>
    </v-col>
  </v-row>
</v-container>

</template>

<script>
import CurrencyCharts from '../components/CurrencyCharts.vue';
import CurrencyConverter from '../components/CurrencyConverter.vue';

  export default {
  components: { CurrencyConverter, CurrencyCharts },
    name: 'Home',

  }

    CurrencyCharts</script>
