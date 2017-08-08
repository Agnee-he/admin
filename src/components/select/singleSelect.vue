<template>
  <div class="functional-select-wrapper" v-on:click.stop="singleFocus()">
  <label class="display-container clearfix" v-bind:class="(show)?\'single-selected-focus\':\'\'">
    <p v-show="selected.id == \'\' ">
      <span v-if="originOptions.length != 0 ">请选择</span>
      <span v-else>没有选项</span>
      </p>
    <p class="single-selected">{{ selected.name }}</p>
    <i class="drop" v-bind:class="(show)?\'drop-up\':\'\'">▼</i>
    </label>
  <div class="options-container" v-show="show">
    <div class="search-container">
      <input placeholder="search here" class="search-input" v-model="search" v-on:keyup="singleSearch()" v-on:click.stop />
      </div>
    <ul class="options-ul-list">
      <li v-show="displayOptions.length == 0">没有查询到数据</li>
      <li v-for="item in displayOptions" v-on:click.stop.prevent="singleSelect(item.id)" v-bind:class=" (item.id == selected.id)?\'selected\':\'\' ">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['optionsdata', 'selecteddata'],
    data() {
      return {
        originOptions: [],
        displayOptions: [],
        show: false,
        search: '',
        selected: {
          id: '',
          name: ''
        }
      };
    },
    ready: function () {
      window.addEventListener('click', this.blur);
      //  console.log(JSON.stringify(this.data))
    },
    watch: {
      optionsdata: function (val, oldVal) {
        // console.log('option old: ' + JSON.stringify(oldVal))
        // console.log('option new: ' + JSON.stringify(val))
        this.originOptions = val;
        this.show = false;
        // 默认值
        if (this.selected.id === '') {
          this.selected = this.originOptions[0];
        }
      },
      selecteddata: function(val, oldVal) {
        // console.log('selected old: ' + JSON.stringify(oldVal))
        // console.log('selectednew: ' + JSON.stringify(val))
        this.selected = val;
      }

    },
    // events: {
    // 	// ajax获取originOptions后 初始化
    // 	initSingle: function(originOptions,selected){
    //            // console.log(JSON.stringify(originOptions))
    //            // console.log(JSON.stringify(selected))
    // 		this.originOptions = originOptions;
    //            // 设置默认值为originlist的第一个
    //            if (selected){
    //                this.selected = selected

    //            }
    //            else{
    //                this.selected = originOptions[0]
    //            }

    //            //空判断
    //            if (this.selected){
    //                this.singleSelect(this.selected.id);
    //            }
    // 	}
    // },
    methods: {
      singleFocus: function () {
        if (!this.show) {
          document.body.click();
          console.log('single show');
          this.show = true;
          this.singleSearch();
          this.searchInputFocus();
        } else {
          this.blur();
        }
      },
      searchInputFocus: function () {
        let searchInput = this.$el.getElementsByClassName('search-input')[0];
        this.$nextTick(function () {
          searchInput.focus();
        });
      },
      singleSelect: function(id) {
        let mySelf = this;
        // var originOptions = mySelf.single.originOptions;
        let displayOptions = mySelf.displayOptions;
        for (let i = 0; i < displayOptions.length; i++) {
          let item = displayOptions[i];
          //  在展示数组里找 找到后1.添加到selected
          if (item.id === id) {
            let selected = mySelf.selected;
            selected.id = item.id;
            selected.name = item.name;
          }
        }
        mySelf.show = false;
        this.search = '';
        //  传递给父级组件
        // console.log('派发！！')
        this.$dispatch('selected', this.selected);
        // console.log('选中的是' + JSON.stringify(this.selected))
      },
      singleSearch: function () {
        let mySelf = this;
        let search = mySelf.search;
        let REG_RULE = new RegExp(search, 'i'); //  根据用户输入值做正则
        let originOptions = mySelf.originOptions;
        //  将展示列表置空 然后用正则去原始列表中匹配
        mySelf.displayOptions = [];

        //  console.log('搜索的内容是' + search)
        for (let i = 0; i < originOptions.length; i++) {
          let item = originOptions[i];
          // console.log('当前校验的是' + item.name)
          // console.log('校验的结果是' + REG_RULE.test(item.name))
          if (REG_RULE.test(item.name)) {
            mySelf.displayOptions.push(item);
          }
        }
      },
      blur: function () {
        console.log('hide single！！');
        this.show = false;
        this.search = '';
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
