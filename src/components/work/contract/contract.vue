<template>
  <div class="contract">
    <div class="contract_top">
      <el-row>
        <el-col :span="9">
          <div class="search">
            <div class="input_top">
              <span>搜索合同：</span>
              <el-input class="input" v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div class="input_bottom">
              <span>合同状态：</span>
              <el-select class="input" v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="search">
            <div class="input_top">
              <span>经办人：</span>
              <el-input style="margin-left: 15px;" class="input" v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div class="input_bottom">
              <span>提交日期：</span>
              <el-date-picker
                claas="input"
                v-model="value1"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="btn">
            <el-button><i class="el-icon-search"></i>搜索</el-button><el-button><i class="el-icon-loading"></i>重置</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="contract_main">
      <el-table
        ref="multipleTable"
        :data="contract"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          prop="number"
          align="center"
          label="合同编号">
        </el-table-column>
        <el-table-column
          prop="state"
          align="center"
          label="合同状态">
        </el-table-column>
        <el-table-column
            prop="date"
            align="center"
            label="提交日期">
        </el-table-column>
        <el-table-column
            prop="operator"
            align="center"
            label="经办人">
        </el-table-column>
        <el-table-column
            prop="principal"
            align="center"
            label="负责人">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="">查看</el-button>
            <el-button
              size="small"
              type="danger"
              @click="deleteRow(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([contract[0], contract[1], contract[2], contract[3], contract[4], contract[5], contract[6], contract[7], contract[8], contract[9]])">全选</el-button>
        <el-button @click="">导出</el-button>
      </div>
      <paging class="paging"></paging>
    </div>
    <checkContract></checkContract>
  </div>
</template>

<script>
  import paging from '../../paging/paging.vue';
  import checkContract from './check_contract/check_contract.vue';

  export default {
    data() {
      return {
        input: '',
        options: [
          {
          label: '审核中'
          }, {
          label: '未通过'
          }, {
          label: '已通过'
          }
        ],
        value: '',
        value1: '',
        contract: [
          {
            number: '110',
            state: '已通过',
            date: '2017-01-01',
            operator: '对的对的',
            principal: '呃呃呃'
          },
          {
            number: '110',
            state: '已通过',
            date: '2017-01-01',
            operator: '对的对的',
            principal: '呃呃呃'
          },
          {
            number: '110',
            state: '已通过',
            date: '2017-01-01',
            operator: '对的对的',
            principal: '呃呃呃'
          }
        ]
      };
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    },

    components: {
      paging,
      checkContract
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  html
    margin 0;
    padding 0;
  .contract
    height 768px;
    .contract_top
      padding-bottom 10px;
      border-bottom 1px solid #D3DCE6;
      .search
        .input_top
          float left;
          .input
            display inline-block;
            width 194px;
        .input_bottom
          margin-top 10px;
          float left;
          .input
            display inline-block;
            width 100px;
      .btn
        margin-top 45px;
        float right;
    .contract_main
      .paging
        float right;
        margin-top -40px;
</style>
