module.exports=(app)=>{
    app.get('/test',(req,res)=>{
        res.json('hello test')
    })
}