<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-document-add"></i> 学员报名
                </el-breadcrumb-item>
                
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="姓名" >
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
                    <el-form-item label="公司名称">
                        <el-input v-model="form.companyName"></el-input>
                    </el-form-item>
                    <el-form-item label="工作岗位">
                        <el-input v-model="form.jobPosition"></el-input>
                    </el-form-item>
                    <el-row :gutter="20">
                        <el-col :span="12">

                            <el-form-item label="技术水平">
                                <el-select v-model="form.skillLevel" placeholder="请选择">
                                    <el-option v-for="level in skillLevels" :key="level.value" :label="level.label" :value="level.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">

                            <el-form-item label="报名课程">
                                <el-select v-model="form.skillLevel" placeholder="请选择">
                                    <el-option v-for="level in skillLevels" :key="level.value" :label="level.label" :value="level.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="联系方式">
                        <el-input v-model="form.contact"></el-input>
                    </el-form-item>
                    <el-form-item label="其他事项">
                        <el-input type="textarea" v-model="form.otherMatters"></el-input>
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
    name: 'baseform',
    data() {
        return {
            skillLevels: [
                { value: 'junior', label: '初级' },
                { value: 'mid', label: '中级' },
                { value: 'senior', label: '高级' },
                { value: 'expert', label: '专家' }
            ],
            form: {
                // ... 其他表单字段 ...
                skillLevel: '',
                // ... 其他表单字段 ...
            }
    }
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