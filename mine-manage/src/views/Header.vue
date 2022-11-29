<template>
    <div style="height:50px; line-height:50px; border-bottom:1px solid #ccc; display:flex; background-color:#003366;">
      <div style="width:200px; padding-left: 30px; font-weight: bold; font-family:Pingfang; font-size: larger; color:white;">矿山信息管理子系统</div>
      <div style="flex: 1"></div>
      <div style="width:100px;">
        <el-dropdown>
          <span class="el-dropdown-link" style="line-height:50px; font-family: Pingfang; font-size: larger; color: white;">
            管理员
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
</template>
  
  
  <script lang="ts" scoped>
  import { ArrowDown } from '@element-plus/icons-vue'
  export default{
    components:{
      ArrowDown
    }

  }

  </script>
  
  
  <style lang="less" scoped>
  .example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
  
  </style>