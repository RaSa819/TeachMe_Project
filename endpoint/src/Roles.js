// Closure 
//a closure gives you access to an outer function's scope from an inner function


var role = (() => {
    var data = 'hello'

    return {
        setData: function (dt) {
            data = dt;
        },
        value: function () {
            return data
        }
    }
})

export default role;