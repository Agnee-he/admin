<template>
  <div class="index">
    <el-row>
      <div class="left">
        <div class="shop_performance">
          <div class="main">
            <div class="select">
              <div class="one" v-if="type === 'shop'">
                <span class="demonstration">默认 click 触发子菜单</span>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="two" v-if="type === 'straightcamp'">
                <span class="demonstration">默认 click 触发子菜单</span>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="three" v-if="type === 'group'">
                <div class="block">
                  <span class="demonstration">默认 click 触发子菜单</span>
                  <el-cascader
                    :options="options"
                    :show-all-levels="false"
                    v-model="selectedOptions">
                  </el-cascader>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
      data() {
          return {
            url: this.$store.state.url,
            value: '',
            value7: '',
            shopModels: [],  // 门店和门店id
            shopName: [],  // 门店名
            shopNum: [],  // 销售数量
            shopCount: [],  // 销售额
            type: '',
            options3: [
              {
              label: '热门城市',
              options: [{
                value: 'Shanghai',
                label: '上海'
              }, {
                value: 'Beijing',
                label: '北京'
              }]
            }, {
              label: '城市名',
              options: [{
                value: 'Chengdu',
                label: '成都'
              }, {
                value: 'Shenzhen',
                label: '深圳'
              }, {
                value: 'Guangzhou',
                label: '广州'
              }, {
                value: 'Dalian',
                label: '大连'
              }]
            }],
            options1: [
              {
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
            options: [
              {
              value: 'zhinan',
              label: '指南',
              children: [{
                value: 'shejiyuanze',
                label: '设计原则',
                children: [{
                  value: 'yizhi',
                  label: '一致'
                }, {
                  value: 'fankui',
                  label: '反馈'
                }, {
                  value: 'xiaolv',
                  label: '效率'
                }, {
                  value: 'kekong',
                  label: '可控'
                }]
              }, {
                value: 'daohang',
                label: '导航',
                children: [{
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                }, {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }]
              }]
            }, {
              value: 'zujian',
              label: '组件',
              children: [{
                value: 'basic',
                label: 'Basic',
                children: [{
                  value: 'layout',
                  label: 'Layout 布局'
                }, {
                  value: 'color',
                  label: 'Color 色彩'
                }, {
                  value: 'typography',
                  label: 'Typography 字体'
                }, {
                  value: 'icon',
                  label: 'Icon 图标'
                }, {
                  value: 'button',
                  label: 'Button 按钮'
                }]
              }, {
                value: 'form',
                label: 'Form',
                children: [{
                  value: 'radio',
                  label: 'Radio 单选框'
                }, {
                  value: 'checkbox',
                  label: 'Checkbox 多选框'
                }, {
                  value: 'input',
                  label: 'Input 输入框'
                }, {
                  value: 'input-number',
                  label: 'InputNumber 计数器'
                }, {
                  value: 'select',
                  label: 'Select 选择器'
                }, {
                  value: 'cascader',
                  label: 'Cascader 级联选择器'
                }, {
                  value: 'switch',
                  label: 'Switch 开关'
                }, {
                  value: 'slider',
                  label: 'Slider 滑块'
                }, {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器'
                }, {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器'
                }, {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器'
                }, {
                  value: 'upload',
                  label: 'Upload 上传'
                }, {
                  value: 'rate',
                  label: 'Rate 评分'
                }, {
                  value: 'form',
                  label: 'Form 表单'
                }]
              }, {
                value: 'data',
                label: 'Data',
                children: [{
                  value: 'table',
                  label: 'Table 表格'
                }, {
                  value: 'tag',
                  label: 'Tag 标签'
                }, {
                  value: 'progress',
                  label: 'Progress 进度条'
                }, {
                  value: 'tree',
                  label: 'Tree 树形控件'
                }, {
                  value: 'pagination',
                  label: 'Pagination 分页'
                }, {
                  value: 'badge',
                  label: 'Badge 标记'
                }]
              }, {
                value: 'notice',
                label: 'Notice',
                children: [{
                  value: 'alert',
                  label: 'Alert 警告'
                }, {
                  value: 'loading',
                  label: 'Loading 加载'
                }, {
                  value: 'message',
                  label: 'Message 消息提示'
                }, {
                  value: 'message-box',
                  label: 'MessageBox 弹框'
                }, {
                  value: 'notification',
                  label: 'Notification 通知'
                }]
              }, {
                value: 'navigation',
                label: 'Navigation',
                children: [{
                  value: 'menu',
                  label: 'NavMenu 导航菜单'
                }, {
                  value: 'tabs',
                  label: 'Tabs 标签页'
                }, {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑'
                }, {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单'
                }, {
                  value: 'steps',
                  label: 'Steps 步骤条'
                }]
              }, {
                value: 'others',
                label: 'Others',
                children: [{
                  value: 'dialog',
                  label: 'Dialog 对话框'
                }, {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示'
                }, {
                  value: 'popover',
                  label: 'Popover 弹出框'
                }, {
                  value: 'card',
                  label: 'Card 卡片'
                }, {
                  value: 'carousel',
                  label: 'Carousel 走马灯'
                }, {
                  value: 'collapse',
                  label: 'Collapse 折叠面板'
                }]
              }]
            }, {
              value: 'ziyuan',
              label: '资源',
              children: [{
                value: 'axure',
                label: 'Axure Components'
              }, {
                value: 'sketch',
                label: 'Sketch Templates'
              }, {
                value: 'jiaohu',
                label: '组件交互文档'
              }]
            }],
            selectedOptions: [],
            selectOptions: []
        };
      },
      created() {
        //  获取门店和门店id
        this.$http.jsonp(this.url + 'spg/admin/display/getShops', {jsonp: 'jsonpCallback'}).then(function (response) {
          // response.data 为服务端返回的数据
          this.shopModels = response.data.result.shopModels;
          console.log('获取获取门店和门店id成功');
        }).catch(function (response) {
          // 出错处理
          console.log(response);
        });
        // 获取销量
        this.$http.jsonp('http://192.168.199.143:8080/spg/admin/sales/fusion?username=ZXX000', {jsonp: 'jsonpCallback'}).then(function (response) {
          // response.data 为服务端返回的数据
          let returnData = response.data.result;
          this.type = returnData.type;
          console.log(returnData);
          if (returnData.type === 'straightcamp') {
            console.log('straightcamp');
            for (let i = 0; i < returnData.result.length; i++) {
              let newD = {value: returnData.result[i][0], label: returnData.result[i][1]};
              this.selectOptions.push(newD);
            }
            console.log(this.selectOptions);
          } else if (returnData.type === 'group') {
            console.log('group');
          } else {
            console.log('shop');
            let newD = {value: returnData.result.shopid, label: returnData.result.shopname};
            this.selectOptions.push(newD);
            console.log(this.selectOptions);
          }
          console.log('获取门店');
        }).catch(function (response) {
          // 出错处理
          console.log(response);
        });
      },
      methods: {
        test() {
              console.log(this.value);
        }
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .index
    margin-top -698px;
    margin-left 180px;
    padding-top 30px;
    width 1020px;
    height 688px;
    background #ecf0f1;
    .left
      float left;
      margin-left 30px;
      width 578px;
      height 572px;
      .shop_performance
        width 578px;
        height 554px;
        .main
          .chart
            margin-top 30px;
</style>
