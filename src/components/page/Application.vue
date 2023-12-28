<template>
    <div class="application-details">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>公司信息</span>
                    </div>
                    <el-form label-position="left" label-width="100px">
                        <el-form-item label="公司名称">
                            <span>{{ company.name }}</span>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <span>{{ company.contact }}</span>
                            <el-button icon="el-icon-message" @click="onContactIconClick" type="text"
                                style="cursor: pointer; margin-left: 8px;"></el-button>
                        </el-form-item>
                        <el-form-item label="公司地址">
                            <span>{{ company.address }}</span>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>申请详情</span>
                    </div>
                    <el-form label-position="left" label-width="100px">
                        <el-form-item label="申请日期">
                            <span>{{ application.date }}</span>
                        </el-form-item>
                        <el-form-item label="工作进度">
                            <el-progress :percentage="application.progress"></el-progress>
                        </el-form-item>
                        <el-form-item label="申请内容">
                            <span>{{ application.content }}</span>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>培训计划</span>
                        <el-button icon="el-icon-s-promotion" style="float: right; padding: 3px 0" type="text"
                            @click=handleClick>发布培训通知</el-button>
                    </div>
                    <el-form label-position="left" label-width="100px">
                        <el-form-item label="聘请讲师">
                            <el-button type="text" @click="showLecturerDialog = true">{{ selectedLecturerName }}</el-button>
                        </el-form-item>
                        <el-dialog :visible.sync="showLecturerDialog" title="选择讲师" width="60%">
                            <el-table :data="lecturerList" style="width: 100%" highlight-current-row
                                @current-change="handleCurrentRowChange">
                                <el-table-column prop="id" label="讲师ID" width="80"></el-table-column>
                                <el-table-column prop="name" label="姓名"></el-table-column>
                                <el-table-column prop="course" label="教学课程"></el-table-column>
                                <el-table-column prop="contact" label="联系方式"></el-table-column>
                            </el-table>

                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                :current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper" :total="totalLecturers">
                            </el-pagination>

                            <span slot="footer" class="dialog-footer">
                                <el-button @click="showLecturerDialog = false">取消</el-button>
                                <el-button type="primary" @click="showLecturerDialog = false">确认</el-button>
                            </span>
                        </el-dialog>

                        <el-form-item label="教授的课程">
                            <span>{{ course.name }}</span>
                            <p>{{ course.description }}</p>
                        </el-form-item>
                        <el-form-item label="执行人员">
                            <el-button type="text" @click="showExecutorDialog = true">{{ selectedExecutorName }}</el-button>
                        </el-form-item>
                        <el-dialog :visible.sync="showExecutorDialog" title="选择执行人">
                            <el-select v-model="selectedExecutor">
                                <el-option v-for="executor in executors" :key="executor.id" :label="executor.name"
                                    :value="executor.name">
                                </el-option>
                            </el-select>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="showExecutorDialog = false">取消</el-button>
                                <el-button type="primary" @click="confirmExecutorSelection">确认</el-button>
                            </span>
                        </el-dialog>
                        <el-form-item label="计划具体步骤">
                            <el-steps :active="active" finish-status="success" align-center>
                                <el-step title="更新讲师资料" description=""></el-step>
                                <el-step title="确定培训课程" description=""></el-step>
                                <el-step title="发布培训通知" description=""></el-step>
                                <el-step title="确认学员名单" description=""></el-step>
                                <el-step title="调查培训情况" description=""></el-step>

                            </el-steps>
                            <el-button style="margin-top: 12px;" @click="next">下一步</el-button>

                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>

export default {
    created() {
        console.log('Lecturers:', this.lecturers);
        console.log('Steps:', this.steps);
    },
    methods: {
        handleClick() {
            this,this.$router.push({path: '/markdown'})
        },
        handleCurrentRowChange(row, column, event) {
            this.selectedLecturer = row;
        },
        onContactIconClick() {
            console.log('联系方式图标被点击');
        },
        updateExecutorName(executor) {
            this.selectedExecutor = executor;
        },

        next() {
            if (this.active++ > 4) this.active = 0;
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.fetchLecturerData();
        },
        // 改变当前页
        handleCurrentChange(val) {
            this.currentPage = val;
            this.fetchLecturerData();
        },
        confirmLecturerSelection() {

            this.showLecturerDialog = false;
        },
        confirmExecutorSelection() {
            if (this.selectedExecutor) {
                this.selectedExecutorName = this.selectedExecutor;
                // 执行其他所需的操作，比如更新表单数据等
            }
            this.showExecutorDialog = false;
        },

    },
    data() {
        return {
            active: 0,

            company: {
                name: '阿外巴巴',
                contact: 'rasd2023@foxmail.com',
                address: '西大直街92号圣马家沟男子职业技术学院'
            },
            application: {
                date: '2023-12-20',
                progress: 75, // 这是一个百分比值
                content: 'Vue.js教学'
            },
            showLecturerDialog: false,
            showExecutorDialog: false,

            selectedLecturer: null,
            selectedLecturerName: '请选择讲师',
            selectedExecutor: '',
            selectedExecutorName: '请选择执行人',

            executors: [
                { id: 'executor1', name: '执行人 A' },
                { id: 'executor2', name: '执行人 B' },
                // ...更多讲师...
            ],
            course: {
                name: 'Vue.js教学',
                description: '是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。'
            },
            checkedSteps: [],
            currentPage: 1,
            pageSize: 5,
            totalLecturers: 5,
            lecturerList: [
                { id: '114514', name: '马芸' },
                { id: '114515', name: '马桦藤' },
                { id: '114516', name: '贾玥婷' },
                { id: '114517', name: '罗泳昊' },
                { id: '114518', name: '马斯克' },


                // ...更多讲师...
            ],
        };
    },
    watch: {
        selectedLecturer(newVal, oldVal) {
            if (newVal) {
                this.selectedLecturerName = newVal.name;
            }
        }
    },
    // ...其他选项...
}
</script>

<style scoped>
.box-card {
    margin-bottom: 20px;
}
</style>

