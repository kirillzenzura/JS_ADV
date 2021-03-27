Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<div class="products">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="item.img"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
            <div class="product-item featured__item">
                <img class="featured__img" :src="img" alt="Some img">
                <div class="desc">
                    <h3 class="featured__header" >{{product.product_name}}</h3>
                    <p class="featured__text">Known for her sculptural takes on traditional tailoring, Australian
                        arbiter
                        of cool Kym Ellery
                        teams up with Moda Operandi.</p>
                    <p class="featured__price" >$ {{product.price}}</p>
                    <div class="featured__overlay"><button class="buy-btn featured__overlay-btn" @click="$emit('add-product', product)" ><img src="./img/basket.svg"
                                alt="basket" width="32" height="32"> Add to Cart</button></div>
                </div>
            </div>
    `
})