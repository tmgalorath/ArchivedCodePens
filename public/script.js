var app = new Vue({
  el: '#app',
  data: {
    items: [],
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data
        for (i = 0; i < this.items.length; i++) {
            var first = "https://codepen.io/giaco/embed/"
            var half = "?height=765&amp;theme-id=0&amp;default-tab=js%2Cresult&amp;user=giaco&amp;slug-hash=apwMwM&amp;pen-title=Click%20and%20draw%20some%20flowers&amp;name=cp_embed_2"
            this.items[i].url = first + this.items[i].id + half
            console.log(this.items[i].url)
        }

        // for each(var item in response.data) {

        // }

        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
});
