<template>
        <trend-chart ref="currencyChart" type="area" height="350" :options="chartOptions" :series="series"></trend-chart>
</template>

<script>
import TrendChart from "vue-apexcharts";
import { mapGetters } from 'vuex';

export default {
    components: {
        TrendChart,
    },
    props: {
        convert: {
            type: String,
        },
    },
    data() {
        return {
        convertCurrency: this.convert,
        series: 
            [{
                name: "В долларах",
                data: []
            }],
        chartOptions: {
            chart: {
            type: 'area',
            zoom: {
                enabled: false
            }
            },
            dataLabels: {
            enabled: false
            },
            stroke: {
            curve: 'straight'
            },
            
            title: {
            text: 'Blockchain solutions Charts',
            align: 'left'
            },
            subtitle: {
            text: 'Текующие котировки',
            align: 'left'
            },
            labels: ['0', '0', '0', '0', '0', '0'],
            xaxis: {
            type: 'datetime',
            },
            yaxis: {
            opposite: true
            },
            legend: {
            horizontalAlign: 'left'
            }
        },
        twoWeeksAgo: null,
        now: null
        }
    },
    async created () {   
        let twoWeeks = 1000 * 60 * 60 * 24 * 14;
        let twoWeeksTime = new Date(new Date().getTime() - twoWeeks);
        this.twoWeeksAgo = (twoWeeksTime.getFullYear()) + '-' +
                    ((twoWeeksTime.getMonth()+1) < 10 ? "0"+(twoWeeksTime.getMonth()+1): (twoWeeksTime.getMonth()+1)) + '-' +
                    (twoWeeksTime.getDate() < 10 ? "0"+(twoWeeksTime.getDate()): (twoWeeksTime.getDate())) + 'T00%3A00%3A00Z';
        
            let now = new Date();
            this.now = (now.getFullYear()) + '-' +
                        ((now.getMonth()+1) < 10 ? "0"+ (now.getMonth()+1): (now.getMonth()+1)) + '-' +
                        (now.getDate() < 10 ? "0"+(now.getDate()): (now.getDate())) + 'T00%3A00%3A00Z';
    },
    watch: {
        convert(newV) {
            this.convertCurrency = newV;
            this.updateChart()
        },
        chartsDataFetching(newValue) {
            if (newValue === false) {
                this.updateChart()
            }
        }
    },
    methods: {
        updateChart() {

            this.$refs.currencyChart.updateSeries([{
                data: this.$store.getters.chartsDataGetter(this.convertCurrency)
            }])


        }
    },
    computed: {
        ...mapGetters(['chartsDataFetching', 'chartsDataGetter']),
        fetchStr() {
            return `https://api.nomics.com/v1/exchange-rates/history?key=b80e96c0a178a1c8569facd9f5bac1840eab8ec2&currency=${this.convertCurrency}&start=${this.twoWeeksAgo}&end=${this.now}`;
        }
    },
    mounted () {
        if (!this.dataFetching) {
            this.updateChart();
        }

        if (!this.chartsDataFetching) {
            this.updateChart();
        }
    },
}
</script>

<style lang="scss" scoped>
    
</style>