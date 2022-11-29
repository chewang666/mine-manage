<template>
    <div style="width:calc(100% - 200px)">
  
      <el-row style="background-color:#C0C0C0; height: 40px; align-content: center;">
        <el-col :span="16">
          <div class="left-show">
            <span>计划ID:</span>
            <el-input style=" width: 150px; margin-left: 5px;" v-model="input" placeholder="请输入计划ID" clearable/>
    
            <el-button style="margin-left:10px" type="primary">查询</el-button>
          </div>
        </el-col>
  
        <el-col :span="8">
          <div style="float: right; display: flex;">
            <span> <el-button> 添加 </el-button> </span>
            <el-upload
            action="http://localhost:9090/user/import"
            :on-success="handleUploadSuccess"
            :show-file-list=false
            :limit="1"
            accept='.xlsx'
            style="margin-left:20px"
            >
              <el-button type="primary">导入</el-button>
            </el-upload>
            <el-button type="primary" style="margin-left:10px; margin-right: 5px;" @click="exportUser">导出</el-button>
          </div>
        </el-col>
      </el-row>
      
  
      <div>
        <el-table
          :data="tableData"
          stripe
          height="100%"
        >
          <el-table-column width="200px" prop="planid" label="ID" sortable></el-table-column>
          <el-table-column prop="planperiod" label="排班计划"/>
          <el-table-column prop="deviceid" label="设备id"/>
          <el-table-column prop="personid" label="员工id"/>
          <el-table-column prop="devicetype" label="设备类型"/>
          <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="small" @click="delet()">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
  
    </div>
  </template>
  
  
  
  <style lang="less" scoped>
  .left-show {
      margin-left: 10px;
    }
  
  </style>
  
  
  
  <script lang="ts" setup>
  import { reactive, ref } from "vue";
    const value_state = ref([]);
    const checked3 = ref(false);
    const checked4 = ref(true);
    const input = ref('')
    const planVis = ref(false);
    
    const tableData = reactive([
        {
        planid: "1",
        planperiod: "early",
        deviceid: "3",
        personid: "1",
        devicetype:"truck",
        },
        {
        planid: "2",
        planperiod: "early",
        deviceid: "2",
        personid: "4",
        devicetype:"truck",
        },
        {
        planid: "3",
        planperiod: "early",
        deviceid: "5",
        personid: "2",
        devicetype:"shovel",
        },
    ]);

  
    const handleEdit=(b)=> {
      console.log(b)
      // this.form = JSON.parse(JSON.stringify(row))
      // this.dialogVisible = true
    };
  </script>