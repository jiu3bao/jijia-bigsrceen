export const state = () => {
    return {
        chosedCate:{},
        chosedMap:[]
    };
};

export const mutations = {
    SET_CHOSED_CATE(state, data) {
        state.chosedCate = data;
        console.log(state.chosedCate)
    },
    ADD_CHOSED_MAP(state, data) {
        state.chosedMap.push(data);
        console.log(state.chosedMap)
    }
};
