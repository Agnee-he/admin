<template>
  <div class="train">
    <el-tabs class="tabs" type="border-card">
      <el-tab-pane label="课程管理">
        <magement></magement>
      </el-tab-pane>
      <el-tab-pane label="考核跟进">
        <follow></follow>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import magement from './magement/magement.vue';
  import follow from './follow/follow.vue';

    export default {
      data() {
        return {
          input: '' // 输入框内容
        };
      },
      components: {
        magement,
        follow
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  body
    margin 0;
    padding 0;
  .train
    margin-top -898px;
    margin-left 180px;
    padding-top 30px;
    width 1020px;
    height 868px;
    background #ecf0f1;
    .tabs
      margin-left 30px;
      margin-right 30px;
</style>
