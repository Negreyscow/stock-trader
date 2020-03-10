export const orderStocksMixin = {
    data() {
        return {
            order: "Ascending",
            selected: ""
        };
    },

    props: {
        isStocks: {
            type: Boolean,
            required: true,
            default: false
        }
    },

    created(){
        this.$emit('updateStocks', this.stocks)
    },

    watch: {
        selected() {
            this.updateItems()
        }
    },
    
    computed: {
        stocks() {
            if (this.isStocks)
                return this.$store.getters.stocks
            return this.$store.getters.stockPortfolio;
        }
    },

    methods: {

        ordering(){
            if (this.order == 'Ascending')
                this.order = 'Descending'
            else 
                this.order = 'Ascending'
            this.updateItems()
        },

        updateItems() {
            if (this.selected == "") {
                alert("You need to choose an order method!");
            } else {
                if (this.selected == "Price") {
                    this.orderPrice();
                } else {
                    this.orderName();
                }
            }
            this.$emit('updateStocks', this.stocks)
        },

        orderPrice() {
            if (this.order == "Ascending") {
                this.orderByPriceAsc();
            } else {
                this.orderByPriceDes();
            }
        },

        orderName() {
            if (this.order == "Ascending") {
                this.orderByNameAsc();
            } else {
                this.orderByNameDes();
            }
        },

        orderByPriceDes() {
            this.stocks.sort(function (a, b) {
                return b.price - a.price;
            });
        },

        orderByPriceAsc() {
            this.stocks.sort(function (a, b) {
                return a.price - b.price;
            });
        },

        orderByNameAsc() {
            this.stocks.sort(function (a, b) {
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });
        },

        orderByNameDes() {
            this.stocks.sort(function (a, b) {
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();
                return x > y ? -1 : x < y ? 1 : 0;
            });
        }

    }
}


