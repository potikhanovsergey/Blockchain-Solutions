   <template>
    <v-card>
        <v-card-title class="text-center">
            <h2 class="text-sm-center">График изменения курса за последние 14 дней</h2>
        </v-card-title>
            <v-tabs
            vertical
            class="flex-column flex-sm-row"
            background-color="transparent"
            color="basil"
            grow
            >
                <v-tab
                    @click="changeChartCurrency(item.convert)"
                    v-for="item in items"
                    :key="item.convert"
                >
                    {{ item.title }}
                </v-tab>
        </v-tabs>
        <v-sheet color="transparent">
            <v-skeleton-loader v-show="chartsDataFetching"
            class="mx-auto"
            width="100%"
            type="card"
            ></v-skeleton-loader>

            <currency-chart 
            v-show="!chartsDataFetching"
            @fetched="exchangeDataFetching = false"
             :convert="convert"></currency-chart>

        </v-sheet>
    </v-card>
</template>
<script>
import { mapGetters } from 'vuex';
import CurrencyChart from './CurrencyChart.vue';
  export default {
    components: {
        CurrencyChart
    },
    data: () => ({
        size: window.innerWidth,
        items: [
            {
                title: 'BTC-USD',
                convert: 'BTC',
            },
            {
                title: 'ETH-USD',
                convert: 'ETH',
            },
            {
                title: 'BinanceCoin-USD',
                convert: 'BNB',
            },
        ],
        convert: 'BTC',
    }),
    methods: {
        changeChartCurrency(c) {
            this.convert = c;
        }
    },
    computed: {
        ...mapGetters(['dataFetching', 'chartsDataFetching']),
    },
  }
</script>

<style lang="scss" scoped>

</style>