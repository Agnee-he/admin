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
              <el-select v-model="type" placeholder="请选择">
                <el-option
                  v-for="item in courseType"
                  :key="item.value"
                  :label="item.value"
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
              <el-input v-model="name" placeholder="请输入内容"></el-input>
            </div></el-col>
          </el-row>
        </div>
        <div class="upload">
          <el-row>
            <el-col :span="10"><div>
              <p class="left_p">上传课件：</p>
            </div></el-col>
            <el-col :span="14"><div class="top_div">
              <div class="block">
                <el-upload style="width: 500px;"
                           class="upload-demo"
                           :multiple="false"
                           action=""
                           :auto-upload="false"
                           :on-change="handleChange"
                           :on-remove="handleRemove"
                           :file-list="fileList"
                           list-type="text">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </div>
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
    import $ from 'jquery';
    export default {
      props: {
        courseType: {
          type: Array
        }
      },
      data() {
        return {
          type: '',
          name: '',
          fileList: [],
          file: []
        };
      },
      methods: {
        handleChange(file, fileList) {
          this.file = [];
          console.log(file, fileList);
          if (fileList.length > 1) {
            fileList.shift();
          }
          this.file = fileList[0].raw;
          console.log(this.file);
        },
        handleRemove(file, fileList) {
          this.file = [];
          console.log(file, fileList);
          if (fileList.length > 1) {
            fileList.shift();
          }
          this.file = fileList[0].raw;
          console.log(this.file);
        },
        closeAddCourse() {
          this.$store.state.show_addCourse = false;
          this.type = '';
          this.name = '';
          this.file = [];
        },
        submit() {
          let formData3 = new FormData();
          formData3.append('firstClass', this.type);
          formData3.append('title', this.name);
          formData3.append('file', this.file);
          $.ajax({
            url: 'http://localhost:8080/spg/admin/training/uploadcourseware',
            type: 'POST',
            data: formData3,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
              console.log('图片上传成功');
              this.$store.state.show_addCourse = false;
              this.type = '';
              this.name = '';
              this.file = [];
            },
            error: function (returndata) {
              console.log(returndata);
            }
          });
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
    position absolute;
    top 0;
    z-index 99;
    width 866px;
    height 668px;
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
