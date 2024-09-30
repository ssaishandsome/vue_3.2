<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-form-item label="项目" prop="projectId">
        <el-select v-model="form.projectId" placeholder="选择一个项目">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" :icon="Search" @click="initGetBugs">确定</el-button>
      </el-col>
    </el-row>

    <div class="echart" ref="myChart1" id="myChart1" :style="{ float: 'left', width: '50%', height: '400px' }"></div>
    <div class="echart" ref="myChart2" id="myChart2" :style="{ float: 'left', width: '50%', height: '400px' }"></div>
  </el-card>
  <!-- 传入子组件的变量和函数，需要在这里传入 -->
  <Dialog v-model="dialogVisible" @initBugList="initGetBugs"></Dialog>
</template>

<script setup>
import { Search,Delete,Edit } from '@element-plus/icons-vue';
import {ref} from 'vue'
import {getBugs} from '@/api/bugs'

const form = ref({
  "projectId":""
})

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

const initGetBugs = async() => {
    const res = await getBugs(queryForm.value)
    //console.log(res)
    tableData.value = res
    console.log(tableData.value)
}

initGetBugs()



</script>


<!-- 因为后端没写完所以现在只能测试饼图的外观-->
<script>
import * as echarts from "echarts"

export default {
  data() {
    return {
      myChart1: {},
      myChart2: {},
      pieData1: [
        {
          value: 14,
          name: "高"
        },
        {
          value: 13,
          name: "中"
        },
        {
          value: 7,
          name: "低"
        }
      ],
      pieData2: [
      {
          value: 20,
          name: "待修改"
        },
        {
          value: 10,
          name: "已修改"
        },
        {
          value: 4,
          name: "不修改"
        }
      ],
      pieName1: [],
      pieName2: [],
      myChartStyle: { float: "left", width: "100%", height: "400px" } //图表样式
    };
  },
  mounted() {
    this.initDate(); //数据初始化
    this.initEcharts();
  },
  methods: {
    initDate() {
      for (let i = 0; i < this.pieData1.length; i++) {
        // this.xData[i] = i;
        // this.yData =this.xData[i]*this.xData[i];
        this.pieName1[i] = this.pieData1[i].name;
      }

      for (let j = 0; j< this.pieData2.length; j++){
        this.pieName2[j] = this.pieData2[j].name;
      }
    },
    initEcharts() {
      // 饼图
      const option1 = {
        legend: {
          // 图例
          data: this.pieName1,
          right: "10%",
          top: "30%",
          orient: "vertical"
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: "项目Bug严重度分布统计",
          top: "0%",
          left: "center"
        },
        color: ['#f5583f', '#f0d928', '#00e69d'],
        series: [
          {
            type: "pie",
            label: {
              show: true,
              formatter: "{b} : {c} ({d}%)" // b代表名称，c代表对应值，d代表百分比
            },
            radius: ["30%", "70%"], //饼图半径
            data: this.pieData1
          }
        ]
      }

      const option2 = {
        legend: {
          // 图例
          data: this.pieName2,
          right: "10%",
          top: "30%",
          orient: "vertical"
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: "项目Bug工作状态统计",
          top: "0%",
          left: "center"
        },
        color: ['#f5583f', '#00e69d', '#f0d928'],
        series: [
          {
            type: "pie",
            label: {
              show: true,
              formatter: "{b} : {c} ({d}%)" // b代表名称，c代表对应值，d代表百分比
            },
            radius: ["30%", "70%"], //饼图半径
            data: this.pieData2
          }
        ]
      }

      console.log(this.seriesData);
      const optionFree = {
        xAxis: {},
        yAxis: {},
        series: [
          {
            data: this.seriesData,
            type: "line",
            smooth: true
          }
        ]
      };
      this.myChart1 = echarts.init(document.getElementById("myChart1"));
      this.myChart1.setOption(option1);
      this.myChart2 = echarts.init(document.getElementById("myChart2"));
      this.myChart2.setOption(option2);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        this.myChart1.resize();
        this.myChart2.resize();
      });
    }
  }
}


</script>

<style lang="scss" scoped>
.header{
  padding-bottom:24px;
  box-sizing: border-box;
}
</style>
