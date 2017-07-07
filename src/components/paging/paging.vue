<template>
  <div class="block">
    <el-pagination
      :current-page.sync="currentPage1"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    props: {
      total: {
        type: Number
      }
    },
    data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      };
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
