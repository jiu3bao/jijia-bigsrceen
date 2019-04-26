<template>
    <div class="page-index">    	 
        {{num}}
        <Map></Map>
    </div>
</template>

<script>

import api from "../api/api";
import Map from '../components/map'

function setState(store) {}

export default {
    name: 'index',
    data(){
        return{
            num:0,
            num1:495
        }
    },
    created() {
       this.add_num()
    },
    components:{
        Map
    },
    methods:{
        add_num() {
            if(this.num1 - this.num > 10000000) {
                this.num+=1000000
            } else if(this.num1 - this.num > 1000000) {
                this.num+=100000
            } else if(this.num1 - this.num > 100000) {
                this.num+=10000
            } else if(this.num1 - this.num > 10000) {
                this.num+=1000
            } else if(this.num1 - this.num > 1000) {
                this.num+=100
            } else if(this.num1 - this.num > 100) {
                this.num+=10
            } else if(this.num1 - this.num > 0) {
                this.num+=1
            } else if(this.num1 -this.num ==0) {
                return
            }
            setTimeout(this.add_num,1)
        }
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
