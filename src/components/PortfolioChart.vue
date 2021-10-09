<template>
    <apex-chart ref="portfolioChart" type="pie" class="chart" :options="chartOptions" :series="series">
    </apex-chart>
</template>

<script>
import { mapGetters } from 'vuex';
import ApexChart from 'vue-apexcharts';
export default {
    components: {
        ApexChart,
    },

    data() {
        return {
            window: {
                width: 0,
                height: 0
            },
            series: [1, 2, 3],
            chartOptions: {
                labels: ['BTC в $', 'ETH в $', 'USD'],
                chart: {
                    width: 380,
                    type: 'pie',
                    redrawOnWindowResize: false,
                    redrawOnParentResize: false

                },

                legend: {   
                    position: 'left',
                    fontSize: '28px',
                    markers: {
                        radius: 20,
                        width: 20,
                        height: 20
                    },
                    onItemClick: {
                        toggleDataSeries: true
                    },
                    onItemHover: {
                        highlightDataSeries: true
                    },
                },
                colors: ['#93C3EE', '#E5C6A0', '#669DB5'],
                fill: {
                    type: 'image',
                    opacity: 0.85,
                    image: {
                        src: ['bitcoin.jpg',
                        'https://st3.depositphotos.com/5128989/i/600/depositphotos_193548550-stock-illustration-pattern-crypto-currency-symbol-ethereum.jpg',
                        'https://st.depositphotos.com/1903923/1678/v/450/depositphotos_16785907-stock-illustration-seamless-dollars-background.jpg'],
                    width: 25,
                    imagedHeight: 25
                    },
                },
                stroke: {
                    width: 4
                },
                dataLabels: {
                    enabled: true,
                    style: {
                    colors: ['#111']
                    },
                    background: {
                    enabled: true,
                    foreColor: '#fff',
                    borderWidth: 0
                    }
                },
                responsive: [{
                    breakpoint: 480,

                    options: {
                        chart: {
                            width: 300
                        },
                        legend: {
                            position: 'top',
                            fontSize: '16px'

                        },
                    }
                }]
            },
        }
    },
    methods: {
        updateChart() {

            let series = [];
            for (let i = 0; i < this.portfolioAsArray.length; i++) {
                if (this.portfolioAsArray[i].currency === 'USD') {
                    series.push(this.portfolioAsArray[i].amount);
                } else {
                    let key = this.portfolioAsArray[i].currency.toLowerCase();
                    series.push(
                        Math.floor(this.portfolioAsArray[i].amount * (1 / this.convertionUSD[key]))
                    )
                    
                }
            }
                this.$refs.portfolioChart.updateSeries(series);
        }
    },
    computed: {
        ...mapGetters(['portfolioAsArray', 'convertionUSD', 'convertionUSDFetching']),
    },
    mounted () {
        if (!this.convertionUSDFetching) {
            this.updateChart();
        }

        setTimeout(() => {
            this.updateChart()
        }, 700)
    },
    watch: {
        portfolioAsArray() {
            this.updateChart();
        },
        convertionUSDFetching(newValue) {
            if (newValue === false) {
                this.updateChart();
            }
        },
    },

}
</script>

<style lang="scss" scoped>
    .chart {
        width: 60%;
        margin: 0 auto;
        min-width: 380px;
        max-width: 540px;;
    }

    @media (max-width: 500px) {
        .chart {
            width: 80%;
            min-width: auto;
        }
    }
</style>