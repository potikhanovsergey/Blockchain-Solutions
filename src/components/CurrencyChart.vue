<template>
        <trend-chart ref="currencyChart" type="area" height="350" :options="chartOptions" :series="series"></trend-chart>
</template>

<script>
import TrendChart from "vue-apexcharts";
import { mapActions, mapGetters } from 'vuex';

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
                name: "STOCK ABC",
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
        
        // let twoWeeksAgo = (twoWeeksTime.getFullYear()) + '-' +
        //             ((twoWeeksTime.getMonth()+1) < 10 ? "0"+(twoWeeksTime.getMonth()+1): (twoWeeksTime.getMonth()+1)) + '-' +
        //             (twoWeeksTime.getDate() < 10 ? "0"+(twoWeeksTime.getDate()): (twoWeeksTime.getDate())) + 'T00%3A00%3A00Z';
        
        // let timeNow = new Date();
        // let nowFormatted = (timeNow.getFullYear()) + '-' +
        //             ((timeNow.getMonth()+1) < 10 ? "0"+(timeNow.getMonth()+1): (timeNow.getMonth()+1)) + '-' +
        //             (timeNow.getDate() < 10 ? "0"+(timeNow.getDate()): (timeNow.getDate())) + 'T00%3A00%3A00Z';
        
            let now = new Date();
            this.now = (now.getFullYear()) + '-' +
                        ((now.getMonth()+1) < 10 ? "0"+ (now.getMonth()+1): (now.getMonth()+1)) + '-' +
                        (now.getDate() < 10 ? "0"+(now.getDate()): (now.getDate())) + 'T00%3A00%3A00Z';

        // this.fetchStr = `https://api.nomics.com/v1/exchange-rates/history?key=b80e96c0a178a1c8569facd9f5bac1840eab8ec2&currency=${this.convertCurrency}&start=${twoWeeksAgo}&end=${nowFormatted}`;
        
        // let response = await fetch(fetchString)
        // let data = await response.json();
        // let response = await fetch(fetchString)
        // let data = await response.json();
        // await console.log(data);
        // this.labels = await data.map(a => {
        //     this.series[0].data.push([a.timestamp, Math.floor(a.rate)]);
        // })
        // console.log(this.series[0].data)      

        setTimeout(this.updateChart, 3000)

        // fetch(fetchString)
        // .then((response) => {
        //     return response.json();
        // })
        // .then((data) =>  {
        //     this.labels = data.map(a => {
        //         this.series[0].data.push([a.timestamp, Math.floor(a.rate)]);
        //     })
        // })
        // .then(() => {
        //     this.$emit('fetched');
        // })
    },
    watch: {
        convert(newV) {
            this.convertCurrency = newV;
            this.getChartData({fetchString: this.fetchStr, currency: this.convertCurrency})
            setTimeout(this.updateChart(), 2000);
        }
    },
    methods: {
        ...mapActions(['getChartData']),
        updateChart() {
            this.$refs.currencyChart.updateSeries([{
                data: this.$store.getters.chartsData(this.convertCurrency)
            }])
            console.log('updated', this.$store.getters.chartsData('BTC'), this.$store.state.chartsData)
        }
        // chartData() {
        //     if (this.$store.state.chartsData.length) {
        //         return this.$store.state.chartsData[this.convertCurrency];
        //     }
        //     return []
        // }
    },
    computed: {
        ...mapGetters(['chartsData']),
        fetchStr() {
            return `https://api.nomics.com/v1/exchange-rates/history?key=b80e96c0a178a1c8569facd9f5bac1840eab8ec2&currency=${this.convertCurrency}&start=${this.twoWeeksAgo}&end=${this.now}`;
        }
    },
}
</script>

<style lang="scss" scoped>
    
</style>