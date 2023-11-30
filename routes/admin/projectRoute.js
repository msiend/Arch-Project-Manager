const express = require('express');
const api = express.Router();
const pmNormalAPI = require('../../controllers/PM.normal.crud')

//-------normal project employee --------
api.get('/employee/:dealId/:catId', pmNormalAPI.getEmployListPerProject)
api.get('/get-employee', pmNormalAPI.getEmployListToaddOrRemove)
api.post('/add-employee-to-project', pmNormalAPI.addEmployeeToProject)
api.delete('/removeempnp/:dealId/:catId/:emid/:task/:project/:removeDate', pmNormalAPI.removeEmployeeToProject)

//-------normal project subtask --------
api.post('/addsubtaskto-nproject', pmNormalAPI.addNewSubTaskToProject)
api.put('/update-subtask-status', pmNormalAPI.updateSubtaskStatus)
api.delete('/delete-subtask', pmNormalAPI.deleteSubtask)

//-------normal project task --------
api.post('/addtaskto-nproject', pmNormalAPI.addNewSubTaskToProject)
api.put('/update-task-status', pmNormalAPI.updateSubtaskStatus)
api.delete('/delete-task', pmNormalAPI.deleteTask)

module.exports = api