<!-- 布局 -->
<template>
    <div class="common-layout">
      <el-container class="app-wrapper">
        <el-aside width="200px" class="sidebar-container">Aside</el-aside>
        <el-container class="container">
          <el-header>Header</el-header>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
    </div>
  </template> 



<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.container {
    //采用定义好的变量值，在style/variables.scss中定义，需要导入
  width: calc(100% - $sideBarWidth);
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;
  &.hidderContainer {
    width: calc(100% - $hideSideBarWidth);
  }
}
::v-deep .el-header {
  padding: 0;
}
</style>
