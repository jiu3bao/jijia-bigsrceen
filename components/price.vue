
<template>
    <div class="price">
        <div class="jiage">{{this.$store.state.chosedCate.name}}价格对比</div>
        <div class="duibi">
             <div id="main"></div>
        </div>
    </div>
</template>
<script>
// 价格对比组件
import echarts from 'echarts'
export default {
    name:"price",
    data() {
        return {
        }
    },
    props:{
        season_price:{
            type:Array
        },
        areaList:{
            type:Array
        }
    },
    watch:{
        season_price:{
            handler(val) {
                console.log(val,'ssssppp')
                let area_arr = []
                let val1 = []
                let val2 = []
                let legend = []
                if(val[0].length == 0) {
                    return
                }
                val[0].forEach(item => {
                    this.areaList.forEach(area => {
                        if(area.id == item.area) {
                            if(area.name=='西双版纳傣族自治州') {
                                area_arr.unshift(area.name.substr(0,4))
                            } else {
                                area_arr.unshift(area.name.substr(0,2))
                            }
                            
                            return
                        }
                    })
                    
                    val1.unshift(Number(item.price).toFixed(2))
                })
                console.log(area_arr,'123112')
                const m1 = val[0][0]?new Date(val[0][0].asmdate).getMonth()+1:''
                const m2 = val[1][0]?new Date(val[1][0].asmdate).getMonth()+1:''
                if(m1>9) {
                    legend.push('第四季度')
                } else if(m1>6) {
                    legend.push('第三季度')
                } else if(m1>3) {
                    legend.push('第二季度')
                } else {
                    legend.push('第一季度')
                }
                if(m2>9) {
                    legend.push('第四季度')
                } else if(m2>6) {
                    legend.push('第三季度')
                } else if(m2>3) {
                    legend.push('第二季度')
                } else {
                    legend.push('第一季度')
                }
                val[1].forEach(item => {
                    val2.unshift(Number(item.price).toFixed(2))
                })
                this.init(area_arr,legend,val1,val2)
            }
        }
    },
    methods:{
        reset_area() {
           // this.area.
            //this.areaList.push(list)
        },
        init(area,legend,val1,val2){
            console.log(legend,'legend')
            var myChart = echarts.init(document.getElementById('main'))
            var  option = {
                title: {
                    text: '',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                },
                legend: {
                    icon : 'circle',
                    data: legend,
                    textStyle:{
                        color:'#AAABBC'
                    }
                },
                grid: {
                    top:'40px',//距上边距
                    left:'0',//距离左边距
                    right:'15%',//距离右边距
                    bottom:'10px',//距离下边距
                    containLabel: true
                },
                xAxis: {
                    show:false,
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    splitLine:{
                        show:true   //去掉网格线
                        },
                        lineStyle:{
                            type:"solid"
                        }
                },
                yAxis: {
                    type: 'category',
                    data: area,
                    axisLine:{     
                        show:false,//y轴坐标轴
                        lineStyle:{
                            color:'#AAABBC',
                        }
                    } ,
                    axisTick: {
                        show:false //刻度线
                    },

                },
                series: [
                    {
                        name: legend[0],
                        type: 'bar',
                        barGap:'50px',/*多个并排柱子设置柱子之间的间距*/
                        barCategoryGap:'20%',/*多个并排柱子设置柱子之间的间距*/
                        data: val1,
                        itemStyle:{
                            normal:{
                                color:'#302ffe',
                                label: {
                                    show: true,
                                    position: 'right',
                                    textStyle: {
                                        color: '#AAABBC'
                                }
                            }
                                }
                        }         
                    },
                    {
                        name: legend[1],
                        type: 'bar',
                        barGap:'80%',
                        barCategoryGap:'20%',
                        data:val2,
                        itemStyle:{
                            normal:{
                                color:'#10bfe3',
                                label: {
                                    show: true,
                                    position: 'right',
                                    textStyle: {
                                        color: '#AAABBC'
                                }
                            }
                                }
                        }
                    },

                ]
            };
         myChart.setOption(option);
        }
      
    },
}
</script>
<style lang="stylus" scoped>
px2vw(px) 
    px/1920*100 vw 

px2vh(px)
    px/1080*100 vh

px2vh(px)
    px/1080*100 vh

.price
    width px2vw(380) 
    height px2vh(300) 
    margin-top  px2vh(20) 
    margin-left px2vw(20) 

.jiage
    width px2vw(380) 
    height px2vh(50) 
    background url(/static/img/right.png)
    background-size 100% 100%
    line-height px2vh(50)
    font-size 16px
    font-family MicrosoftYaHei-Bold
    font-weight bold
    color rgba(255,255,255,1) 

.duibi
    width px2vw(380) 
    height px2vh(240)
    background url(/static/img/price.png)
    background-size 100% 100%
    padding-top px2vh(15) 
    box-sizing border-box
    overflow auto
    margin-top px2vh(10) 
#main
    height px2vh(800)
    padding-top px2vh(10) 
    div 
        height 100%
</style>