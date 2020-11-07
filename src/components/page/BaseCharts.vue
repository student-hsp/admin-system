<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-pie-chart"></i> 周报
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-radio-group v-model="typea" size="medium">
                <el-radio-button label="柱状图" ></el-radio-button>
                <el-radio-button label="折线图"></el-radio-button>
                <el-radio-button label="环形图"></el-radio-button>
                <el-radio-button label="饼状图"></el-radio-button>
            </el-radio-group>
            <div class="schart-box">
                <schart class="schart" canvasId="bar" :options="options1"></schart>
            </div>
        </div>
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
            typea: '柱状图',
            options1: {
                type: 'bar',
                title: {
                    text: '最近一周各品类销售图'
                },
                bgColor: '#fff',
                labels: ['周一', '周二', '周三', '周四', '周五'],
                datasets: [
                    {
                        label: '家电',
                        fillColor: 'rgba(241, 49, 74, 0.5)',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 190, 135, 160]
                    },
                    {
                        label: '食品',
                        data: [144, 198, 150, 235, 120]
                    }
                ]
            }
        };
    },
    watch: {
        typea(newValue, oldValue){
            switch (newValue) {
                case '柱状图':
                    this.options1.type = 'bar'
                    break;
                case '折线图':
                    this.options1.type = 'line'
                    break;
                case '饼状图':
                    this.options1.type = 'pie'
                    break;
                case '环形图':
                    this.options1.type = 'ring'
                    break;
            }
        }
    }
};
</script>

<style scoped>
.schart-box {
    display: block;
    margin: 0 auto;
    margin: 20px;
}
.schart {
    width: 100%;
    height: 400px;
}
</style>
