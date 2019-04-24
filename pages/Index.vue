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
                <price :season_price='season_price' :areaList='areaList'></price>
                <redar :redarData='redarData'></redar>
           </div>
           <div class='center'>
                <maps :areaList='areaList' :mapData='mapData'></maps>
                <areas :area_price_hb='area_price_hb' :areaList='areaList'> </areas>
           </div>
           <div class='right'>
               <exponent></exponent>
               <huanbi :nearest_data='nearest_data' :areaList='areaList'></huanbi>
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
            area_price_hb:[],//地区价格
            season_price:[],// 柱状季度对比
            cateList:[],
            new_area_code:'',
            allData:[],
            month:[],
            areaList:[],
            areaCodeList:[],
            nearest_data:[],
            mapData:[],
            redarData:[]
        }
    },
    created() {
        const t = new Date()
        let y = t.getFullYear()
        let m = t.getMonth() +1
        let exm=''
        if(m>9) {
            exm = m-9
            this.month = [exm>9?y+'-'+ exm:y+'-'+ '0'+exm, m>9?y+'-'+ m:y+'-'+ '0'+m]
        } else {
            let exy = y-1
            exm = m+12-8
            this.month = [exm>9?exy+'-'+ exm:exy+'-'+ '0'+exm, m>9?y+'-'+ m:y+'-'+ '0'+m]
        }
        this.get_area()
    },
    computed:{
        chose_map() {
            return this.$store.state.chosedMap
        },
        catelevel() {
            return this.$store.state.chosedCate.level?this.$store.state.chosedCate.level:'2'
        },
        cateId() {
            return this.$store.state.chosedCate.id
        }
    },
    watch:{
        chose_map: {
            handler(val) {
                if(val.length>0) {
                    this.get_nearest_data()
                } 
            },
            deep: true
        },
        cateId(val) {
            this.get_price_hb()
            this.get_2season_data()
            this.get_nearest_data()
            this.get_map_data()
            this.get_redar_data()
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
        async get_price_hb() {//获取各地区近9月价格
            const data = {
                startDate: this.month[0],
                endDate: this.month[1],
                id: this.cateId,
                orderType:'1',
                area:this.areaCodeList.toString(),
                type:'0',
                level: this.catelevel
            }
            const res = await api.get_cate_data(data)
            this.area_price_hb = res.data
            
            //this.area_price_hb = area_list
        },
        async get_cate_list() { //获取材料 默认选定材料
            const res = await api.get_cate()
            this.cateList = res.data
            this.$store.commit('SET_CHOSED_CATE',this.cateList[0])
        },
        async get_2season_data() {// 获取2个季度对比
            const t = new Date()
            const m = t.getMonth()+1
            const y = t.getFullYear()
            let season = []
            let exseason=[]
            if(m<4) {
                season = [y+'-'+'10',y+'-'+'12']
                const exy = y-1
                exseason=[exy+'-'+'06',exy+'-'+'09']
            } else if(m<7) {
                season = [y+'-'+'01',y+'-'+'03']
                const exy = y-1
                exseason = [exy+'-'+'09',exy+'-'+'12']
            } else if(m<10) {
                season = [y+'-'+'04',y+'-'+'06']
                exseason = [y+'-'+'01',y+'-'+'03']
            } else {
                season = [y+'-'+'07',y+'-'+'09']
                exseason = [y+'-'+'04',y+'-'+'06']
            }
            const data = {
                startDate: season[0],
                endDate: season[1],
                id: this.cateId,
                orderType:'1',
                type:'1',
                area:this.areaCodeList.toString(),
                level: this.catelevel
            }
            const res = await api.get_cate_data(data)
            const exdata = {
                startDate: exseason[0],
                endDate: exseason[1],
                id: this.cateId,
                orderType:'1',
                type:'1',
                area:this.areaCodeList.toString(),
                level: this.catelevel
            }
            const exres = await api.get_cate_data(exdata)
            this.season_price = [exres.data,res.data]
        },
        async get_area() { // 获取区域 
            const res = await api.get_area()
            this.areaList = res.data
            res.data.forEach(item =>{
                this.areaCodeList.push(item.id)
            })
            this.get_cate_list()
        }, 
        async get_nearest_data() {// 面积图数据 获取近4个月数据 多省份
            const t = new Date()
            const m = t.getMonth()+1
            const y = t.getFullYear()
            let season = []
            if(m<4) {
                // season = [y+'-'+'01',y+'-'+'03']
                season = [y-1+'-'+'10',y-1+'-'+'12']
            } else if(m<7) {
                // season = [y+'-'+'04',y+'-'+'06']
                season = [y+'-'+'01',y+'-'+'03']
            } else if(m<10) {
                // season = [y+'-'+'07',y+'-'+'09']
                season = [y+'-'+'04',y+'-'+'06']
            } else {
                // season = [y+'-'+'10',y+'-'+'12']
                season = [y1+'-'+'07',y1+'-'+'09']
            }
            let area_arr = []
            this.chose_map.map(item => {
                area_arr.push(item.id)
            })
            const data = {
                startDate: season[0],
                endDate: season[1],
                id: this.cateId,
                orderType:'1',
                area: area_arr.toString(),
                type:'0',
                level: this.catelevel
            }
            const res = await api.get_cate_data(data)
            this.nearest_data = res.data
        },
        async get_map_data() { // 获取地图数据
            const t = new Date()
            const y = t.getFullYear()
            let m = t.getMonth()+1
            if(m<11) {
                m='0'+(m-1)
            } else {
                m=(m-1)
            }
            const data = {
                type:"0",
                area:this.areaCodeList.toString(),
                startDate: y+'-' +m,
                endDate: y+'-' +m,
                id: this.cateId,
                orderType: '1',
                level: this.catelevel	
            }
            const res = await api.get_cate_data(data)//拿到材料数据的接口
            this.mapData = res.data
        },
        async get_redar_data() { //获取雷达图数据 获取材料近一年数据 按季度划分
            const t = new Date()
            const m = t.getMonth()+1
            const y = t.getFullYear()
            let season
            if(m<4) {
                season = [y-1+'-'+'03',y+'-'+'03']
            } else if(m<7) {
                season = [y-1+'-'+'06',y+'-'+'06']
            } else if(m<10) {
                season = [y-1+'-'+'09',y+'-'+'09']
            } else {
                season = [y+'-'+'01',y+'-'+'12']
            }
            const data = {
                startDate: season[0],
                endDate: season[1],
                id: this.cateId,
                orderType:'1',
                type:'1',
                area:'53',
                level: this.catelevel
            }
            const res = await api.get_cate_data(data)
            this.redarData = res.data
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
    background url(/static/img/top.png) 
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
