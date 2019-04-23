
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
        nearest_data:{
            type: Array
        },
        areaList:{
            type: Array
        }
    },
    data() {
        return {
            echarts_data:[],
        }
        
    },
    watch:{
        nearest_data:{
            handler(val) {
                let area_list=[]
                if(val.length>0) {
                    val.map(item => {
                        let has = false
                        if(area_list.length ==0) {
                            area_list.push([])
                        }
                        area_list.map(arr => {
                            if(arr.length ==0) {
                                arr.push(item)
                                has = true
                            } else {
                                if(arr[0].area == item.area) {
                                    arr.push(item)
                                    has = true
                                } else {
                                    has = false
                                }
                            }
                        })
                        if(!has) {
                            area_list.push([item])
                        }
                        this.echarts_data = area_list
        
                    })
                }
                if(this.echarts_data.length >0){
                    let lengend = []
                    let x =[], y=[]
                    this.echarts_data.filter(item => {
                        let areaname ='全省'
                        this.areaList.forEach(area => {
                            if(area.id == item[0].area) {
                                lengend.push(area.name)
                                areaname = area.name
                                item[0].add = areaname
                                return
                            } else {
                                item[0].add = areaname
                            }
                        })
                        let yy = []
                        item.map(data => {
                            if(x.length != item.length) {
                                x.push(data.asmdate.split(' ')[0])
                            }
                            yy.push(data.huanbi)
                        })
                        y.push({data:yy,type:'line',name:areaname, smooth:true,
                            itemStyle: {normal: {areaStyle: {type: 'default'}}}})
                    })
                    // if(!this.lengend||this.lengend.length == 0) {
                    //     this.lengend.push('全省')
                    // }
                    
                    this.init(x,y,lengend)
                }
            },
            deep:true
        }
    },
    methods:{
        init(x,y,lengend=[]){
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
                    data:lengend,
                    textStyle: {
                        fontSize: 12,
                        color: '#F1F1F3'
                    },
                    type: 'scroll',
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : x,
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
                series : y
            };                
            myCharts.setOption(options);
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
    background url(/static/img/right.png)
    background-size 100% 100%
    line-height px2vh(50)
    font-size 16px
    font-family MicrosoftYaHei-Bold
    font-weight bold
    color rgba(255,255,255,1) 
.huanbi
    width px2vw(380) 
    height px2vh(340) 
    background url(/static/img/lei.png)
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