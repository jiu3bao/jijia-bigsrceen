export const state = () => {
    return {
        chosedCate:{},

    };
};

export const mutations = {
    SET_CHOSED_CATE(state, data) {
        state.chosedCate = data;
    },
    setEffect(state, effect) {
        state.effect = effect;
    }
};
