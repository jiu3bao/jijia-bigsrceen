
<template>
    <div class="area">
        <div class="dizhou">各地州市{{this.$store.state.chosedCate.name}}价格情况</div>
        <div class="adxbox"  @mouseenter="pauseScroll" @mouseleave="resumeScroll" >
            <el-table 
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="地区"
                    width="100">
                    <template slot-scope="scoped">
                        {{scoped.row[0].add}}
                    </template>
                </el-table-column>
                <el-table-column 
                    v-for='(item, index) in tableData[0]'
                    :key='index'
                    prop="name"
                    :label="item.asmdate?item.asmdate.substr(0,7):''"
                    width="100">
                  <template slot-scope="scoped">
                      {{Number(scoped.row[index]?scoped.row[index]['price']:'-').toFixed(2)}}
                  </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
// 地区价格组件
import $ from 'jquery';
import {TweenMax} from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
export default {
   data() {
        return {
            rightAm:null,
            rightTime:null,
            tableData:[]
        }
    },
    props:{
        area_price_hb:{
            type:Array
        },
        areaList:{
            type:Array
        }
    },
    watch:{
        area_price_hb:{
            handler(val) {
                let area_list=[]
                if(val.length>0) {
                    val.filter(item => {
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
                    })
                }
                this.tableData = area_list
                this.tableData.filter(son => {
                    if(son[0].area.length > '2') {
                        this.areaList.forEach(area => {
                            if(area.id == son[0].area) {
                                son[0].add = area.name
                                return
                            }
                        })
                    }
                })
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.scrollAuto()
                    }, 0)
                })
            },
            deep: true
        }
    },
    created() {
        
    },
    methods:{
        scrollAuto() {//滚动
        // 动画开始
        let $sw = $(".adxbox")
        let sHeight = $(".adxbox").height()
        if(sHeight < 100) {
            return
        } else {
            $sw.scrollTop(0)
            this.rightAm = TweenMax.to(".adxbox", 100, {
                scrollTo: {
                    y: "max"
                },
                repeat: -1,
                yoyo: true,
                repeatDelay: 1,
                delay:1
            })
        }
    },
    pauseScroll() {
        if(!this.rightAm) return //避免报错
        this.rightAm.pause()
        this.rightTime = this.rightAm.time()
    },
    resumeScroll() {
        if(!this.rightAm) return //避免报错
        this.rightAm.play()
    }
    },
    mounted() {
 
    }
}

    
</script>
<style lang="stylus" scoped>
px2vw(px) 
    px/1920*100 vw 

px2vh(px)
    px/1080*100 vh
.area
    height px2vh(240)
    padding px2vh(20) px2vw(20) 0
.dizhou
    height px2vh(50)
    background url(/static/img/xia.png)
    background-size 100% 100%
    font-size 16px
    font-family MicrosoftYaHei-Bold
    font-weight bold
    color rgba(255,255,255,1)
    line-height px2vh(50) 
.adxbox
    width px2vw(1080)
    height px2vh(180)
    background url(/static/img/adss.png)
    background-size 100% 100%
    margin-top px2vh(10)
    padding-top px2vh(20)
    // overflow auto
    overflow-y scroll
    padding-bottom px2vh(5)
    box-sizing border-box
    overflow-x hidden
    padding-left px2vh(30)   
    
.ads-data
    width px2vw(1080) 
    display  flex
    justify-content space-around
    font-size 14px
    font-family MicrosoftYaHei
    font-weight 400
    color rgba(255,255,255,1)
    padding-bottom px2vh(10)
.data_date
    margin-right px2vw(42)
    margin-left  px2vw(11)

tr
    translate .5s
// .el-table
//     background  none
//     color #fff
</style>