<template>
    <div class="page-index">    	 
       <div class='header'>
       <div class="wen">
           <div class="tuwen">
                 <img src="../static/img/loginlogo.png" class="logo"/>
                 <span>云南省建筑工程材料及设备价格监测系统</span> 
           </div>
            <p>{{this.date}}</P>
       </div>
    
       </div>
       <div class='content'>
           <div class='left'>
                <cate :cateList='cateList'></cate>
                <price :allData='allData'></price>
                <redar :allData='allData'></redar>
           </div>
           <div class='center'>
                <maps></maps>
                <areas :allData='allData'> </areas>
           </div>
           <div class='right'>
               <exponent></exponent>
               <huanbi :area_price_hb='area_price_hb'></huanbi>
           </div>
       </div>
    </div>
</template>

<script>
import redar from '../components/redar'
import cate from '../components/cate-list'
import price from '../components/price'
import huanbi from '../components/cate-price'
import exponent from '../components/cate-price-zs'
import maps from '../components/map'
import areas from '../components/area-price'

import api from "../api/api";


function setState(store) {}

export default {
    name: 'index',
    data(){
        return{
            date:'',
            area_price_hb:[],
            cateList:[],
            new_area_code:'',
            allData:[]
        }
    },
    created() {
        this.get_cate_list()
        //this.get_price_hb()
    },
    computed:{
        chose_map() {
            return this.$store.state.chosedMap
        },
        cateId() {
            return this.$store.state.chosedCate.id
        }
    },
    watch:{
        chose_map: {
            handler(val, oldval) {
                console.log(val,oldval)
                if(val.length>0) {
                    this.new_area_code = val[val.length-1]
                    this.get_price_hb(new_area_code, this.cateId)
                    this.get_data()
                } 
            },
            deep: true
        },
        cateId(val) {
            this.get_price_hb()
            this.get_data()
        }
    },
    metaInfo: {
        title: 'Home',
        titleTemplate: '%s - Lavas',
        meta: [
            {name: 'keywords', content: 'lavas PWA'},
            {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
        ]
    },

    components:{
        redar,
        cate,
        price,
        huanbi,
        exponent,
        maps,
        areas
    },
    methods:{
        CurentTime()   { 
            var now = new Date(); 
            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日   
            var hh = now.getHours();            //时
            var mm = now.getMinutes();          //分 
            var clock = year + "-"; 
            if(month < 10)
                clock += "0";   
            clock += month + "-";   
            if(day < 10)
                clock += "0";       
            clock += day + " ";     
            if(hh < 10)
                clock += "0";    
            clock += hh + ":";
            if (mm < 10) clock += '0'; 
            clock += mm; 
            return(clock); 
        },
        async get_price_hb() {//获取价格环比数据 用于面积图
            const data = {
                areaId: this.new_area_code,
                cateId: this.cateId
            }
            const res = await api.get_cate_data(data)
            this.area_price_hb.push(res.data.list)
        },
        async get_cate_list() {
            const res = await api.get_cate({a:1})
            this.cateList = res.data.data
            this.cateId = this.cateList[0]
            this.$store.commit('SET_CHOSED_CATE',this.cateId)
        },
        async get_data() {// 获取全部数据
            const data = {
                areaId: this.new_area_code,
                cateId: this.cateId
            }
            const res = await api.get_cate_data(data)
            this.allData = res.data.list
        } 
    },
    mounted(){
        //每1秒刷新时间
        setInterval(() => {
            this.date=this.CurentTime()
        }, 1000)
    }

};
</script>

<style lang="stylus" scoped>
px2vw(px) 
    px/1920*100 vw 

px2vh(px)
    px/1080*100 vh

.content
    display flex
    //padding 0 20px
.left
    height px2vh(50)
.header
    width px2vw(1920)
    height px2vh(80)
    padding-top  px2vh(20)
    display  flex
    justify-content center
    background url(../static/img/top.png) 
    background-size 100% 100%
.tuwen img
    width px2vw(32)
    margin-right px2vw(8)
.tuwen span 
    font-size 22px
    font-family MicrosoftYaHei-Bold
    font-weight bold
    color rgba(255,255,255,1)
    display block
    margin-left px2vm(8)
.wen p{
    margin-top px2vh(10)
    font-size 14px
    font-family MicrosoftYaHei
    font-weight 400
    color rgba(0,222,255,1)
}
.tuwen 
    display flex
    align-items center
.page-index,.right
    margin-right px2vw(20)
</style>
