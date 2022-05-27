const fetchData = require('./../controllers/fetchData')

module.exports = (app) => {
    app.get('/', fetchData.index)
    app.get('/fetchDept', fetchData.fetchDetp)
    app.get('/fetchUser', fetchData.fetchUsers)
}