<template>
    
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i>培训申请
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="tableData" border style="width: 100%" class="centered-table" align="center">
            <el-table-column fixed prop="date" label="申请日期" width="150" align="center" sortable>
            </el-table-column>
            <el-table-column prop="name" label="公司名称" width="120" align="center">
            </el-table-column>
            <el-table-column prop="province" label="省份" width="120" align="center">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="250" align="center">
            </el-table-column>
            <el-table-column prop="contact" label="联系方式" width="150" align="center">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100" align="center" :filters="statusFilters"
                :filter-method="statusFilterMethod">
                <template slot-scope="scope">
                    <el-tag :type="getTagType(scope.row.status)" size="small">
                        {{ scope.row.status }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">
                    <el-button icon="el-icon-lx-attention" @click="handleClick(scope.row)" type="text"  
                        >查看详情</el-button>

                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    methods: {
        handleClick(row) {
            console.log('跳转数据',row);
            this,this.$router.push({path: '/application'})
            //this.$router.push({ path: '/application', query: { name: row.name, date: row.date, contact: row.contact, province: row, province, address: row.address }, }).catch(err => console.log('路由跳转错误:', err));
        },
        dateFilterMethod(value, row) {
            return row.date === value;
        },
        statusFilterMethod(value, row) {
            return row.status === value; // 假设每行数据有一个 'status' 属性
        },
        getTagType(status) {
            switch (status) {
                case '待审核':
                    return 'info';
                case '执行中':
                    return 'primary';
                case '已完成':
                    return 'success';
                case '已驳回':
                    return 'danger';
                default:
                    return '';
            }
        },
    },

    data() {
        return {
            tableData: [{
                date: '2023-12-20',
                name: '阿外巴巴',
                province: '哈尔滨',
                contact: 'rasd2023@foxmail.com',
                city: '南岗区',
                address: '西大直街92号圣马家沟职业技术学院',
                status: '已完成',
                zip: 110000
            }, {
                date: '2023-12-21',
                name: '京西',
                province: '哈尔滨',
                city: '南岗区',
                contact: 'rasd2023@foxmail.com',
                status: '执行中',
                address: '西大直街92号圣马家沟职业技术学院',
                zip: 110000
            }, {
                date: '2023-12-22',
                name: '比特跳动',
                province: '哈尔滨',
                city: '南岗区',
                status: '已驳回',
                contact: 'rasd2023@foxmail.com',
                address: '西大直街92号圣马家沟职业技术学院',
                zip: 110000
            }, {
                date: '2023-12-23',
                name: '网难',
                province: '哈尔滨',
                contact: 'rasd2023@foxmail.com',
                status: '待审核',
                city: '南岗区',
                address: '西大直街92号圣马家沟职业技术学院',
                zip: 110000
            }, {
                date: '2023-12-21',
                name: '大米',
                province: '哈尔滨',
                city: '南岗区',
                contact: 'rasd2023@foxmail.com',
                status: '执行中',
                address: '西大直街92号圣马家沟职业技术学院',
                zip: 110000
            }, {
                date: '2023-12-21',
                name: '京南',
                province: '哈尔滨',
                city: '南岗区',
                contact: 'rasd2023@foxmail.com',
                status: '执行中',
                address: '西大直街92号圣马家沟职业技术学院',
                zip: 110000
            }],
            statusFilters: [
                { text: '待审核', value: '待审核' },
                { text: '执行中', value: '执行中' },
                { text: '已完成', value: '已完成' },
                { text: '已驳回', value: '已驳回' },
            ]
        }

    }
}

</script>

<style>
.centered-table {


    margin-top: 100px;
    max-width: 991px;
    /* 设置最大宽度 */
    margin: 0 auto;
    /* 水平居中 */
}
</style>
