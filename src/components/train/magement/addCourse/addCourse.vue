<template>
  <div class="addCourse">
    <el-row>
      <div class="close" @click="closeAddCourse">
        <i class="el-icon-circle-cross"></i>
      </div>
      <div class="top">
        <h3>新建课程</h3>
      </div>
      <div class="main">
        <div class="choose">
          <el-row>
            <el-col :span="10"><div>
              <p class="left_p">选择课程类型：</p>
            </div></el-col>
            <el-col :span="14"><div class="top_div">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div></el-col>
          </el-row>
        </div>
        <div class="input">
          <el-row>
            <el-col :span="10"><div>
              <p class="left_p">课程名称：</p>
            </div></el-col>
            <el-col :span="14"><div class="top_div">
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div></el-col>
          </el-row>
        </div>
        <div class="upload">
          <el-row>
            <el-col :span="10"><div>
              <p class="left_p">上传课件：</p>
            </div></el-col>
            <el-col :span="14"><div class="top_div">
              <el-upload
                class="upload-demo"
                action=""
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </div></el-col>
          </el-row>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          options: [{
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
          value: '',
          input: '',
          fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        };
      },
      methods: {
        closeAddCourse() {
          this.$store.state.show_addCourse = false;
        },
        submit() {
          this.$store.state.show_addCourse = false;
        }
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .left_p
    margin-left 150px;
  .top_div
    margin-top 15px;
    width 220px;
  .addCourse
    border 1px solid #D3DCE6;
    background white;
    padding 30px;
    overflow auto;
    .close
      float right;
      margin-top -20px;
      margin-right -10px;
    .top
      text-align center;
    .main
      margin-top 50px;
      padding-bottom 30px;
      border-bottom 1px solid #D3DCE6;
    .btn
      margin-top 50px;
      text-align center;
      .el-button
        width 100px;
</style>
