<template>
  <div class="newDisplay" v-show="$store.state.show_newDisplay">
    <div class="close">
      <el-row>
        <el-col :span="24"><div><i @click="closeNewDisplay" class="el-icon-circle-close"></i></div></el-col>
      </el-row>
    </div>
    <div class="top">
      <el-row>
        <el-col :span="2">
          <div class="logo"></div>
        </el-col>
        <el-col :span="14">
          <div>
            <p class="title_p">新建门店陈列标准</p>
            <!--<p class="content_p">NO.3444424</p>-->
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <!--<p class="top_p">更新时间 2017-11-11 14：21</p>-->
          </div>
        </el-col>
      </el-row>
    </div>
    <form @submit.prevent="submit" id="uploadForm" enctype="multipart/form-data" method="post">
      <div class="main">
        <el-row>
          <el-col :span="4">
            <div>
              <p>陈列标准范围：</p>
            </div>
          </el-col>
          <el-col :span="20">
            <div>
              <select class="selectSelf" v-model="shopid">
                <option v-for="item in shop">{{item.shopname}}</option>
              </select>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div>
              <p>陈列名称：</p>
            </div>
          </el-col>
          <el-col :span="20">
            <div>
              <el-input class="input" name="displayName" v-model="newDisplay.displayName" placeholder="请输入陈列名称"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div>
              <p>陈列类型：</p>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="checked">
                <el-radio class="radio" name="displayType" v-model="newDisplay.displayType" label="标准陈列">标准陈列</el-radio><br/><br/>
                <el-radio class="radio" name="displayType" v-model="newDisplay.displayType" label="促销陈列">促销陈列</el-radio>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div>
              <p>时间设置：</p>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="block" v-if="newDisplay.displayType === '标准陈列'">
              <el-date-picker
                v-model="startTime"
                name="startTime"
                type="date"
                placeholder="选择开始日期">
              </el-date-picker>
            </div>
            <div class="block" v-else>
              <el-date-picker
                name="startTime"
                v-model="startTime"
                type="date"
                placeholder="选择开始日期">
              </el-date-picker>
              <el-date-picker
                name="overTime"
                v-model="overTime"
                type="date"
                placeholder="选择结束日期">
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div>
              <p>新的陈列要求：</p>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="block">
              <el-upload style="width: 500px;"
                class="upload-demo"
                action=""
                :auto-upload="false"
                :on-change="handleChange"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,宽高比5：3。</div>
              </el-upload>
            </div>
            <!--<input type="file" @change="getFile($event)">-->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div>
              <p>备注：</p>
            </div>
          </el-col>
          <el-col :span="20">
            <div>
              <el-input
                name="displayRemarks"
                class="remark"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="newDisplay.displayRemarks">
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="btn">
        <el-row>
          <el-col :span="4">
            <div>
              <p class="note_p">提交成功后，将自动发送消息提示日常陈列标准有更新。</p>
            </div>
          </el-col>
          <el-col :span="20">
            <div>
              <el-button class="submit" @click="submit" type="primary">提交</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </form>
  </div>
</template>

<script>
  import $ from 'jquery';
  import router from '../../../router';

  export default {
    data() {
      return {
        url: this.$store.state.lastUrl,
        value5: [],
        value1: '',
        radio: '标准陈列',
        fileList: [],  // 图片上传列表
        textarea: '',
        input: '',
        shop: [], // 门店列表
        shopid: '',
        startTime: '',
        overTime: '',
        newDisplay: { //  添加陈列的整个json
          displayName: '',
          displayRemarks: '',
          displayStandard: [],
          displayType: '标准陈列',
          startTime: '',
          overTime: ''
        },
        postDisplay: []
      };
    },
    created() {
      this.$http.jsonp(this.url + 'spg/admin/display/getShops', {jsonp: 'jsonpCallback'}).then((response) => {
          // success callback
        this.shop = response.data.result.shopModels;
//        console.log(this.shop);
        }, (response) => {
          // error callback、
        });
    },
    watch: {
      startTime: {
        handler: function () {
          //  时间格式转化
          if (this.startTime !== '') {
            this.newDisplay.startTime = this.formatDateTime(this.startTime);
          }
        }
      },
      overTime: {
        handler: function () {
          //  时间格式转化
          if (this.overTime !== '') {
            this.newDisplay.overTime = this.formatDateTime(this.overTime);
          }
        }
      }
    },
    methods: {
      getFile(event) {
        this.file = event.target.files[0];
      },
      formatDateTime(date) { // 格式化时间
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
//        let h = date.getHours();
//        let minute = date.getMinutes();
//        minute = minute < 10 ? ('0' + minute) : minute;
        return y + '-' + m + '-' + d;
      },
      handleChange(file, fileList) {
        this.newDisplay.displayStandard = [];
        for (let i = 0; i < fileList.length; i++) {
          this.newDisplay.displayStandard.push(fileList[i].raw);
        }
      },
      handleRemove(file, fileList) {
        this.newDisplay.displayStandard = [];
        for (let i = 0; i < fileList.length; i++) {
          this.newDisplay.displayStandard.push(fileList[i].raw);
        }
      },
      test() {
        console.log(this.newDisplay);
        console.log(this.shopid);
      },
      submit() {
//        console.log(this.shopid);
//        this.postDisplay = [];
        let shopIdName = '';
        for (let x = 0; x < this.shop.length; x++) {
          if (this.shop[x].shopname === this.shopid) {
//            this.shopid[0] = this.shop[x].shopname;
            shopIdName = this.shop[x].shopid + '-' + this.shop[x].shopname;
          }
        }
//        for (let i = 0; i < this.shopid.length; i++) {
//          let dis = {shopId: this.shopid[i], displayName: this.newDisplay.displayName, displayType: this.newDisplay.displayType, startTime: this.newDisplay.startTime, overTime: this.newDisplay.overTime, displayRemarks: this.newDisplay.displayRemarks, shopName: '', displayStandard: this.newDisplay.displayStandard};
//          this.postDisplay.push(dis);
//        }
//        let shopIdName = [];
//        for (let x = 0; x < this.postDisplay.length; x++) {
//          for (let y = 0; y < this.shop.length; y++) {
//            if (this.postDisplay[x].shopId === this.shop[y].shopid) {
//              shopIdName.push(this.postDisplay[x].shopId + '-' + this.shop[y].shopname);
//            }
//          }
//        }
//        console.log(this.newDisplay);
//        console.log(shopIdName);
        let formData3 = new FormData();
        formData3.append('displayName', this.newDisplay.displayName);
        formData3.append('displayType', this.newDisplay.displayType);
        formData3.append('shopid', shopIdName);
        formData3.append('startTime', this.newDisplay.startTime);
        formData3.append('overTime', this.newDisplay.overTime);
        formData3.append('displayRemarks', this.newDisplay.displayRemarks);
        for (let i = 0; i < this.newDisplay.displayStandard.length; i++) {
          formData3.append('files', this.newDisplay.displayStandard[i]);
        }
        let success = false;
        let returnDate = '';
        console.log(formData3);
        $.ajax({
          url: this.url + 'spg/admin/display/addDisplay',
          type: 'POST',
          data: formData3,
          async: false,
          cache: false,
          contentType: false,
          processData: false,
          success: function (returndata) {
            success = true;
            returnDate = returndata.returnCode;
          },
          error: function (returndata) {
            console.log(returndata);
          }
        });
        if (success) {
          if (returnDate === 'B1013') {
            this.$message({
              message: '主题名称重复,请重新输入',
              type: 'error'
            });
          } else {
            this.$store.state.show_newDisplay = false;
            this.newDisplay = { //  添加陈列的整个json
              displayName: '',
              displayRemarks: '',
              displayStandard: [],
              displayType: '标准陈列',
              startTime: '',
              overTime: ''
            };
            router.go({path: '/shop'});
          }
        }
      },
      closeNewDisplay() {
          this.$store.state.show_newDisplay = false;
          this.shopid = [];
          this.newDisplay = { //  添加陈列的整个json
            displayName: '',
            displayRemarks: '',
            displayStandard: [],
            displayType: '标准陈列',
            startTime: '',
            overTime: ''
        };
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .selectSelf
    margin-top 10px;
    height 35px;
    border 1px solid #C0CCDA;
    border-radius 5px;
  .note_p
    font-size 14px;
    color #99A9BF;
  .top_p
    float right;
    margin-top 52px;
    font-size 14px;
  .title_p
    font-size 18px;
    margin-top 0;
  .content_p
    margin-top 30px;
    font-size 14px;
  .newDisplay
    position absolute;
    z-index 999;
    top 150px;
    margin-left 30px;
    width 898px;
    height 618px;
    overflow auto;
    background-color white;
    box-shadow 0 0 2px #1F2D3D;
    padding 30px;
    .close
      margin-top -10px;
      margin-right -10px;
      float right;
    .top
      padding-bottom  10px;
      height 70px;
      border-bottom 1px solid #D3DCE6;
      .logo
        width 60px;
        height 54px;
        background-image url("../../../img/shop.png");
    .main
      margin-top 20px;
      padding-bottom 15px;
      border-bottom 1px solid #D3DCE6;
      .select
        margin-top 10px;
        width 600px;
      .input
        margin-top 10px;
        width 300px;
      .checked
        margin-top 15px;
      .block
        margin-top 15px;
      .upload
        margin-top 30px;
        width 600px;
      .remark
        margin-top 15px;
        width 600px;
    .btn
      margin-top 15px;
      text-align center;
      .submit
        margin-top 15px;
        width 300px;
</style>
