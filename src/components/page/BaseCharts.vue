<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-pie-chart"></i> 报表汇总</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row class="chart-row" :gutter="20">
            <el-col :span="12" class="chart-col">
                <el-card shadow="always" class="card">
                    <schart class="schart" canvasId="bar" :options="options1"></schart>
                </el-card>
            </el-col>
            <div class="fixed-gap"></div>
            <el-col :span="12" class="chart-col">
                <el-card shadow="always" class="card">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="chart-row" :gutter="20">
            <el-col :span="12" class="chart-col">
                <el-card shadow="always" class="card">
                    <schart class="schart" canvasId="left" :options="options3"></schart>
                </el-card>
            </el-col>
            <div class="fixed-gap"></div>
            <el-col :span="12" class="chart-col">
                <el-card shadow="always" class="card">
                    <schart class="schart" canvasId="ring" :options="options4"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
export default {
    name: 'basecharts',
    components: {
        Schart
    },
    data() {
        return {
            options1: {
                type: 'bar',
                title: {
                    text: '上周学员签到率'
                },
                bgColor: '#ffffff',
                labels: ['周一', '周二', '周三', '周四', '周五'],
                    datasets: [
                        {
                            label: 'MySQL',
                            fillColor: 'rgb(74,144,226)',
                            data: [92, 86, 80, 77, 75]
                        },
                        {
                            label: 'React.js',
                            fillColor: 'rgb(245,166,35)',
                            data: [94, 88, 89, 86, 82]
                        },
                        {
                            label: 'JavaEE',
                            fillColor: 'rgb(255,88,88)',
                            data: [90, 86, 92, 97, 96]
                        },
                        {
                            label: 'Go',
                            fillColor: 'rgb(94,100,255)',
                            data: [86, 83, 83, 82, 80]
                        },
                        {
                            label: 'Vue.js',
                            fillColor: 'rgb(42,199,102)',
                            data: [92, 96, 98, 99, 100]
                        }
                    ]
                },
                options2: {
                    type: 'line',
                    title: {
                        text: '近期财政情况'
                    },
                    bgColor: '#ffffff',
                    labels: ['8月', '9月', '10月', '11月', '12月'],
                    datasets: [
                        {
                            label: '讲师薪资支出',
                            data: [34, 28, 27, 19, 23]
                        },
                        {
                            label: '学员缴费收入',
                            data: [40, 38, 50, 35, 47]
                        },
                        {
                            label: '软件公司佣金',
                            data: [50, 60, 45, 55, 40]
                        }
                    ]
                },
                options3: {
                    type: 'pie',
                    title: {
                        text: '学员报名课程比例'
                    },
                    legend: {
                        position: 'left'
                    },
                    bgColor: '#ffffff',
                    labels: ['MySQL', 'React.js', 'JavaEE', 'Go', 'Vue,js'],
                    datasets: [
                        {
                            data: [64, 27, 39, 91, 79]
                        }
                    ]
                },
                options4: {
                    type: 'ring',
                    title: {
                        text: '讲师好评率'
                    },
                    showValue: true,
                    legend: {
                        position: 'bottom',
                        bottom: 40
                    },
                    bgColor: '#ffffff',
                    labels: ['讲师1', '讲师2', '讲师3','讲师4','讲师5'],
                    datasets: [
                        {
                            data: [100,92,85,74,62]
                        }
                    ]
                }
            };
        }
    };
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.chart-col {
    /* 设置每个列的宽度 */
    width: calc(50% - 10px);
    /* 假设间距为20px，每侧10px */
}

.fixed-gap {
    width: 20px;
    /* 间距宽度 */
    flex: none;
    /* 防止flex布局影响宽度 */
}

.chart-row {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

.schart-box {
    display: inline-block;
    margin: 20px;
}

.schart {
    width: 600px;
    height: 400px;
}

.content-title {
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}

.el-row {
    margin-bottom: 20px;
}

.card {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    height: 450px;
    /* 或您期望的高度 */
    width: 650px;
    /* 或您期望的宽度 */
    /* 其他样式，如边框、背景色等 */
    margin: 0 auto;
}

@media (max-width: 768px) {
    .chart-col {
        width: 100%;
        /* 小屏幕上占满整个宽度 */
    }

    .fixed-gap {
        display: none;
        /* 小屏幕上移除间距 */
    }
}</style>