<template>
  <div class="block">
    <el-pagination
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
      :page-size="1"
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
      },
      currentPage: {
        type: Number
      }
    },
    data() {
      return {
      };
    },
    methods: {
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        console.log(this.currentPage);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
