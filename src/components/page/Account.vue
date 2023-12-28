<template>
    <div class="form-container">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="用户名" prop="username" :show-required="false">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电子邮件">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="用户 ID">
                <el-input :placeholder="ruleForm.userId" v-model="input" :disabled="true">
                </el-input>
            </el-form-item>
            <el-form-item label="用户头像">
                <el-upload class="upload-demo" drag action="http://jsonplaceholder.typicode.com/api/posts/" multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>
  
<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                pass: '123456',
                checkPass: '123456',
                userId: '2237101', // 假定的用户 ID
                avatar: '', // 用户头像 URL
                username: localStorage.getItem('ms_username'), // 用户名
                email: 'childking0909@gmail.com', // 电子邮件
                phone: '15048889999', // 手机号
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
                pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('提交成功!');
                } else {
                    console.log('表单验证失败');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }

}

</script>
  
   
<style>
.form-container {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    max-width: 800px;
    /* 或您想要的任何宽度 */
    margin: 0 auto;
    /* 水平居中 */
    padding: 20px;
    /* 可选，为了有一些内边距 */
}
.form-item {
    width: 50%;
    /* 设置表单项的宽度 */
    margin: auto;
    /* 使表单项居中 */
}

.input-short {
    width: 100%;
    /* 设置输入框的宽度 */
}
</style>

  