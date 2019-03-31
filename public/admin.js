var app = new Vue({
  el: '#app',
  data: {
    id: "",
    currentURL: '',
    description: "",
    file: null,
    addItem: null,
    items: [],
    findTitle: "",
    findItem: null,
  },
  created() {
    this.getItems();
  },
  computed: {
    suggestions() {
      return this.items.filter(item => item.id.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    },
    addURL() {
      var first = "https://codepen.io/giaco/embed/"
      var half = "?height=765&amp;theme-id=0&amp;default-tab=js%2Cresult&amp;user=giaco&amp;slug-hash=apwMwM&amp;pen-title=Click%20and%20draw%20some%20flowers&amp;name=cp_embed_2"
      console.log("addUrl")
      console.log(first + this.addItem.id + half)
      return first + this.addItem.id + half

    },

    findItemURL() {
      var first = "https://codepen.io/giaco/embed/"
      var half = "?height=765&amp;theme-id=0&amp;default-tab=js%2Cresult&amp;user=giaco&amp;slug-hash=apwMwM&amp;pen-title=Click%20and%20draw%20some%20flowers&amp;name=cp_embed_2"
      console.log("addUrl")
      console.log(first + this.findItem.id + half)
      return first + this.findItem.id + half

    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async upload() {
      try {
        //const formData = new FormData();
        //formData.append('photo', this.file, this.file.name)
        console.log(this.description)
        //let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          id: this.id,
          description: this.description,
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        let response = axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        let response = await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          description: this.findItem.description,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
