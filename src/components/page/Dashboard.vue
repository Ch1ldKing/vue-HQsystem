<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{ name }}</div>
                            <div>{{ role }}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录Time：
                        <span>2023-12-29</span>
                    </div>
                    <div class="user-info-list">
                        上次登录Site：
                        <span>哈尔滨</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="todo-item" :class="{ 'todo-item-del': scope.row.status }">{{ scope.row.title }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" @click.native="onSigninClick()" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-roundcheck grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">签到</div>
                                    <div>课前打卡</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" @click.native="onEnrollClick()" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-document-add grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">报名</div>
                                    <div>选择课程</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" @click.native="onCommentClick()" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-comment grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">评价</div>
                                    <div>提出意见</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>课程安排</span>

                    </div>
                    <span>
                        当前,第
                        <el-select @change="changeValue" v-model="value" placeholder="1" class="m-2" size="small">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                        周
                    </span>
                    <el-divider />
                    <el-table :data="timetable" :span-method="objectSpanMethod" border
                        :header-cell-style="{ background: '#d9e5fd', color: 'black', fontWeight: 1000 }"
                        :cell-style="tableCellStyle" style="overflow-x:hidden">
                        <el-table-column prop="sjd" label="时间段" width="120" align="center">
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

                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card class="course-table-card">
                    <el-table :data="courseData" stripe style="width: 100%">
                        <el-table-column prop="courseName" label="课程名称" width="180"></el-table-column>
                        <el-table-column prop="instructor" label="授课教师" width="180"></el-table-column>
                        <el-table-column prop="description" label="课程简介"></el-table-column>
                        <el-table-column prop="attendanceRate" label="签到率" width="100"></el-table-column>
                        <el-table-column prop="score" label="分数" width="100"></el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'dashboard',
    data() {
        return {
            courseData: [
                // 示例数据
                { courseName: "JavaEE", instructor: "马芸", description: "JavaEE狗都不学", attendanceRate: "95%", score: 88 },
                { courseName: "MySQL", instructor: "马桦藤", description: "MySQL，认准最垃圾的数据库", attendanceRate: "90%", score: 92 },
                { courseName: "Vue.js", instructor: "贾玥婷", description: "Vue.js，很好的框架，爱来自中国", attendanceRate: "93%", score: 85 },
                { courseName: "React.js", instructor: "罗泳昊", description: "React框架基础与应用", attendanceRate: "88%", score: 90 },
                { courseName: "Go", instructor: "马斯克", description: "Go语言基础，唯一真神", attendanceRate: "96%", score: 95 }
            ],
            options: [
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
            length: 2,
            afternoonLength: 4,
            timetable: [],
            events: [],
            weeks: ['mon', 'tue', 'wed', 'thu', 'fri'],
            initTable: [],
            temp: [null, null, null, null, null],
            name: localStorage.getItem('ms_username'),
            courseSchedule: {
                '周一': { course: 'Go' },
                '周二': { course: 'JavaEE' },
                '周三': { course: 'MySQL' },
                '周四': { course: 'Vue.js' },
                '周五': { course: 'React.js' }
            },
            todoList: [
                {
                    title: '今天要画完系统用例图',
                    status: false
                },
                {
                    title: '今天要画完设计类图',
                    status: false
                },
                {
                    title: '今天要完成HQ系统开发',
                    status: true
                },
                {
                    title: '今天要亖了',
                    status: false
                },


            ],

        };
    },

    computed: {
        role() {
            return "同学，你好"
        }
    },
    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    mounted() {
        this.initializeMockData(); // 使用模拟数据初始化
        this.mergeData();
    },
    created() {
        this.makeTimetable();
        this.initTable = this.timetable;
    },
    methods: {
        onSigninClick() {
            console.log('Card was clicked!');
            this.$message.success('签到成功！');
        },
        onEnrollClick() {
            console.log('Card was clicked!');
            this, this.$router.push({ path: '/enroll' })
        },
        onCommentClick() {
            console.log('Card was clicked!');
            this, this.$router.push({ path: '/comment' })
        },
        // changeDate() {
        //     const now = new Date().getTime();
        //     this.data.forEach((item, index) => {
        //         const date = new Date(now - (6 - index) * 86400000);
        //         item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        //     });
        // },
        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
        changeValue(val) {
            console.log(val);
            this.value = val;
            this.loadCourseDataForWeek(val);
            // this.initializeMockData(); // 重新初始化模拟数据
            // this.makeTimetable();
            // this.mergeData();
        },
        loadCourseDataForWeek(weekNumber) {
            // 根据选择的周数生成或获取课程数据
            // 这里使用模拟数据作为示例
            this.events = this.generateMockDataForWeek(weekNumber);

            // 重新构建课程表视图
            this.makeTimetable();
            this.mergeData();
        },
        generateMockDataForWeek(weekNumber) {
            // 根据周数返回不同的模拟数据
            // 这里需要根据实际情况编写逻辑
            if (weekNumber === 1) {
                return [
                    { week: 1, start: 1, end: 1, lessonName: 'JavaEE', place: 'A101', mon: {} },
                    { week: 1, start: 2, end: 2, lessonName: 'Vue', place: 'B201', tue: {} },
                    { week: 1, start: 2, end: 2, lessonName: 'Go', place: 'B201', thu: {} },


                    // ...其他课程数据
                ];
            } else if (weekNumber === 2) {
                return [
                    { week: 2, start: 1, end: 1, lessonName: 'Vue', place: 'B201', tue: {} },
                    { week: 2, start: 2, end: 2, lessonName: 'React', place: 'B201', fri: {} },

                    // ...其他课程数据
                ];
            }
            else if (weekNumber === 3) {
                return [
                    { week: 3, start: 1, end: 1, lessonName: 'Vue', place: 'B201', tue: {} },
                    { week: 3, start: 1, end: 1, lessonName: 'MySQL', place: 'B201', thu: {} },

                    // ...其他课程数据
                ];
            }
            // ...根据需要添加更多周数的数据
        },
        initializeMockData() {
            // 示例模拟数据
            this.events = [
                { week: 1, start: 1, end: 1, lessonName: 'JavaEE', place: 'A101', mon: {} },
                { week: 1, start: 2, end: 2, lessonName: 'Vue', place: 'B201', tue: {} },
                { week: 1, start: 2, end: 2, lessonName: 'Go', place: 'B201', thu: {} },

                // ...更多模拟数据
            ];
        },
        // 单元格添加背景色
        tableCellStyle({ row, column, rowIndex, columnIndex }) {
            if (column.property && row[column.property].lessonName !== undefined) {
                const lessonName = row[column.property].lessonName;
                let backgroundColor = 'white'; // 默认背景色
                switch (lessonName) {
                    case 'JavaEE':
                        backgroundColor = 'rgb(255,88,88)'; // 例如，红色
                        break;
                    case 'React':
                        backgroundColor = 'rgb(245,166,35)'; // 例如，蓝色
                        break;
                    case 'Vue':
                        backgroundColor = 'rgb(42,199,102)'; // 例如，绿色
                        break;
                    case 'MySQL':
                        backgroundColor = 'rgb(74,144,226)'; // 例如，橙色
                        break;
                    case 'Go':
                        backgroundColor = 'rgb(94,100,255)'; // 例如，紫色
                        break;
                    default:
                        backgroundColor = 'white'; // 未知课程或其他情况
                }
                return {
                    'background-color': backgroundColor,
                    'color': '#fff',
                    'border-radius': '10px'
                };
            }
        },
        // 构造课程表完整数据
        makeTimetable() {
            this.timetable = []
            for (let i = 0; i < this.length; i++) {
                let one = {
                    sjd: i === 0 ? '上午' : (i === 1 ? '下午' : '晚上'),
                    mon: {},
                    tue: {},
                    wed: {},
                    thu: {},
                    fri: {}
                };
                this.timetable.push(one);
            }
        },
        mergeData() {

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
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {

            if (columnIndex >= 2 && row[this.weeks[columnIndex - 2]].lessonName !== undefined) {
                return {
                    rowspan: 1,
                    colspan: 1
                };
            }
            return {
                rowspan: 1,
                colspan: 1
            };
        }

    }
};
</script>


<style scoped>
.course-table {
    width: 100%;
    text-align: center;
}


.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 20px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;

}

.todo-item-del {
    text-decoration: line-through;
    color: #999;

}

.schart {
    width: 100%;
    height: 300px;
}

.el-select {
    width: 60px;
}
</style>
