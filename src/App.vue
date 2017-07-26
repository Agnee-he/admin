<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
    };
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  *
    margin 0;
    padding 0;
  body,html
    margin 0;
    width 100%;
    height 100%;
    position: relative;
 </style>
