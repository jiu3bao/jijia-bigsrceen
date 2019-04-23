
<template>
    <div class="redar">
        <div class="xiangmu">{{this.$store.state.chosedCate.name}}波动情况</div>
        <div class="leida">
            <div id="main2" ></div>
        </div>
    </div>
</template>
<script>
// 雷达图组件
import echarts from 'echarts'
export default {
    name:"redar",
    data() {
        return {
            season_list:[]
        }
    },
    props:{
        redarData:{
            type: Array
        }
    },
    watch:{
        redarData:{
            handler(val) {
                this.season_list = val
                let hb =[], tb= []
                hb.length =4
                tb.length =4
                hb.fill('')
                tb.fill('')
                this.season_list.filter(item => {
                    const m = new Date(item.asmdate).getMonth()+1
                    if(m>9) {
                        item.season = '第四季度'
                        hb[3] = item.huanbi
                        tb[3] = item.tongbi
                    } else if(m>6) {
                        item.season ='第三季度'
                        hb[2] = item.huanbi
                        tb[2] = item.tongbi
                    } else if(m>3) {
                        item.season ='第二季度'
                        hb[1] = item.huanbi
                        tb[1] = item.tongbi
                    } else {
                        item.season = '第一季度'
                        hb[0] = item.huanbi
                        tb[0] = item.tongbi
                    }
                })
                const tbobj = {
                    value : tb,
                    name : '同比',
                    symbol:'none',
                    itemStyle: {
                        normal:{
                            color : "#0CDAFB",  // 图表中各个图区域的边框线颜色
                            lineStyle:{
                                width:16
                            }
                        }
                    }
                }
                const hbobj = {
                    value : hb,
                    name : '环比',
                    symbol:'none',
                    itemStyle: {
                        normal:{
                            color : "#FBB329",  // 图表中各个图区域的边框线颜色
                            lineStyle:{
                                width:16
                            }
                        }
                    }
                }
                this.leida([tbobj,hbobj])
            
            },
            deep: true
        }
    },
    methods:{
        leida(data){
            const myChart1 = echarts.init(document.getElementById('main2')) 
            const option1 = {
                legend:{
                    data:['同比','环比'],
                    left:'10px'
                },
                radar: {
                    legend:{
                        data:['同比','环比']
                    },
                    nameGap:1,//图与雷达之间的距离调整
                    grid: {
                        // top: '70px',
                        containLabel: true
                    },
                    name: {
                        textStyle: {
                            color: '#fff',
                            borderRadius: 3,
                            padding: [3, 5]
                    }
                    },
                    // 设置雷达图中间射线的颜色
                    axisLine: {
                        lineStyle: {
                            color: '#272B49',
                        },
                    },
                    indicator: [
                        { name: '第一季度',},
                        { name: '第二季度',},
                        { name: '第三季度'},
                        { name: '第四季度'}
                    ],
                    splitArea : {
                        show : true,
                        areaStyle : {
                            color: ["#00062A","#00062A"]  // 图表背景网格区域的颜色
                        }
                    },
                    splitLine : {
                        show : true,
                        lineStyle : {
                            width : 1,
                            color : '#272B49' // 图表背景网格线的颜色
                        }
                    },
                        
                    center: ['50%', '50%']
                },
                tooltip:{
                    trigger: `item`,
                },
                series: [{
                    name: '',
                    type: 'radar',
                    data : data,
                }]
            };
            myChart1.setOption(option1);
        }
    },
}
</script>
<style lang="stylus" scoped>
px2vw(px) 
    px/1920*100 vw 

px2vh(px)
    px/1080*100 vh

// .redar
//     width px2vw(380)
//     height px2vh(400) 
//     margin-top px2vh(20)

// .xiangmu
//     width px2vw(380) 
//     height px2vh(50) 
//     background url(../static/img/right.png)
//     background-size 100% 100%
//     line-height px2vh(50)
//     font-size 16px
//     font-family MicrosoftYaHei-Bold
//     font-weight bold
//     color rgba(255,255,255,1) 
// .leida
//     width px2vw(380) 
//     height px2vh(340) 
//     background url(../static/img/lei.png)
//     background-size 100% 100%
//     margin-top px2vh(10)

// #main2
//     height px2vh(340)
//     div 
//         height 100% 
//         canvas
//            width px2vw(364) 
//            height px2vh(291) 


.redar
    width px2vw(380) 
    height px2vh(300) 
    margin-top  px2vh(20) 
    margin-left px2vw(20) 

.xiangmu
    width px2vw(380) 
    height px2vh(50) 
    background url(/static/img/right.png)
    background-size 100% 100%
    line-height px2vh(50)
    font-size 16px
    font-family MicrosoftYaHei-Bold
    font-weight bold
    color rgba(255,255,255,1) 

.leida
    width px2vw(380) 
    height px2vh(240)
    background url(/static/img/price.png)
    //padding px2vw(10) 
    background-size 100% 100%
    box-sizing border-box   
    margin-top px2vh(10) 
#main2
    width 100% 
    height 100%
    div 
        height 100%
</style>