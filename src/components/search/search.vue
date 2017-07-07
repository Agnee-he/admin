<template>
  <div class="search">
    <el-input class="input" placeholder="" v-model="search">
      <el-button class="btn" slot="append" icon="search"></el-button>
    </el-input>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        search: ''
      };
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .search
    position relative;
    z-index 999;
    width 180px;
    height 100%;
    float left;
    padding-left 10%;
    .input
      background-color #1c8de0;
      border-radius 5px;
      transition: all 0.5s;
      width 75%;
      &:hover
        transition: all 0.5s;
        width 180%;
      .btn
        background-color #243441;
</style>
