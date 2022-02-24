const adminController = require('./../controllers/adminController')
module.exports = (app) => {
    app.post('/admin/addDept', adminController.addDept)
    app.post('/admin/delDept', adminController.deleteDept)
    app.post('/admin/EditDept', adminController.EditDept)
    app.post('/admin/deleteUser', adminController.deleteUser)
}