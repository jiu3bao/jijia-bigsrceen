
<template>
    <div class="link">
         <div class="cate-price">{{this.$store.state.chosedCate.name}}价格环比</div>
        <div class="huanbi">
            <div id="mains" style="width: 360px;height:300px;"></div>
        </div>
    </div>
</template>
<script>
// 材料环比组件
import echarts from 'echarts'
export default {
    name:"cate-price",
    props:{
        area_price_hb:{
            type: Array
        }
    },
    methods:{
        huanbi(){
            var myCharts = echarts.init(document.getElementById('mains'))
            var options = {
                title : {
                    text: '',
                    subtext: ''
                },
                tooltip : {
                    trigger: 'axis'
                },
                grid:{
                    x:'25%',
                    y:'10%',
                    x2:'10%',
                    y2:'10%',
                },
                legend: {
                    data:['意向','预购','成交'],
                    textStyle: {
                        fontSize: 12,
                        color: '#F1F1F3'
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日'],
                        axisLine:{
                                lineStyle:{
                                    color:'#F1F1F3',//修改字体颜色
                                    width:2
                                }
                            },
                    },

                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLine:{
                                lineStyle:{
                                    color:'#F1F1F3',
                                    width:2
                                }
                            },
                    }
                ],
                series : [
                    {
                        name:'成交',
                        type:'line',
                        smooth:true,
                        itemStyle: {
                            normal: {
                                areaStyle:{ 
                                type: 'default'
                                }
                        },
                        },
                        data:[10, 12, 21, 54, 260, 830, 710]
                    },
                    {
                        name:'预购',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[30, 182, 434, 791, 390, 30, 10]
                    },
                    {
                        name:'意向',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[1320, 1132, 601, 234, 120, 90, 20]
                    },
                    ]
            };                
            myCharts.setOption(options);
        }
    },
    mounted(){
        this.huanbi( )
    }
}
</script>
<style lang="stylus" scoped>
px2vw(px) 
    px/1920*100 vw 

px2vh(px)
    px/1080*100 vh

px2vh(px)
    px/1080*100 vh

// .link
//     width px2vw(380) 
//     height px2vh(300) 
//     margin-top  px2vh(20) 
//     margin-left px2vw(20) 

// .cate-price
//     width px2vw(380) 
//     height px2vh(50) 
//     background url(../static/img/right.png)
//     background-size 100% 100%
//     line-height px2vh(50)
//     font-size 16px
//     font-family MicrosoftYaHei-Bold
//     font-weight bold
//     color rgba(255,255,255,1) 

// .huanbi
//     width px2vw(380) 
//     height px2vh(240)
//     background url(../static/img/price.png)
//     background-size 100% 100%
//     box-sizing border-box   
//     margin-top px2vh(10) 
// #mains
//     height px2vh(240)
//     padding-top px2vh(23)
//     padding-left px2vw(30)
//     div 
//         height 100%

.link
    width px2vw(380)
    height px2vh(400) 
    margin-top px2vh(20)

.cate-price
    width px2vw(380) 
    height px2vh(50) 
    background url(../static/img/right.png)
    background-size 100% 100%
    line-height px2vh(50)
    font-size 16px
    font-family MicrosoftYaHei-Bold
    font-weight bold
    color rgba(255,255,255,1) 
.huanbi
    width px2vw(380) 
    height px2vh(340) 
    background url(../static/img/lei.png)
    background-size 100% 100%
    margin-top px2vh(10)

#mains
    height px2vh(340)
    div 
        height 100% 
        padding-left px2vw(30) 
        canvas
           width px2vw(364) 
           height px2vh(291) 
           padding-left px2vw(30) 

</style>