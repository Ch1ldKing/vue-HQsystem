<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-document-add"></i> 培训情况调查
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="学员姓名">
                                <el-input v-model="form.name" style="width: 200px;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性别">
                                <el-radio-group v-model="form.gender">
                                    <el-radio label="男">男</el-radio>
                                    <el-radio label="女">女</el-radio>
                                    <el-radio label="其他">其他</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="学生ID">
                        <el-input v-model="form.studentId"></el-input>
                    </el-form-item>
                    
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="讲师姓名" >
                                <el-input v-model="form.instructorName" style="width: 200px;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所选课程">
                                <el-select v-model="form.selectedCourse" placeholder="请选择">
                                    <el-option label="JavaEE" value="JavaEE"></el-option>
                                    <el-option label="MySQL" value="MySQL"></el-option>
                                    <el-option label="Vue.js" value="Vue.js"></el-option>
                                    <el-option label="React.js" value="React.js"></el-option>
                                    <el-option label="Go" value="Go"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                
                    <el-form-item label="培训满意度">
                        <el-radio-group v-model="form.satisfaction">
                            <el-radio label="非常满意">非常满意</el-radio>
                            <el-radio label="满意">满意</el-radio>
                            <el-radio label="一般">一般</el-radio>
                            <el-radio label="不满意">不满意</el-radio>
                            <el-radio label="非常不满意">非常不满意</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="意见和建议">
                        <el-input type="textarea" v-model="form.suggestions"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="Cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TrainingSurveyForm',
    data() {
        return {
            form: {
                name: '',
                gender: '',
                studentId: '',
                selectedCourse: '',
                instructorName: '',
                satisfaction: '',
                suggestions: ''
            }
        };
    },
    methods: {
        onSubmit() {
            this.$message.success('提交成功！');
        },
        Cancel(){
            this,this.$router.push({path: '/dashboard'})
        }
    }
};
</script>
