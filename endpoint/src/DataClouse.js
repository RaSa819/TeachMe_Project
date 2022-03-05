var dtClouser = (() => {
    var data = null;

    return {
        setData: function (dt) {
            data = dt
        },
        value: function () {
            return data
        }
    }
})

export default dtClouser