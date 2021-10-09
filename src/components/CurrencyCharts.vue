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
            <v-skeleton-loader v-show="dataFetching"
            class="mx-auto"
            width="100%"
            type="card"
            ></v-skeleton-loader>

            <currency-chart 
            v-show="!dataFetching"
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
                title: 'BihanceCoin-USD',
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
        ...mapGetters(['dataFetching']),
    },
    // mounted() {
    //     let that = this;
    //     window.onresize = function() {
    //         that.size = window.innerWidth
    //     }
    // }
    // async created () {
    //     let response = await fetch("https://api.nomics.com/v1/exchange-rates/history?key=b80e96c0a178a1c8569facd9f5bac1840eab8ec2&currency=BTC&convert=EUR&start=2021-09-22T00%3A00%3A00Z&end=2021-10-6T00%3A00%3A00Z")
    //     let data = await response.json();
    //     await console.log(data);
    // },
  }
</script>

<style lang="scss" scoped>

</style>