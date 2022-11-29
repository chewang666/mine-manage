<template>
  <div style="width:calc(100% - 200px)">

    <el-row style="background-color:#C0C0C0; height: 40px; align-content: center;">
      <el-col :span="16">
        <div class="left-show">
          <span>铲车名:</span>
          <el-input style=" width: 150px; margin-left: 5px;" v-model="input" placeholder="请输入铲车名" clearable/>
  
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
        <el-table-column width="200px" prop="shovelid" label="ID" sortable></el-table-column>
        <el-table-column prop="shovelname" label="铲车名"/>
        <el-table-column prop="capacity" label="当前容量"/>
        <el-table-column prop="maxCapacity" label="最大容量"/>
        <el-table-column label="操作">
          <template #default="scope">
              <el-button size="small" plain @click="showShovel(scope.row.shovelid)">铲车详情</el-button>
              <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="small" @click="delet()">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="铲车详情" v-model="shovelVis" width="35%">
        <el-table :data="minitableData" stripe>
            <el-table-column prop="workRadius" label="工作半径"></el-table-column>
            <el-table-column prop="digEnergy" label="挖掘能量"></el-table-column>
            <el-table-column prop="travelEnergy" label="运输能量"></el-table-column>
            <el-table-column prop="locationX" label="X坐标"></el-table-column>
            <el-table-column prop="locationY" label="Y坐标"></el-table-column>
            <el-table-column prop="locationZ" label="Z坐标"></el-table-column>
        </el-table>
    </el-dialog>

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
  const shovelVis = ref(false);
  
  const tableData = reactive([
    {
      shovelid: "1",
      shovelname: "1#ZX690",
      capacity: "4.000",
      maxCapacity: "5000.000",
    },
    {
      shovelid: "2",
      shovelname: "2#RH40",
      capacity: "25.000",
      maxCapacity: "20000.000",
    },
    {
      shovelid: "3",
      shovelname: "3#CAT998H",
      capacity: "25.000",
      maxCapacity: "20000.000",
    },
  ]);
  let minitableData = [
    {
        workRadius:"",
        digEnergy:"",
        travelEnergy:"",
        locationX:"",
        locationY:"",
        locationZ:"",
    },
  ];
    


  const showShovel = ( a )=>{ //这里a传来的是字符串
      if(a==="1"){
          minitableData[0]={
              workRadius:"5.240",
              digEnergy:"10.000",
              travelEnergy:"1.000",
              locationX:"0.000",
              locationY:"150.000",
              locationZ:"15.000",
          }
      }
      if(a==="2"){
          minitableData[0]={
              workRadius:"7.190",
              digEnergy:"55.000",
              travelEnergy:"5.500",
              locationX:"0.000",
              locationY:"0.000",
              locationZ:"15.000",
          }
      }
      if(a==="3"){
          minitableData[0]={
              workRadius:"7.190",
              digEnergy:"55.000",
              travelEnergy:"5.500",
              locationX:"75.000",
              locationY:"0.000",
              locationZ:"15.000",
          }
      }
      shovelVis.value=true;
  };

  const handleEdit=(b)=> {
    console.log(b)
    // this.form = JSON.parse(JSON.stringify(row))
    // this.dialogVisible = true
  };
</script>