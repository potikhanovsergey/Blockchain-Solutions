<template>
    <v-card class="px-5">
        <v-card-title>
            <h2>Конвертер валют</h2>
        </v-card-title>
        <v-skeleton-loader v-if="convertionUSDFetching"></v-skeleton-loader>
        <div v-else>
            <v-card-actions class="flex-column flex-sm-row">
                <v-select
                :items="['USD', 'BTC', 'ETH']"
                v-model="leftCurrency"
                label="У меня есть"
                ></v-select>
                <v-spacer></v-spacer>
                <v-btn
                class="swap-btn"
                icon
                 @click="swap">
                    <v-icon>mdi-swap-horizontal</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-select
                :items="['USD', 'BTC', 'ETH']"
                label="Хочу приобрести"
                v-model="rightCurrency"
                ></v-select>

            </v-card-actions>
            <v-card-actions>
                <v-text-field 
                    :rules="convertionRules"
                    type="number"
                    v-model="leftValue"
                    filled
                    :label="leftCurrency">
                </v-text-field>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-text-field 
                    readonly
                    :rules="convertionRules"
                    type="number"
                    v-model="right.value"
                    filled
                    :label="rightCurrency">
                </v-text-field>    
            </v-card-actions>
        </div>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            convertionRules: [
                v => v >= 0 || 'Количество не должно быть отрицательным'
            ],
            left: {
                currency: 'BTC',
                value: 1
            },
            right: {
                currency: 'USD',
                value: 50,
            }
        }
    },
    mounted () {
        this.calculate(this.leftCurrency, this.leftValue, this.right.currency)
    },
    methods: {
        swap() {
            const leftObj = {
                currency: this.left.currency,
                value: this.left.value,
            }

            this.left.currency = this.right.currency;
            this.right.currency = leftObj.currency;
            this.calculate(this.leftCurrency, this.leftValue, this.right.currency)
        },
        calculate(cL, vL, cR) {
            let currency = cL.toLowerCase();
            let leftValue = (vL * (1 / this.convertionUSD[currency]));

            let currencyRight = cR.toLowerCase();
            this.right.value = (leftValue * this.convertionUSD[currencyRight]).toFixed(6);
            this.right.value = (leftValue * this.convertionUSD[currencyRight]).toFixed(6);
            
        }
    },
    computed: {
        ...mapGetters(['convertionUSD', 'convertionUSDFetching']),
        leftValue: {
            get() {
                return this.left.value;
            },
            set(val) {
                console.log(this.leftValue, this.right.value, this.leftCurrency)
                this.calculate(this.leftCurrency, val, this.right.currency);
                this.left.value = val;
            }
        },
        leftCurrency: {
            get() {
                return this.left.currency;
            },
            set(val) {
                this.calculate(val, this.leftValue, this.rightCurrency);
                this.left.currency = val;
            }
        },
        rightCurrency: {
            get() {
                return this.right.currency;
            },
            set(val) {
                this.calculate(this.leftCurrency, this.leftValue, val);
                this.right.currency = val;
            }
        }
    },
    watch: {
        convertionUSD(newValue) {
            if (Object.keys(newValue).length) {
                this.calculate(this.leftCurrency, this.leftValue, this.right.currency)
                console.log('USD-ETH ' + this.convertionUSD.eth,
                        'ETH-USD ' + (1 / (this.convertionUSD.eth)),
                        'USD-BTC ' + this.convertionUSD.btc,
                        'BTC-USD ' + (1 / (this.convertionUSD.btc)),
                        'BTC-ETH ' + (this.convertionUSD.eth / this.convertionUSD.btc),
                        'ETH-BTC ' + (this.convertionUSD.btc / this.convertionUSD.eth) );
                }
        },



    },
}
</script>

<style lang="scss">
    @media (max-width: 600px) {
        .swap-btn {
            transform: rotate(90deg);
        }
    }
</style>