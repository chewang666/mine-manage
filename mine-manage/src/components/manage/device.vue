<template>
    <div style="width:calc(100% - 200px)">

      <el-row style="background-color:#C0C0C0; height: 40px; align-content: center;">
        <el-col :span="20">
          <div class="left-show">
            <span>设备号:</span>
            <el-input style=" width: 105px; margin-left: 5px;" v-model="inputDeviceCode" placeholder="请输入设备号" clearable/>
    
            <span style="margin-left: 10px;">设备名:</span>
            <el-input style="width: 105px; margin-left: 5px;" v-model="inputDeviceName" placeholder="请输入设备名" clearable/>

            <span style="margin-left: 10px;">操作员:</span>
            <el-tree-select
              style="margin-left:5px"
              v-model="searchPrincipal"
              :data="principalOptions.arr"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :render-after-expand="false"
            />

            <span style="margin-left:15px">设备类型:</span>
            <el-tree-select
              style="margin-left:5px"
              v-model="searchDeviceType"
              :data="deviceOptions"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :render-after-expand="false"
            />
            
            <el-button style="margin-left:10px" type="primary" icon="Search" @click="handleSearch">查询</el-button>
          </div>
        </el-col>

        <el-col :span="4">
          <div style="float: right; display: flex;">
            <div> <el-button type="primary" icon="Edit" @click="handleAdd"> 添加 </el-button> </div>
            <el-upload
            action="http://localhost:9090/user/import"
            :on-success="handleUploadSuccess"
            :show-file-list=false
            :limit="1"
            accept='.xlsx'
            style="margin-left:20px"
            >
              <el-button type="primary" icon="Download">导入</el-button>
            </el-upload>
            <el-button type="primary" icon="Upload" style="margin-left:10px; margin-right: 5px;" @click="exportDevice">导出</el-button>
          </div>
        </el-col>


        <!-- 点击显示的弹窗 -->
        <div>
          <el-dialog v-model="dialogVisible" :title="dialogTitle" width="25%">
            <el-form :model="form" label-width="120px">
              <el-form-item label="设备号:">
                <el-input v-model="form.arr.deviceCode" style="width: 75%;"/>
              </el-form-item>
              <el-form-item label="设备名:">
                <el-input v-model="form.arr.name" style="width: 75%;"/>
              </el-form-item>
              <el-form-item label="设备类型:">
                <el-tree-select
                  style="width:75%"
                  v-model="form.arr.typeId"
                  :data="deviceOptions"
                  collapse-tags
                  collapse-tags-tooltip
                  :render-after-expand="false"
                />
              </el-form-item>
              <el-form-item label="操作员:">
                <el-tree-select
                  style="width:75%"
                  v-model="form.arr.principalId"
                  :data="principalOptions.arr"
                  collapse-tags
                  collapse-tags-tooltip
                  :render-after-expand="false"
                />
              </el-form-item>
              <el-form-item label="originalValue:">
                <el-input v-model="form.arr.originalValue" style="width: 75%;"/>
              </el-form-item>

            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="save">确定</el-button>
              </span>
            </template>
          </el-dialog>
        </div>

      </el-row>
      
  
 
      <div>
        <el-table 
          :data="tableData.arr"
          stripe
          height="100%"
        >
          <!-- <el-table-column width="200px" prop="id" label="ID" sortable/> -->
          <el-table-column prop="deviceCode" label="设备号"/>
          <el-table-column prop="name" label="设备名"/>
          <el-table-column prop="type" label="设备类型"/>
          <el-table-column prop="principal" label="操作员"/>
          <el-table-column prop="originalValue" label="originalValue"/>
          <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                <el-popconfirm title="确定要删除吗?" confirm-button-text="确定" cancel-button-text="取消" @confirm="handleDelet(scope.row.id)">
                  <template #reference>
                    <el-button size="small" type="danger">删除</el-button>
                  </template>
                </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <div style="">
        <!-- 根据value值来隐藏分页，一般在只有一页时使用 -->
        <el-pagination
          :currentPage="currentPage"
          background
          small
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          :default-page-size="10"
          :default-current-page="1"
          :hide-on-single-page="value"
          layout="total, sizes, prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

    </div>
</template>
  
  
  <style lang='less' scoped>
  .left-show {
    margin-left: 10px;
  }
  
  
  </style>
  
  
  
  <script lang='ts' setup>
  import { assertExpressionStatement } from "@babel/types";
  import { onMounted, ref , reactive ,getCurrentInstance, ComponentInternalInstance} from "vue";
  import { toRaw } from '@vue/reactivity';
  import axios from 'axios';
  import request from "@/utils/request.js";//这里如果报错要在shims-vue.d.ts文件里设置声明
  import {exportExcel} from "@/utils/exportToExcel";//导入封装的excel处理包
  const { proxy } = getCurrentInstance() as ComponentInternalInstance; //添加as...强制确认，否则会报错
  const value = ref(false);
  const input = ref("");
  const dialogVisible = ref(false);
  const dialogTitle = ref('');
  const total = ref(100);//后台总信息条数，默认为100
  const currentPage=ref(1);//默认显示第一页
  const pageSize=ref(10);
  const inputDeviceCode=ref(null);//接收查询的设备号
  const inputDeviceName=ref(null);

  const searchPrincipal=ref([]);
  const searchDeviceType=ref([]);

  const deviceOptions=ref([//设备类型下拉框数据
    {
      value: '1',
      label: '卡车'
    },
    {
      value: '2',
      label: '铲车'
    },
  ])
  const principalOptions=reactive( //操作员下拉框数据
    {
      arr: [],
    }
  )

  
  const tableData = reactive( //属性以驼峰式规则命名
    {
      arr: [], //要在里面单独弄一个数组，赋值的时候才不会丢失响应式！！！
    }
  );
  const form = reactive(  //用来绑定弹窗里填的数据
    {
      arr: {},
    }
  );


  const aa = {//查询所有数据
    deviceCode: null,
    types: [],
    principals: []//????????
  };
  const bb = {//查询指定数据
    deviceCode: null,
    types: [],
    principals: []
  };

 


  const load = () => { //获取并更新页面人员信息  
    request.post("/devices/classify/" + currentPage.value + "/" + pageSize.value, aa).then(res => {
      console.log(res);
      tableData.arr=res.data.data;
      total.value=res.data.allAccount;//需要后台返回的总条数
      // proxy.$forceUpdate();//强制更新
    })
  }
  load();//在setup里直接调用


  // 这一大块是为了查到操作员所对应的id
  const aaa = {//查询所有数据
    name: null,
    staffCode: null,
    levelIds: [],
    skillIds: []
  };
  const getallstaff = () => {
    request.post("/staffs/classify/" + 1 + "/" + 10000, aaa).then(res => {
      for(let item of res.data.data){ //复制想要的列
        var obj={
          value: item.id+'',
          label: item.name
        }
        principalOptions.arr.push(obj);//复制
      }
    })
  }
  getallstaff(); //给操作员下拉框赋初值





  const handleAdd = () => { //新增
    dialogTitle.value="添加新设备";
    dialogVisible.value = true;
    form.arr={};//清空表格数据
  }

  const handleEdit = (row) => {//编辑
    form.arr=row;
    form.arr.typeId+="";//强制类型转换，因为el-tree-select的v-model是绑定的string类型，以便显示正常
    form.arr.principalId+="";
    dialogTitle.value="编辑";
    dialogVisible.value = true;
    console.log(form.arr);
    
  }

  const handleDelet = (id) => { //删除
    request.post("/devices/classify/" + currentPage.value + "/" + pageSize.value, aa).then(res =>{
      if(res.data.account==1){ //如果当前页只有最后一个信息
        currentPage.value=currentPage.value-1;
      }
      currentPage.value = currentPage.value < 1 ? 1 : currentPage.value; //只有一页则到第一页

      request.delete("/devices/" + id).then(res => {
        load();//调用load要放在then里面，否则会先执行load函数
      })
      // load();//在这里调用会导致先执行load()再向后端请求post，删除最后一条数据返回上一页时就会出现当前页currentPage并没更新而报错
    })
  }

  const handleSearch = () => { //查询
    
    bb.deviceCode=inputDeviceCode.value;//设备号

    // bb.name=inputDeviceName.value;
    for(let item of tableData.arr){  
      if(inputDeviceName.value==item.name){ //设备名（如果搜索的是设备名，则直接绑定设备号，传设备号过去进行查询）？？？？有重复怎么办
        bb.deviceCode=item.deviceCode;
      }
    }

    bb.principals=searchPrincipal.value;//操作员
    bb.types=searchDeviceType.value;//设备类型
    request.post("/devices/classify/" + currentPage.value + "/" + pageSize.value, bb).then(res => {
      tableData.arr=res.data.data;
      total.value=res.data.allAccount;//需要后台返回的总条数
    })
  }


  const save = () => { 
    if(form.arr.id){ //编辑
      request.put("/devices",form.arr).then(res=>{
        // console.log(res);
      })
    }else{ //新增
      form.arr.id=0; //后端还要传个id=0才能响应
      request.post("/devices",[form.arr]).then(res => {  //向后端传参要用[]括起来！！  这里貌似可以直接传form,可以不用传解构后的form1
        // console.log(res);
      })
    }
    dialogVisible.value=false;//关闭弹窗
    load();//重新请求数据
  }



  const handleSizeChange = (val: number) => {    //改变每页信息条数  传过来的number是每页项数
    pageSize.value=val;//更新当前页显示数据个数
    load();//重新请求数据
    // console.log(`${pageSize.value} 每页项数`)
  }
  const handleCurrentChange = (val: number) => { //改变当前页，并更新数据   传过来的number是当前页
    currentPage.value=val;
    load();//重新请求数据
    // console.log(`当前页: ${val}`)
  }

  const exportTableData = reactive({
    arr: [],
  })
  const title=['设备号','设备名','设备类型','操作员','originalValue'];//导出表格数据的表头
  const exportDevice = () => { //导出表格数据
    request.post("/devices/classify/" + currentPage.value + "/" + 10000 , aa).then(res => {
      for(let item of res.data.data){ //复制想要的列
        var obj={
          deviceCode: item.deviceCode,
          name: item.name,
          type: item.type,
          principal: item.principal,
          originalValue: item.originalValue
        }
        exportTableData.arr.push(obj);//复制
      }
      exportExcel(exportTableData.arr,'test',title,'表1');
    }) 
  }
  
  </script>