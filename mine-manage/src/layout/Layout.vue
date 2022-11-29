<template>
  <el-config-provider :locale="locale">
    <div>
      <!-- 头部区域 -->
      <Header></Header>
      <div style="display: flex">
        <!-- 侧边区域 -->
        <Aside> </Aside>
        <!-- 主体区域 -->
        <router-view/>
      </div>
    </div>
  </el-config-provider>
</template>



<style lang="less" scoped>
#layout {
  position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>



<script lang="ts">
import Header from '@/views/Header.vue'
import Aside from '@/views/Aside.vue'
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'


export default defineComponent({
  components: {
    Header,
    Aside,
    ElConfigProvider,
  },
  setup() {
    return {
      locale: zhCn,
    }
  },
})
</script>