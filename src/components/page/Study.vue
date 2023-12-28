<template>
    <el-card class="box-card" shadow="hover">
        <span>
            当前,第
            <el-select @change="changeValue" v-model="value" placeholder="1" class="m-2" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
                </el-select>
                周
        </span>
    
          <el-divider />
          <el-table :data="timetable" :span-method="objectSpanMethod" border
                    :header-cell-style="{background:'#d9e5fd', color:'black', fontWeight: 1000}"
                    :cell-style="tableCellStyle"
                     style="overflow-x:hidden"
          >
            <el-table-column prop="sjd" label="时间段" width="120" align="center">
            </el-table-column>
            <el-table-column prop="jc" label="节次" width="120" align="center">
            </el-table-column>
            <el-table-column prop="mon" label="星期一" align="center">
              <template #default="scope">
                <h4>{{ scope.row.mon.lessonName }}</h4>
                <div v-html="scope.row.mon.place"></div>
              </template>
            </el-table-column>
            <el-table-column prop="tue" label="星期二" align="center">
              <template #default="scope">
                <h4>{{ scope.row.tue.lessonName }}</h4>
                <div v-html="scope.row.tue.place"></div>
              </template>
            </el-table-column>
            <el-table-column prop="wed" label="星期三" align="center">
              <template #default="scope">
                <h4>{{ scope.row.wed.lessonName }}</h4>
                <div v-html="scope.row.wed.place"></div>
              </template>
            </el-table-column>
            <el-table-column prop="thu" label="星期四" align="center">
              <template #default="scope">
                <h4>{{ scope.row.thu.lessonName }}</h4>
                <div v-html="scope.row.thu.place"></div>
              </template>
            </el-table-column>
            <el-table-column prop="fri" label="星期五" align="center">
              <template #default="scope">
                <h4>{{ scope.row.fri.lessonName }}</h4>
                <div v-html="scope.row.fri.place"></div>
              </template>
            </el-table-column>
            <el-table-column prop="sat" label="星期六" align="center">
              <template #default="scope">
                <h4>{{ scope.row.sat.lessonName }}</h4>
                <div v-html="scope.row.sat.place"></div>
              </template>
            </el-table-column>
            <el-table-column prop="sun" label="星期日" align="center">
              <template #default="scope">
                <h4>{{ scope.row.sun.lessonName }}</h4>
                <div v-html="scope.row.sun.place"></div>
              </template>
            </el-table-column>
          </el-table>
      </el-card>
    </template>
    <script>
    import api from "../../api/index.js"
    export default {
      data () {
        return {
          options:[
              {
                  value: 1,
                  label: 1,
                },
                {
                  value: 2,
                  label: 2,
                },
                {
                  value: 3,
                  label: 3,
                },
                {
                  value: 4,
                  label: 4,
                },
                {
                  value: 5,
                  label: 5,
                },
                {
                    value: 6,
                    label: 6,
                  },
                  {
                    value: 7,
                    label: 7,
                  },
                  {
                    value: 8,
                    label: 8,
                  },
                  {
                    value: 9,
                    label: 9,
                  },
                  {
                    value: 10,
                    label: 10,
                  },
                  {
                      value: 11,
                      label: 11,
                    },
                    {
                      value: 12,
                      label: 12,
                    },
                    {
                      value: 13,
                      label: 13,
                    },
                    {
                      value: 14,
                      label: 14,
                    },
                    {
                      value: 15,
                      label: 15,
                    },
                    {
                        value: 16,
                        label: 16,
                      },
                      {
                        value: 17,
                        label: 17,
                      },
                      {
                        value: 18,
                        label: 18,
                      },
                      {
                        value: 19,
                        label: 19,
                      },
                      {
                        value: 20,
                        label: 20,
                      },
          ],
          value: '',
          length:11,
          afternoonLength:4,
          timetable: [],
          events: [],
          hoverOrderArr: [],
          weeks: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
          initTable:[],
          temp: [null,null,null,null,null,null,null],
        }
      },
      mounted () {
          let data={
              params:{
                  studentId:this.$store.state.login_data.userSpecialInfo.studentInfo.studentId,
                  currentWeek:1,
              }
          };
          api.getLessonInfo(data).then(res=>{
                  this.events=res.data.data;
                this.mergeData();
          });
          
          
        
      },
      // watch: {
      //   events: {
      //     handler (newVal, oldVal) {
      //       this.mergeData()
      //     },
      //     deep: true
      //   }
      // },
      created () {
        this.makeTimetable()
        this.initTable=this.timetable;
      },
      methods: {
          changeValue(val){
              console.log(val);
              let data1={
                  params:{
                      studentId:this.$store.state.login_data.userSpecialInfo.studentInfo.studentId,
                      currentWeek:val,
                  }
              };
              api.getLessonInfo(data1).then(res=>{
                    this.events=res.data.data;
                    this.makeTimetable();
                    this.mergeData();
                      
              });
          },
        // 单元格添加背景色
        tableCellStyle ({ row, column, rowIndex, columnIndex } ) {
            if (row[column.property].lessonName !== undefined) {
                return {"background-color":"rgb(24 144 255 / 80%)","color": "#fff","border-radius":"10px"}
            }
        },
        // 构造课程表完整数据
        makeTimetable () {
          this.timetable = []
          for (let i = 0; i < this.length; i++) {
            let one = {
              sjd: '',
              jc: i + 1,
              mon: {},
              tue: {},
              wed: {},
              thu: {},
              fri: {},
              sat: {},
              sun: {}
            }
            if (i < 4) {
              one.sjd = '上午'
            } else if (i > 3 && i < (this.afternoonLength + 4)) {
              one.sjd = '下午'
            } else {
              one.sjd = '晚上'
            }
            this.timetable.push(one)
          }
        },
        mergeData(){
    
           console.log(this.events);
          
          // 合并数据
          if (this.events.length > 0) {
            for (let i = 0; i < this.events.length; i++) {
              // 获取星期几
              let week = this.weeks[this.events[i].week - 1]
              this.timetable[this.events[i].start - 1][week] = this.events[i]
            }
          }
        },
        objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
          if (columnIndex === 0) {
            if (rowIndex < 4) {
              if (rowIndex === 0) {
                return {
                  rowspan: 4,
                  colspan: 1
                }
              } else {
                return {
                  rowspan: 0,
                  colspan: 0
                }
              }
            } else if (rowIndex > 3 && rowIndex < (4 + this.afternoonLength)) {
              if (rowIndex === 4) {
                return {
                  rowspan: this.afternoonLength,
                  colspan: 1
                }
              } else {
                return {
                  rowspan: 0,
                  colspan: 0
                }
              }
            } else {
              if (rowIndex === (4 + this.afternoonLength)) {
                return {
                  rowspan: this.length - 4 - this.afternoonLength,
                  colspan: 1
                }
              } else {
                return {
                  rowspan: 0,
                  colspan: 0
                }
              }
            }
          }
          if (columnIndex === 2) {
            if (row.mon.lessonName !== undefined) {
                this.temp[0]=row.mon;
              return {
                rowspan: row.mon.end - row.mon.start + 1,
                colspan: 1
              }
            } else {
              if(this.temp[0]==null){
                  return {
                    rowspan: 1,
                    colspan: 1,
                  }
              }
              if(rowIndex>=this.temp[0].start&&rowIndex<this.temp[0].end){
                  if(rowIndex==this.temp[0].end-1){
                      this.temp[0]=null;
                  }
                  return{
                      rowspan: 0,
                      colspan: 0,
                  }
              }else{
                  this.temp[0]=null;
                  return {
                    rowspan: 1,
                    colspan: 1,
                  }
              }
    
            }
          }
          if (columnIndex === 3) {
    
            if (row.tue.lessonName !== undefined) {
                this.temp[1]=row.tue;
              return {
                rowspan: row.tue.end - row.tue.start + 1,
                colspan: 1
              }
            } else {
                
                
              if(this.temp[1]==null){
                  return {
                    rowspan: 1,
                    colspan: 1,
                  }
              }
              if(rowIndex>=this.temp[1].start&&rowIndex<this.temp[1].end){
                  if(rowIndex==this.temp[1].end-1){
                      this.temp[1]=null;
                  }
                  return{
                      rowspan: 0,
                      colspan: 0,
                  }
              }else{
                  this.temp[1]=null;
                  return {
                    rowspan: 1,
                    colspan: 1,
                  }
              }
    
            }
          }
          if (columnIndex === 4) {
            if (row.wed.lessonName !== undefined) {
                this.temp[2]=row.wed;
              return {
                rowspan: row.wed.end - row.wed.start + 1,
                colspan: 1
              }
            } else {
              if(this.temp[2]==null){
                  return {
                    rowspan: 1,
                    colspan: 1,
                  }
              }
              if(rowIndex>=this.temp[2].start&&rowIndex<this.temp[2].end){
                  if(rowIndex==this.temp[2].end-1){
                      this.temp[2]=null;
                  }
                  return{
                      rowspan: 0,
                      colspan: 0,
                  }
              }else{
                  this.temp[2]=null;
                  return {
                    rowspan: 1,
                    colspan: 1,
                  }
              }
            
            }
          }
          if (columnIndex === 5) {
            if (row.thu.lessonName !== undefined) {
                this.temp[3]=row.thu;
              return {
                rowspan: row.thu.end - row.thu.start + 1,
                colspan: 1
              }
            } else {
              if(this.temp[3]==null){
                  return {
                    rowspan: 1,
                    colspan: 1,
                  }
              }
              if(rowIndex>=this.temp[3].start&&rowIndex<this.temp[3].end){
                  if(rowIndex==this.temp[3].end-1){
                      this.temp[3]=null;
                  }
                  return{
                      rowspan: 0,
                      colspan: 0,
                  }
              }else{
                  this.temp[3]=null;
                  return {
                    rowspan: 1,
                    colspan: 1,
                  }
              }
            
            }
          }
          if (columnIndex === 6) {
            if (row.fri.lessonName !== undefined) {
                this.temp[4]=row.fri;
              return {
                rowspan: row.fri.end - row.fri.start + 1,
                colspan: 1
              }
            } else {
              if(this.temp[4]==null){
                  return {
                    rowspan: 1,
                    colspan: 1,
                  }
              }
              if(rowIndex>=this.temp[4].start&&rowIndex<this.temp[4].end){
                  if(rowIndex==this.temp[4].end-1){
                      this.temp[4]=null;
                  }
                  return{
                      rowspan: 0,
                      colspan: 0,
                  }
              }else{
                  this.temp[4]=null;
                  return {
                    rowspan: 1,
                    colspan: 1,
                  }
              }
            
            }
          }
          if (columnIndex === 7) {
            if (row.sat.lessonName !== undefined) {
                this.temp[5]=row.sat;
              return {
                rowspan: row.sat.end - row.sat.start + 1,
                colspan: 1
              }
            } else {
              if(this.temp[5]==null){
                  return {
                    rowspan: 1,
                    colspan: 1,
                  }
              }
              if(rowIndex>=this.temp[5].start&&rowIndex<this.temp[5].end){
                  if(rowIndex==this.temp[5].end-1){
                      this.temp[5]=null;
                  }
                  return{
                      rowspan: 0,
                      colspan: 0,
                  }
              }else{
                  this.temp[5]=null;
                  return {
                    rowspan: 1,
                    colspan: 1,
                  }
              }
            
            }
          }
          if (columnIndex === 8) {
            if (row.sun.lessonName !== undefined) {
                this.temp[6]=row.sun;
              return {
                rowspan: row.sun.end - row.sun.start + 1,
                colspan: 1
              }
            } else {
              if(this.temp[6]==null){
                  return {
                    rowspan: 1,
                    colspan: 1,
                  }
              }
              if(rowIndex>=this.temp[6].start&&rowIndex<this.temp[6].end){
    
                  if(rowIndex==this.temp[6].end-1){
                      this.temp[6]=null;
                  }
                  return{
                      rowspan: 0,
                      colspan: 0,
                  }
              }else{
                  this.temp[6]=null;
                  return {
                    rowspan: 1,
                    colspan: 1,
                  }
              }
    
            }
          }
        }
      }
    }
    </script>
    
    
    <style scoped>
        .box-card{
            display: flex;
            height: 90%;
            width: 98%;
            position: absolute;
            right: 1%;
            bottom: 6%;
            flex-direction: column;
            align-items:flex-end;
        }
        .box-card /deep/ .el-card__body{
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            margin: 0px;
            border: 0px;
            padding: 0px;
        }
        .el-select {
            width: 50px;
            }
    </style>