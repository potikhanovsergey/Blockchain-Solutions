<template>
    <v-row class="justify-center">

      <v-col class="col-12 col-sm-8 col-md-6 col-lg-4" v-for="(item, key) in portfolio" :key="key">
        <v-card>
          <v-card-title>
                <v-icon class="mb-1 mr-1">mdi-{{ item.icon }}</v-icon>
              <span>{{ key }}</span>
        </v-card-title>
          <v-card-subtitle>Количество: {{ item.amount }}</v-card-subtitle>
          <v-card-actions class="ml-2">
                <v-btn
                    elevation="1"
                    icon
                    large
                    tile
                    class="mr-1"
                    @click="addAmount(key)"
                ><v-icon>mdi-plus</v-icon></v-btn>
                <v-btn
                    elevation="1"
                    icon
                    large
                    tile
                    @click="subtractAmount(key)"
                    :disabled="item.amount === 0"
                ><v-icon>mdi-minus</v-icon></v-btn>
          </v-card-actions>
          <v-card-actions class="ml-2">
              <v-text-field 
              :rules="setAmountRules"
              type="number"
              @keydown.enter="setAm(key)"
              :ref="'amount-' + key"
              label="Установить количество"></v-text-field>
              <v-btn 
              @click="setAm(key)"
              medium
              dark
              class="ml-3 mb-2"><v-icon>mdi-send</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>




    </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            setAmountRules: [
                v => v >= 0 || 'Количество не должно быть отрицательным'
            ]
        }
    },
    computed: {
        ...mapGetters(['portfolio']),
    },
    methods: {
        ...mapActions(['addAmount', 'subtractAmount', 'setAmount']),
        setAm(key) {
            const amount = parseInt(this.$refs['amount-' + key][0].internalValue);
            if (amount >= 0) {
                this.setAmount({key, amount})
            }
        }
    },

}
</script>


<style lang="scss" scoped>

</style>