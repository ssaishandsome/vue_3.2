<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="queryForm.query"></el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" :icon="Search" @click="initGetBugs">搜索</el-button>
        <el-button type="primary" @click="handleDialog">添加Bug</el-button>
      </el-col>
    </el-row>
    
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column  width="180" v-for="(item,index) in options" :key="index" :label="item.label" :prop="item.props">

          <template v-slot="{row}" v-if="item.props === 'bugStatus'">
            <el-switch v-model="row.bugStatus" />
          </template>

        
        <template #default="{row}" v-if="item.props === 'action'">
          <el-button type="danger" :icon="Delete" circle @click="handleDelete(row)" />
          <el-button type="primary" :icon="Edit" circle  @click="handleDialogEdit(row)"/>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <!-- 传入子组件的变量和函数，需要在这里传入 -->
  <Dialog v-model="dialogVisible" @initBugList="initGetBugs"></Dialog>
  <!-- 必须等点击编辑按钮之后，才能开始传数据，否则数据传送异步 -->
  <span v-if="dialogEditVisible">  
    <DialogEdit v-model="dialogEditVisible" @initBugList="initGetBugs" :dialogEditTable="dialogEditTable"
  :bugId="bugId" :dialogEditVisible="dialogEditVisible"
  ></DialogEdit></span>
</template>

<script setup>
import { Search,Delete,Edit } from '@element-plus/icons-vue';
import {ref} from 'vue'
import {getBugs, deleteBugs} from '@/api/bugs'
import {options} from './options'
import Dialog from './components/dialog.vue'
import DialogEdit from './components/dialog_edit.vue';

const queryForm = ref({
  query: '',
})

const tableData = ref([])

//控制添加bug的弹窗的显示
const dialogVisible=ref(false)

const handleDialog = () => {
  dialogVisible.value = true
}
//控制编辑bug的弹窗
const dialogEditVisible=ref(false)

// 编辑bug的弹窗中的编辑bug部分
const dialogEditTable = ref({})

//记录bug的ID
const bugId = ref()

const handleDialogEdit = async (row) => {
  dialogEditVisible.value = true
  //拿到代理对象的属性，使用JOSN.stringify()方法，将对象转换为字符串，再使用JSON.parse()方法，将字符串转换为对象
  dialogEditTable.value = JSON.parse(JSON.stringify(row))
  console.log(row)
  bugId.value = dialogEditTable.value.bugId
  // // 发送路由请求，获得？？列表
  // ModulesList.value = await getModules(dialogEditTable.value.bugId)
}

const tem = ref({})
const handleDelete = async(row) => {
  tem.value = JSON.parse(JSON.stringify(row))
  bugId.value = tem.value.bugId
  await deleteBugs(bugId.value)
  initGetBugs()
}

const initGetBugs = async() => {
    const res = await getBugs(queryForm.value)
    //console.log(res)
    tableData.value = res
    console.log(tableData.value)
}

initGetBugs()



</script>

<style lang="scss" scoped>
.header{
  padding-bottom:24px;
  box-sizing: border-box;
}
</style>
