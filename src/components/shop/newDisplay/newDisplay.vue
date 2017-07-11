<template>
  <div class="newDisplay">
    <div class="top">
      <el-row>
        <el-col :span="2">
          <div class="logo"></div>
        </el-col>
        <el-col :span="14">
          <div>
            <p class="title_p">新建门店陈列标准</p>
            <p class="content_p">NO.3444424</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <p class="top_p">更新时间 2017-11-11 14：21</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="main">
      <el-row>
        <el-col :span="4">
          <div>
            <p>陈列标准范围：</p>
          </div>
        </el-col>
        <el-col :span="20">
          <div>
            <el-select class="select" v-model="newDisplay.shopName" multiple placeholder="选择地区">
              <el-option
                v-for="item in options"
                :key="item.label"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
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
            <el-input class="input" v-model="newDisplay.displayName" placeholder="请输入陈列名称"></el-input>
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
            <el-checkbox v-model="checked1">陈列标准</el-checkbox><el-checkbox v-model="checked2">门店促销</el-checkbox>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div @click="test">
            <p>新的陈列要求：</p>
          </div>
        </el-col>
        <el-col :span="20">
          <div>
            <el-upload style="width: 500px;"
              class="upload-demo"
              action=""
              :auto-upload="false"
              :on-change="handleChange"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
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
            <el-button class="submit" @click="submitNewDisplay" type="primary">提交</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          label: '杭州'
        }, {
          label: '绍兴'
        }, {
          label: '上海'
        }, {
          label: '海南'
        }, {
          label: '温州'
        }],
        value5: [],
        checked1: false,
        checked2: false,
        fileList: [],  // 图片上传列表
        textarea: '',
        input: '',
        newDisplay: { //  添加陈列的整个json
          displayName: '',
          displayType: '',
          shopName: '',
          displayRemarks: '',
          displayStandard: []
        }
      };
    },

    methods: {
      handleChange(file, fileList) {
        console.log(file, fileList);
        this.newDisplay.displayStandard = fileList;
        console.log(this.newDisplay.displayStandard);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.newDisplay.displayStandard = fileList;
      },
      test() {
        console.log(this.newDisplay.displayStandard);
      },
      submitNewDisplay() {
        this.$http.jsonp('http://192.168.199.145:8080/spg/admin/display/addDisplay', {jsonp: 'jsonpCallback', dataType: 'jsonp', data: this.newDisplay}, {headers: {contentType: 'application/x-www-form-urlencoded'}}).then((response) => {
          // success callback
          console.log(1);
        }, (response) => {
          // error callback
          console.log(this.newDisplay);
          console.log(response);
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
    margin-left 30px;
    width 898px;
    height 778px;
    overflow auto;
    background-color white;
    box-shadow 0 0 2px #1F2D3D;
    padding 30px;
    .top
      padding-bottom  10px;
      height 70px;
      border-bottom 1px solid #D3DCE6;
      .logo
        width 50px;
        height 70px;
        background-color #1c8de0;
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
      .upload
        margin-top 15px;
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
