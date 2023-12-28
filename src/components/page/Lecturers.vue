<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 讲师信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10"
                    @click="delAllSelection">批量删除</el-button>
                <el-select v-model="query.course" placeholder="教授课程" class="handle-select mr10">
                    <el-option key="1" label="Vue.js" value="Vue.js"></el-option>
                    <el-option key="2" label="React.js" value="React.js"></el-option>
                    <el-option key="3" label="JavaEE" value="JavaEE"></el-option>
                    <el-option key="4" label="MySQL" value="MySQL"></el-option>
                    <el-option key="5" label="Go" value="Go"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="姓名搜索" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-upload" @click="showUploadDialog = true">导入文件</el-button>
                <el-dialog title="导入文件" :visible.sync="showUploadDialog" width="31%" :before-close="handleClose">
                    <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false" :on-success="handleUploadSuccess" multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传Excel文件，且不超过1Mb</div>
                    </el-upload>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="showUploadDialog = false">确定</el-button>
                        <el-button @click="showUploadDialog = false">取消</el-button>
                    </span>
                </el-dialog>
            </div>

            <el-table :data="tableData" border height="800px" class="table" ref="multipleTable" header-cell-class-name="table-header"
                @selection-change="handleSelectionChange">
                <el-table-column  type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="讲师ID" width="100" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
                <el-table-column prop="course" label="教授课程" width="100" align="center"></el-table-column>
                <el-table-column prop="contact" label="联系方式" width="250" align="center"></el-table-column>
                <el-table-column prop="age" label="年龄" width="90" align="center"></el-table-column>
                <el-table-column prop="gender" label="性别" width="90" align="center"></el-table-column>
                <el-table-column prop="salary" label="薪酬" width="80" align="center"></el-table-column>
                <el-table-column prop="appointmentDate" label="上任时间" width="100" align="center"></el-table-column>

                <el-table-column fixed="right" label="操作" width="181" align="center">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-message" @click="onContactIconClick" type="text">联系</el-button>
                        <el-button type="text" icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="教授课程">
                    <el-input v-model="form.course"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="form.contact"></el-input>
                </el-form-item>
                <el-form-item label="薪水">
                    <el-input v-model="form.salary"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            showUploadDialog: false,
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        handleUploadSuccess(response, file, fileList) {
            // 处理文件上传成功的逻辑
            this.$message.success('文件上传成功');

        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        // 获取 easy-mock 的模拟数据

        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => { });
        },
        onContactIconClick() {

        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #ff0000;
}

.mr10 {
    margin-right: 10px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
