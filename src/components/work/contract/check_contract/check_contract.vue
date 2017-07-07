<template>
  <div class="check_contract">
    <div class="contract_top">
      <div class="title">
        <el-row>
          <el-col :span="2">
            <div class="logo"></div>
          </el-col>
          <el-col :span="14">
            <div style="text-align: left">
              <p class="title_p">合同编号：2131231231</p>
              <p class="content_p">经办人：哈利波特</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <p class="top_p">2017-10-10 12：00 第一次提交</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="process">
        <p>审批流程：</p>
        <el-steps :space="200" :active="1" class="bar">
          <el-step title="第一次提交" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="审核中" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="审核通过" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="审核结果" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="审核不通过" description="这是一段很长很长很长的描述性文字"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="contract_main">
      <div class="finish">
        <p>负责人和合同信息：</p>
        <el-row>
          <el-col :span="4"><div>
            <p class="left_p">姓名：</p>
          </div></el-col>
          <el-col :span="20"><div>
            <p class="right_p">伏地魔</p>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div>
            <p class="left_p">身份证号码：</p>
          </div></el-col>
          <el-col :span="20"><div>
            <p class="right_p">333XXXXXXXXXXXXXXXXXXXXXXXXX</p>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div>
            <p class="left_p">手机号码：</p>
          </div></el-col>
          <el-col :span="20"><div>
            <p class="right_p">177777777777</p>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div>
            <p class="left_p">身份照片：</p>
          </div></el-col>
          <el-col :span="20"><div>
            <img src="#"/><img src="#"/>
            <p class="right_p">注意：清晰的负责人身份证照片，正反各一张，身份证信息需要与负责人一致，否则不予通过。</p>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div>
            <p class="left_p">门店数量：</p>
          </div></el-col>
          <el-col :span="20"><div>
            <p class="right_p">22</p>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div>
            <p class="left_p">合同照片：</p>
          </div></el-col>
          <el-col :span="20"><div>
            <img src="#"/><img src="#"/><img src="#"/>
            <p class="right_p">注意：清晰的照片，规范为：负责人持合同与经办人合影一张，合同首页照片一张，合同签名页照片一张，否则不予通过。</p>
          </div></el-col>
        </el-row>
        <el-collapse class="store" v-model="activeNames" @change="">
          <el-collapse-item title="门店一" name="1">
            <el-row>
              <el-col :span="4"><div>
                <p class="left_p">经营性质：</p>
              </div></el-col>
              <el-col :span="20"><div>
                <p class="right_p">22</p>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="4"><div>
                <p class="left_p">合作模式：</p>
              </div></el-col>
              <el-col :span="20"><div>
                <p class="right_p">22</p>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="4"><div>
                <p class="left_p">合作性质：</p>
              </div></el-col>
              <el-col :span="20"><div>
                <p class="right_p">22</p>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="4"><div>
                <p class="left_p">地址：</p>
              </div></el-col>
              <el-col :span="20"><div>
                <p class="right_p">22</p>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="4"><div>
                <p class="left_p">合同照片：</p>
              </div></el-col>
              <el-col :span="20"><div>
                <img src="#"/>
                <p class="right_p">注意：请拍摄清晰的照片，规范为：负责人与门店地址大门口合影一张，照片中地址需要与填写地址一致，否则不予通过。</p>
              </div></el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="checking">
        <p>负责人和合同信息：</p>
        <el-row>
          <el-col :span="4"><div>
            <el-checkbox class="left_p" v-model="checked">姓名：</el-checkbox>
          </div></el-col>
          <el-col :span="20"><div>
            <p class="right_p">伏地魔</p>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div>
            <el-checkbox class="left_p" v-model="checked">身份证号码：</el-checkbox>
          </div></el-col>
          <el-col :span="20"><div>
            <p class="right_p">333XXXXXXXXXXXXXXXXXXXXXXXXX</p>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div>
            <el-checkbox class="left_p" v-model="checked">手机号码：</el-checkbox>
          </div></el-col>
          <el-col :span="20"><div>
            <p class="right_p">177777777777</p>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div>
            <el-checkbox class="left_p" v-model="checked">身份证号码：</el-checkbox>
          </div></el-col>
          <el-col :span="20"><div>
            <img src="#"/><img src="#"/>
            <p class="right_p">注意：清晰的负责人身份证照片，正反各一张，身份证信息需要与负责人一致，否则不予通过。</p>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div>
            <el-checkbox class="left_p" v-model="checked">门店数量：</el-checkbox>
          </div></el-col>
          <el-col :span="20"><div>
            <p class="right_p">22</p>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div>
            <el-checkbox class="left_p" v-model="checked">合同照片：</el-checkbox>
          </div></el-col>
          <el-col :span="20"><div>
            <img src="#"/><img src="#"/><img src="#"/>
            <p class="right_p">注意：清晰的照片，规范为：负责人持合同与经办人合影一张，合同首页照片一张，合同签名页照片一张，否则不予通过。</p>
          </div></el-col>
        </el-row>
        <el-collapse class="store" v-model="activeNames" @change="">
          <el-collapse-item title="门店一" name="1">
            <el-row>
              <el-col :span="4"><div>
                <el-checkbox class="left_p" v-model="checked">经营性质：</el-checkbox>
              </div></el-col>
              <el-col :span="20"><div>
                <p class="right_p">22</p>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="4"><div>
                <el-checkbox class="left_p" v-model="checked">合作模式：</el-checkbox>
              </div></el-col>
              <el-col :span="20"><div>
                <p class="right_p">22</p>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="4"><div>
                <el-checkbox class="left_p" v-model="checked">合作性质：</el-checkbox>
              </div></el-col>
              <el-col :span="20"><div>
                <p class="right_p">22</p>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="4"><div>
                <el-checkbox class="left_p" v-model="checked">地址：</el-checkbox>
              </div></el-col>
              <el-col :span="20"><div>
                <p class="right_p">22</p>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="4"><div>
                <el-checkbox class="left_p" v-model="checked">合同照片：</el-checkbox>
              </div></el-col>
              <el-col :span="20"><div>
                <img src="#"/>
                <p class="right_p">注意：请拍摄清晰的照片，规范为：负责人与门店地址大门口合影一张，照片中地址需要与填写地址一致，否则不予通过。</p>
              </div></el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
        <div class="remark">
          <p>请勾选填写错误的内容，并描述不通过原因，审核通过可不填：</p>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请清晰描述审核不通过原因"
            v-model="textarea">
          </el-input>
        </div>
        <div class="btn">
          <el-button>不通过</el-button>
          <el-button type="primary">通过</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        textarea: '',
        activeNames: '',
        checked: ''
      };
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  p
    margin 0;
  img
    margin-top 10px;
    margin-right 20px;
    width 100px;
    height 100px;
  .left_p
    margin-top 10px;
    margin-left 10px;
    font-size 14px;
    color #99A9BF;
  .right_p
    margin-top 10px;
    font-size 14px;
  .top_p
    margin-top 52px;
    text-align right;
    font-size 14px;
  .title_p
    font-size 18px;
    margin-top 0;
  .content_p
    margin-top 20px;
    font-size 14px;
  .check_contract
    position absolute;
    top 0;
    z-index 10;
    padding 10px;
    width 925px;
    height 768px;
    overflow-y auto;
    background-color white;
    .contract_top
      margin-top 20px;
      .title
        border-bottom 1px solid #D3DCE6;
        .logo
          width 50px;
          height 70px;
          background-color #1c8de0;
      .process
        height 180px;
        .bar
          height 150px;
          overflow-x auto;
    .contract_main
      margin-top 20px;
      .finish
        .store
          margin-top 10px;
          width 850px;
      .checking
        .store
          margin-top 10px;
          width 850px;
        .remark
          margin-top 10px;
          p
            margin-bottom 10px;
        .btn
          margin-top 20px;
          text-align center;
</style>
