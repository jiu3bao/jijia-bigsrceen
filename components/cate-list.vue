
<template>
	<div class="cate-list">
		<div class="cailiao">材料名称</div>
		<div class="leiming">
		<el-tree default-expand-all :data="cate" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
		</div>
	</div>
</template>
<script>
// 材料名称组件
import api from "../api/api";
export default {
    data() {
        return {
          cate: [],
          defaultProps: {
            children: "childrenList", //绑定名字与接口文档名字一样
            label: "name"
          }
        };
    },
	methods: {
		handleNodeClick(data) {
			this.$store.commit('SET_CHOSED_CATE', data)
		},
		async get_calilaio() {
			const data = {};
			const res = await api.get_calilaio(data); //拿到材料数据的接口
			this.cate = res.data; //材料数据赋值给cate
		}
	},
	created() {
		this.get_calilaio();
	}
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
		background url(../static/img/right.png)
		background-size 100% 100%
		line-height px2vh(50)
		font-size 16px
		font-family MicrosoftYaHei-Bold
		font-weight bold
		color rgba(255,255,255,1)

	.leiming
		width px2vw(380) 
		height px2vh(240)
		background url(../static/img/cailiao.png)
		background-size 100% 100%
		margin-top px2vh(10) 
		overflow hidden
		padding-top px2vh(30) 
		box-sizing border-box
		overflow  auto
	.el-tree
		background  none
		color #fff
</style>