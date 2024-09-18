<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="queryForm.query"></el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" :icon="Search" @click="initGetProjects">搜索</el-button>
        <el-button type="primary" @click="handleDialog">添加项目</el-button>
      </el-col>
    </el-row>
    
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column  width="180" v-for="(item,index) in options" :key="index" :label="item.label" :prop="item.props">

          <template v-slot="{row}" v-if="item.props === 'projectStatus'">
            <el-switch v-model="row.projectStatus" />
          </template>

        
        <template #default v-slot="{row}" v-if="item.props === 'action'">
          <el-button type="danger" :icon="Delete" circle />
          <el-button type="primary" :icon="Edit" circle />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <Dialog v-model="dialogVisible"></Dialog>
</template>

<script setup>
import { Search,Delete,Edit } from '@element-plus/icons-vue';
import {ref} from 'vue'
import {getProjects} from '@/api/projects'
import {options} from './options'
import Dialog from './components/dialog.vue'

const queryForm = ref({
  query: '',
})

const tableData = ref([])

//控制弹窗的显示
const dialogVisible=ref(false)

const handleDialog = () => {
  dialogVisible.value = true
}


const initGetProjects = async() => {
    const res = await getProjects(queryForm.value)
    //console.log(res)
    tableData.value = res
    console.log(tableData.value)
}

initGetProjects()



</script>

<style lang="scss" scoped>
.header{
  padding-bottom:24px;
  box-sizing: border-box;
}
</style>
