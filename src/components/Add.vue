<template>
  <div>
    <form role="form">
      <div class="form-group">
        <label for="bookname" class="control-label">书名</label>
        <input type="text" id="bookname" class="form-control"
               autocomplete="off" placeholder="书名" v-model="book.bookName">
      </div>

      <div class="form-group">
        <label for="bookPrice" class="control-label">价格</label>
        <input type="text" id="bookPrice" class="form-control"
               autocomplete="off" placeholder="价格" v-model="book.bookPrice">
      </div>

      <div class="form-group">
        <label for="bookCover" class="control-label">封面</label>
        <input type="text" id="bookCover" class="form-control"
               placeholder="封面" autocomplete="off" v-model="book.bookCover">
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-primary" @click="add">添加图书</button>
      </div>
    </form>
  </div>
</template>
<style scoped>

</style>

<script>
  export default {
    data() {
      return {
        book: {
          bookName: '',
          bookPrice: '',
          bookCover: ''
        }
      }
    },
    components: {},
    methods: {
      add() {
        console.info('add');
        this.$http.post('/book', this.book).then(() => {
          this.$router.push('/list');
        });
      }
    }
  }
</script>
