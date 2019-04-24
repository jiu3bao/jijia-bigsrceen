
<template>
	<div class="cate-list">
		<div class="cailiao">材料名称</div>
		<div class="leiming" >
			<div>
				<ul v-for='item in cateList' :key='item.id' class='cate'  @mouseenter="pauseScroll" @mouseleave="resumeScroll">
					<li @click='handleNodeClick(item)' :class='chosed_cate.id == item.id?"chosed":""'>
						{{item.name}}
						
					</li>
					<ul v-for='son in item.childrenList' :key='son.id'>
						<li @click.stop='handleNodeClick(item)' :class='chosed_cate.id == son.id?"chosed":""'>
							{{son.name}}
						</li>
					</ul>
				</ul>
			</div>
			
		<!-- <el-tree default-expand-all :data="cateList" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
		</div>
	</div>
</template>
<script>
// 材料名称组件
import $ from 'jquery';

export default {
    data() {
        return {
			scrollIndex:0,
			scrolling:null,
			chosed_cate:{},
			allarr:[]
        };
	},
	props:{
		cateList:{
			type: Array
		}
	},
	watch:{
		cateList:{
			handler(val) {
				this.allarr = []
				this.cateList.forEach(item => {
					this.allarr.push(item)
					if(item.childrenList&&item.childrenList.length>0) {
						item.childrenList.forEach(son => {
							this.allarr.push(son)
						})
					}
				})
				this.handleNodeClick(this.allarr[0])
				this.$nextTick(() => {
					setTimeout(() => {
						this.resumeScroll()
					}, 0)
				})
			},
			deep: true
		}
	},
	methods: {
		handleNodeClick(data) {
			this.chosed_cate = data
			this.$store.commit('SET_CHOSED_CATE', data)
		},
		scroll() {
            const _this = this
			 _this.scrollIndex++
            if(_this.scrollIndex == _this.allarr.length) {
                _this.scrollIndex =0
            }
            $(".leiming div").animate({"margin-top":"-"+40*this.scrollIndex+"px"}, function() {
				_this.handleNodeClick(_this.allarr[_this.scrollIndex])
            });
        },
        pauseScroll() {
            clearInterval(this.scrolling);
        },
        resumeScroll() {
            clearInterval(this.scrolling);
            this.scrolling = setInterval(this.scroll, 10000);
            const _this = this
            $('.leiming').hover(function() {
                clearInterval(_this.scrolling);
            }, function() {
                _this.resumeScroll()
            });
        },
	},
};
</script>
<style lang="stylus" scoped>
	px2vw(px) 
		px/1920*100 vw 

	px2vh(px)
		px/1080*100 vh

	.cate-list
		width px2vw(380) 
		height px2vh(300) 
		margin-top  px2vh(20) 
		margin-left px2vw(20) 
	.cailiao
		width px2vw(380) 
		height px2vh(50) 
		background url(/static/img/right.png)
		background-size 100% 100%
		line-height px2vh(50)
		font-size 16px
		font-family MicrosoftYaHei-Bold
		font-weight bold
		color rgba(255,255,255,1)

	.leiming
		width px2vw(380) 
		height px2vh(240)
		background url(/static/img/cailiao.png)
		background-size 100% 100%
		margin-top px2vh(10) 
		overflow hidden
		padding-top px2vh(30) 
		box-sizing border-box
		overflow  auto
	.el-tree
		background  none
		color #fff

	.cate 
		color #fff
		text-align left
		// padding-left px2vw(20)
		li 
			padding-left px2vw(20)
			line-height 40px
		ul 
			li 
				padding-left px2vw(40)
	.chosed
		color #fff
		background #43bcff
</style>