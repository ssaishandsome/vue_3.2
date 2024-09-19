<!-- 这里是导航栏的组件代码 -->
<template>
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :default-active="defaultActive"
        text-color="#fff"
        router
        unique-opened
        :collapse="!$store.getters.siderType"  
      >
      <!-- collapse 控制伸缩 -->
        <el-sub-menu :index="item.id" v-for="(item,index) in menusList" :key="item.id">
          <template #title>
            <el-icon>
              <component :is="iconList[index]"></component>
            </el-icon>
            <span>{{item.authName}}</span>
          </template>
          <el-menu-item :index="'/'+it.path" v-for="it in item.children" :key="it.id"
          @click="savePath(it.path)">
            <template #title>
              <el-icon>
                <component :is="icon"></component>
              </el-icon>
              <span>{{it.authName}}</span>
            </template>
          </el-menu-item>
            
        </el-sub-menu>
        <!-- <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item> -->
      </el-menu>
</template>

<script setup>
import {menuList} from '../../api/menu'
import {ref} from 'vue'

const iconList = ref(['user','setting','setting','pie-chart'])
const icon = ref('menu')

const menusList =ref([])
const defaultActive = ref(sessionStorage.getItem('path') || '/user')
const savePath = (path)=>{
  sessionStorage.setItem('path',`/${path}`)
}

const initMenusList = async ()=>{
    //将响应的数据赋值给menusList
    menusList.value = await (await menuList()).data
    console.log(menusList.value)
}
initMenusList()
</script>