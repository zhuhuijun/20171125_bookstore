<template>
  <div>
    <div>
      <div class="panel panel-warning">
        <div class="panel-heading">
          书名: <span v-show="!flag">{{book.bookName}}</span>
          <input type="text" v-model="book.bookName" v-show="flag">
        </div>
        <div class="panel-body text-center">
          <img :src="book.bookCover">
        </div>
        <div class="panel-footer">
          价格:<span v-show="!flag">{{book.bookPrice | currency('￥')}}</span>
          <input type="text" v-model="book.bookPrice" v-show="flag">
          <button class="btn btn-danger btn-sm " @click="remove">删除
          </button>
          <button class="btn btn-warning btn-sm" v-show="!flag" @click="updateui">修改
          </button>
          <button class="btn btn-primary btn-sm " v-show="flag" @click="update">确认修改
          </button>

        </div>
      </div>
    </div>

  </div>
</template>
<style scoped>
  img {
    width: 150px;
    height: 200px;
  }
</style>

<script>

  export default {
    filters: {
      currency(input, param1) {
        return param1 + input;
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.$http.get("/book?id=" + this.id).then(res => {
        this.book = res.body;
      })
    },
    data() {
      return {
        book: {
          bookName: "",
          bookPrice: "",
          bookCover: ""
        },
        id: '',
        flag: false
      }
    },
    components: {},
    methods: {
      remove() {
        this.$http.delete('/book?id=' + this.id).then(() => {
          this.$router.push('/list');
        });
      },
      updateui() {
        this.flag = !this.flag;
      },
      update() {
        this.$http.put("/book?id=" + this.id, this.book).then(() => {
          this.updateui();
        });

      }
    }
  }
</script>
