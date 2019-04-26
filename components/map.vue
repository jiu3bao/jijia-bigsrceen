
<template>
    <div class="ditu">
        <div class="map">
            
        </div>
    </div>

</template>
<script>

import yn from '../static/yunnan.json'
import echarts from 'echarts'
import $ from 'jquery'
import api from '../api/api'

export default {
    data() {
        return {
            CoordMap:{},
            mapdata:[]
        }
    },
    created() {
        console.log(yn)
        const arr = yn.features
        this.CoordMap = []
        arr.forEach(item =>{
            this.CoordMap.push({name: item.properties.name, coord:item.properties.cp})
        })
    },
    mounted() {
        this.init_map()
    },
    methods:{
        init_map() {
            echarts.registerMap('yn', yn);
            const chart = echarts.init(document.getElementsByClassName('map')[0]);
            const that = this
            const geoCoordMap = this.CoordMap
            const _this = this
            chart.setOption({
                
                series: [{
                    type: 'map',
                    // data: data,
                    map: 'yn',
                    markPoint:{
                        data:this.CoordMap,
                        symbol: 'circle',
                        symbolSize:10,
                        silent:true,
                        symbolOffset:['100%', '-120%']
                    },
                    symbolSize: function (val) {
                        return 25;
                    },
                    aspectScale:1.1,
                    //zoom: 1.2,//放大缩小地图，默认是1
                    itemStyle: {
                        normal: {
                            show:true,
                            label: {
                                show: true,//默认是否显示省份名称  
                                color:'#7284B2',//修改字体颜色
                                fontSiae:'14px',
                            },
                            areaColor:'rgba(0,0,0,0)',//设置背景颜色
                            areaStyle:{
                                color:'red',
                            },
                            borderWidth:1,
                            borderColor:'#43bcff',//设置边框颜色
                        },
                        emphasis: {//鼠标移入动态的时候显示的默认样式
                            show:false,
                            label: {
                                show: true,//选中状态是否显示省份名称
                                color:'#7284B2',//修改字体颜色
                                fontSiae:'14px' 
                            },
                            textStyle:{
                                color:'red',
                            },
                            areaColor:'rgba(0,0,0,0)',
                        },
                    },
                    // layoutCenter: ['200%', '200%'],
                    // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
                    layoutSize: 600
                }],
            });
        },
    },
}
</script>
<style lang="stylus" scoped>
px2vw(px) 
    px/1920*100 vw 

px2vh(px)
    px/1080*100 vh

.ditu
    height px2vh(700) 
    padding px2vh(20) px2vw(20) 0 px2vh(20)
    overflow hidden
    box-sizing border-box
    display flex
    flex-direction column
.shuzi
    width px2vw(1080)
    height px2vh(65) 
    margin-top px2vh(20)
    display flex
    justify-content space-around

.jiance,.caiyang
	text-align left
 
.jiance span,.caiyang span
    font-size 16px
    font-family MicrosoftYaHei
    font-weight 400
    color rgba(255,255,255,1)

.jiance p,.caiyang p
    font-size 50px
    color rgba(0,255,198,1)
.map
    width 100%
    height px2vh(605)
    margin 0 auto
    padding-top px2vh(30)
    box-sizing border-box
    div
       width 100%
       height 100%
       display flex
       justify-content center
       canvas
        width 100%
        height 100%

.hov
    width:230px;
    height:112px;
    border:1px solid rgba(38, 57, 234, 1);
    border-radius:0px 10px 10px 10px; 
    background  url(/static/img/hov.png)

.hov p
    font-size 16px
    font-family MicrosoftYaHei
    font-weight 400
    color rgba(255,255,255,1)
    display block
    padding-left px2vw(22)
    padding-top  px2vh(15)
    text-align left

.hov p>span
    font-size 20px
    color rgba(0,255,198,1)
    margin-left px2vw(20)
.route 
    color #7284B2
    text-decoration underline
    cursor pointer
    

</style>
