
<template>
    <div class="exponent">
        <div class="caijia">材料价格指数</div>
        <div class="zhishu">
            <div class="head">
                <div class="biaotou">
                    <div class="name">材料</div>
                    <div class="number">指数</div>
                    <div class="updown">涨跌幅度</div>
                    <div class="updowns"></div>
                </div>
           </div>
            <div class="dataset"  id='zhishu'  >
                <div id='con'  @mouseenter="pauseScroll" @mouseleave="resumeScroll">
                    <div  v-for='item in cate' :key='item.id'>
                        <div :class="item.level ==1? 'datas':'data'">
                            <div class="data_names">{{item.name}}</div>
                            <div class="data_numbers">{{item.price.length>0?Number(item.price).toFixed(2):'-'}}</div>
                            <div class="data_updowns">{{item.huanbi.length>0?(Number(item.huanbi)*100).toFixed(4)+'%':'-'}}</div>
                            <div class="data_icons" v-if='item.huanbi.length>0'>
                                <img src="../static/img/up.png" v-if='item.huanbi>0'/>
                                <img src="../static/img/downs.png" v-if='item.huanbi<0'/>
                            </div> 
                        </div>
                    </div>
                </div>
                
                 
            </div>
             </div>
    </div>
</template>
<script>
// 材料价格指数组件
import $ from 'jquery';
import {TweenMax} from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin"
import api from '../api/api'
export default {
    name:'exponent',
    data(){
        return{
           active:false, 
           rightAm:null,
           rightTime:null,
           cate: [],
           twolevel:[]
        }
    },
    created() {
        this.get_cate()
    },
    methods:{
        dianji(){
            this.active=true
        },
        // setdata() {
        //     this.cate.forEach(item => {
        //         item.children.forEach(child => {
        //             child.price = (10 + Math.random()*10000/100).toFixed(2)
        //             child.zs = (Math.random()*10000/10000).toFixed(2)
        //         })
        //     })
        // },
      	scrollAuto() {//滚动
            // 动画开始
            console.log(123132)
            let $sw = $(".dataset")
            let sHeight = $("#con").height()
            if(sHeight < 100) {
                return
            } else {
                $sw.scrollTop(0)
                this.rightAm = TweenMax.to(".dataset", 100, {
                    scrollTo: {
                        y: "max"
                    },
                    repeat: -1,
                    yoyo: true,
                    repeatDelay: 0,
                    delay:0
                })
            }
        },
        pauseScroll() {
            if(!this.rightAm) return
            this.rightAm.pause()
            this.rightTime = this.rightAm.time()
        },
        resumeScroll() {
            if(!this.rightAm) return
            this.rightAm.play()
        },
        async get_cate(){
            const t = new Date()
            const y = t.getFullYear()
            let m = t.getMonth()+1
            if(m<10) {
                m='0'+m
            }
            const data = {
                type:"0",
                area:"53",
                startDate: y+'-' +m,
                endDate:y+'-' +m,
                level:"1,2"		
            }
            const res = await api.get_cate_data(data)//拿到材料数据的接口
            this.cate = res.data
            this.$nextTick(() => {
                setTimeout(() => {
                    this.scrollAuto()
                }, 0)
            })
        }
    },
    mounted() {
        
    },
    created(){
        this.get_cate()
    }
}
</script>
<style lang="stylus" scoped>
px2vw(px) 
    px/1920*100 vw 

px2vh(px)
    px/1080*100 vh

.exponent 
    width px2vw(380)
    height px2vh(520)
    margin-top px2vh(20)
.caijia
    width px2vw(380) 
    height px2vh(50) 
    background url(/static/img/right.png)
    background-size 100% 100%
    line-height px2vh(50)
    font-size 16px
    font-family MicrosoftYaHei-Bold
    font-weight bold
    color rgba(255,255,255,1)

.zhishu
    width px2vw(380) 
    height px2vh(460) 
    background url(/static/img/zhis.png)
    background-size 100% 100%
    margin-top px2vh(10)
    overflow auto
    padding-bottom px2vh(16)
    box-sizing border-box
    // margin-left px2vw(10)
.dataset
    width 100%
    height px2vh(420) 
    overflow auto
.data,.biaotou,.datas
    width 100%
    margin-top px2vh(20)
    display  flex
    justify-content space-around
    font-size 16px
    font-family MicrosoftYaHei
    font-weight 400
    color rgba(255,255,255,1)
    div 
        width 35%
        text-align left
        padding-left px2vw(15)
        box-sizing border-box 
    div+div 
        width 25%

    div+div+div 
        width 25%
  
.active
    background-color #384BFF
.biaotou
    background #162370
    height px2vh(40)
    line-height px2vh(40) 
 .head
    margin-left px2vw(10) 
.data
    .data_names
        padding-left px2vw(35)
.datas
    div
        font-weight 600
#con
    height auto
</style>