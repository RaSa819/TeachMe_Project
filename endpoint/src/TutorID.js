var ID = (() => {
    var id = null

    return {
        setData: function (dt) {
            id = dt;
        },
        value: function () {
            return id
        }
    }
})

export default ID;