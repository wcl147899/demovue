<template>
<div id="outline">
    <div id="main"></div>
    <el-button type="primary" @click="changeOption">按钮</el-button>
</div>
</template>
<script>
import * as echarts from 'echarts';
export default {
    data(){
        return {
            option:{
                title: {text: 'ECharts 入门示例'},
                tooltip: {},
                legend: {},
                dataset:{
                    dimensions:['product','2015','2016','2017'],
                    source:[
                        { product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
                        { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
                        { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
                        { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
                    ]
                },
                xAxis: {type:'category'},
                yAxis: {},
                series: [{type:'bar'},{type:'bar'},{type:'bar'}]
            }
        }
    },
    mounted(){
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(this.option);
    window.onresize = function() {//当浏览器窗口被调整大小时，执行resize（）函数
        myChart.resize();
    };
    },
    methods: {
     changeOption(){
                this.option={
                title: {text: 'ECharts2 入门示例'},
                tooltip: {},
                legend: {},
                dataset:{
                    dimensions:['product','2015','2016','2017'],
                    source:[
                        { product: 'Matcha Latte', '2015': 100.3, '2016': 100.8, '2017': 100.7 },
                        { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
                        { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
                        { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
                    ]
                },
                xAxis: {type:'category'},
                yAxis: {},
                series: [{type:'bar'},{type:'bar'},{type:'bar'}]
            }  
        }
    },
    watch:{
        option:function(){
             var myChart = echarts.init(document.getElementById('main'));
             myChart.setOption(this.option);
        }
    }
}
</script>
<style scoped>
#main{
    width: 100%;
    height: 400px;
    background-color: red;
}
</style>