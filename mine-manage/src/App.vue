<template>
  <el-config-provider :locale="locale">
    <div>
      <!-- 总路由 -->
      <router-view/>
    </div>
  </el-config-provider>
</template>

<style lang="less">
#app {
  position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'


export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    return {
      locale: zhCn,
    }
  },
})

</script>
