const promise = new Promise((resolve, reject) => {
    var n = 1000000000;
    for (var i = 0; i <= n; i++) {
        if (i >= n)
            console.log('execute test')
    }
})

async function a() {

}