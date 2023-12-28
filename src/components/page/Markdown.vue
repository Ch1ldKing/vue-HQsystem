<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-promotion"></i> 发布培训通知</el-breadcrumb-item>
                
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips" >
                请撰写培训通知并发布至公司网站
            </div>
            <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px"/>
            <el-button class="editor-btn" type="primary" @click="submit">发布公司网站</el-button>
            <el-button class="editor-btn" type="primary" @click="submitEmail">发送邮件通知</el-button>
        </div>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: 'markdown',
        data: function(){
            return {
                content:'# 培训通知\n ## 这是一份 \n *Markdown*文件的培训通知，将自动转化为**HTML**文件 \n ___ \n $C_n^mB_y^d$我在速成`Vue.js`并独自一人完成~~RA&SD~~大作业挑战中\n获得了***3***天的好成绩\n### 你也来试试吧！' ,
                html:'',
                configs: {
                }
            }
        },
        components: {
            mavonEditor
        },
        methods: {
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file){
                var formdata = new FormData();
                formdata.append('file', $file);
                // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
                this.$axios({
                    url: '/common/upload',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((url) => {
                    this.$refs.md.$img2Url(pos, url);
                })
            },
            change(value, render){
                // render 为 markdown 解析后的结果
                this.html = render;
            },
            submit(){
                console.log(this.content);
                console.log(this.html);
                this.$message.success('发布成功！');
            },
            submitEmail(){
                console.log(this.content);
                console.log(this.html);
                this.$message.success('邮件发送成功！');
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
</style>