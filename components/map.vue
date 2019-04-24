
<template>
    <div class="ditu">
        <div class="shuzi">
            <div class="jiance">
                <span>监测地区</span>
                <p class="font">146</p>
            </div>
            <div class="caiyang">
                <span>采样数据</span>
                <p class="font">110,003,89</p>
            </div>
        </div>
        <div class="map">
            
        </div>
        <div @click='router2' class='route'>
            点击进入控制中心
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
            chosedList:[],
            mapNum:[]
        }
    },
    props:{
        areaList:{
            type:Array
        },
        mapData:{
            type:Array
        }
    },
    watch:{
        mapData:{
            handler(val) {
                this.mapNum = val
                let data =[]
                this.mapNum.forEach(item => {
                    this.areaList.forEach(area => {
                        if(area.id == item.area) {
                            item.add = area.name
                            return
                        }
                    })
                    if(item.add !== '西双版纳傣族自治州') {
                        item.add = item.add.substr(0,2)
                    } else {
                        item.add = item.add.substr(0,4)
                    }
                    const obj = {
                        name: item.add,
                        value: item.price?item.price:0,
                        // tooltip:{
                        //     formatter: `<div class='hov' style=" width:230px;
                        //             height:112px;
                        //             border:1px solid rgba(38, 57, 234, 1);
                        //             border-radius:0px 10px 10px 10px; 
                        //             podition:relative;
                        //         ">
                        //         <img src='../../static/img/hov.png' style='position:absolute;top:0;
                        //             left:0;width:100%;height:100%'/>
                        //             <p style="font-size:16px;
                        //             position: relative;
                        //             font-family:MicrosoftYaHei;
                        //             font-weight:400;
                        //             color:rgba(255,255,255,1);
                        //             display:block;
                        //             padding-left:22px;
                        //             padding-top:15px;
                        //             text-align:left">${item.add}</p>
                        //         <p style="font-size:16px;
                        //             position: relative;
                        //             font-family:MicrosoftYaHei;
                        //             font-weight:400;
                        //             color:rgba(255,255,255,1);
                        //             display:block;
                        //             padding-left:22px;
                        //             padding-top:15px;
                        //             text-align:left;">
                        //             材料价格
                        //             <span class='font' style="font-size:20px;
                        //             color:rgba(0,255,198,1);
                        //             margin-left:20px;">${Number(item.price).toFixed(2)}</span>
                        //             <img src=${item.huanbi>0?'../../static/img/up.png':'../../static/img/downs.png'} style='display:${item.huanbi?"inline-block":"none"}'/>
                        //             </p>
                        //         <p style="font-size:16px;
                        //             position: relative;
                        //             font-family:MicrosoftYaHei;
                        //             font-weight:400;
                        //             color:rgba(255,255,255,1);
                        //             display:block;
                        //             padding-left:22px;
                        //             padding-top:15px;
                        //             text-align:left;">更新时间<span class='font' style="font-size:20px;
                        //             color:rgba(0,255,198,1);
                        //             margin-left:20px;">${item.asmdate.split(' ')[0]}</span></p>
                        //     </div>`
                        // }
                    }
                    data.push(obj)
                })
                this.init_map(data)
            },
            deep: true
        }
    },
    created() {
        
    },
    // mounted() {
    //     this.init_map()
    // },
    methods:{
        init_map(data) {
            echarts.registerMap('yn', yn);
            const chart = echarts.init(document.getElementsByClassName('map')[0]);
            const that = this
            chart.setOption({
                
                series: [{
                    type: 'map',
                    // data: data,
                    map: 'yn',
                    aspectScale:1.1,
                    //zoom: 1.2,//放大缩小地图，默认是1
                    itemStyle: {
                        normal: {
                            show:true,
                            label: {
                                show: true,//默认是否显示省份名称  
                                color:'#7284B2',//修改字体颜色
                                fontSiae:'14px' 
                            },
                            areaColor:'#142b66',//设置背景颜色
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
                                color:'#fff',//修改字体颜色
                                fontSiae:'14px' 
                            },
                            textStyle:{
                                color:'red',
                            },
                            areaColor:'#43bcff',
                        },
                    },
                    // layoutCenter: ['200%', '200%'],
                    // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
                    layoutSize: 600
                }],
                tooltip: {
                    trigger: `item`,
                    backgroundColor:'rgba(50,50,50,0)',
                    formatter: function(params,ticket,callback) {
                        let time = '-'
                        let imgsrc = ''
                        // for(let i =0;i<that.mapData;i++) {
                        const arr = that.mapData.filter(item => {
                            const reg = new RegExp(params.name.substr(0,2))
                            return reg.test(item.add)
                        })
                        const area_item = arr[0]
                        time = area_item.asmdate.split(' ')[0]
                        imgsrc = area_item.huanbi?area_item.huanbi>0?'../static/img/up.png':'../static/img/downs.png':''
                        const res = `<div class='hov' style=" width:230px;
                                height:112px;
                                border:1px solid rgba(38, 57, 234, 1);
                                border-radius:0px 10px 10px 10px; 
                                podition:relative;
                            ">
                            <img src='../static/img/hov.png' style='position:absolute;top:0;
                                left:0;width:100%;height:100%'/>
                                <p style="font-size:16px;
                                position: relative;
                                font-family:MicrosoftYaHei;
                                font-weight:400;
                                color:rgba(255,255,255,1);
                                display:block;
                                padding-left:22px;
                                padding-top:15px;
                                text-align:left">${params.name}</p>
                            <p style="font-size:16px;
                                position: relative;
                                font-family:MicrosoftYaHei;
                                font-weight:400;
                                color:rgba(255,255,255,1);
                                display:block;
                                padding-left:22px;
                                padding-top:15px;
                                text-align:left;">
                                材料价格
                                <span class='font' style="font-size:20px;
                                color:rgba(0,255,198,1);
                                margin-left:20px;">${Number(area_item.price).toFixed(2)}</span>
                                <img src=${imgsrc}/>
                                </p>
                            <p style="font-size:16px;
                                position: relative;
                                font-family:MicrosoftYaHei;
                                font-weight:400;
                                color:rgba(255,255,255,1);
                                display:block;
                                padding-left:22px;
                                padding-top:15px;
                                text-align:left;">更新时间<span class='font' style="font-size:20px;
                                color:rgba(0,255,198,1);
                                margin-left:20px;">${time}</span></p>
                        </div>`
                        return res 
                    }
                    
                    
                },
            });
            chart.on('click', par => {
                const reg = new RegExp(par.name.substr(0,2))
                const area_item = this.areaList.find(item => {
                    return reg.test(item.name)
                })
                if(area_item) {
                    //this.chosedList.push(area_item.id)
                    this.$store.commit('ADD_CHOSED_MAP', area_item)
                }
            });
        },
        router2() {
           window.location.href='http://182.247.245.27:8017/home/distX/index.html#/'
        }
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
