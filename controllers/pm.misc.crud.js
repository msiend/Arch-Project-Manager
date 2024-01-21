const dbcon = require('../config/db.config')

// misc project employee-------------

exports.getEmpListPerMiscProject = async (req, res) => {
  const { dealId, subtaskId } = req.params
  const q = `SELECT employee.em_id, employee.name, misc_project_employee.mdeal_id, misc_project_employee.mstask_id
  FROM misc_project_employee
  INNER JOIN single_deal ON single_deal.sdid = misc_project_employee.mdeal_id
  INNER JOIN employee ON employee.em_id = misc_project_employee.mpemid
  WHERE misc_project_employee.mdeal_id = ${dealId} AND misc_project_employee.mstask_id = ${subtaskId};`
  dbcon.query(q, (err, results) => {
    if (!err) {
      res.status(200).send(results);
    } else { res.status(500).send({ msg: "Something went wrong!" }) }
  })
}


exports.addEmployeeToMisc = async (req, res) => {
  const { ndeal_id, category_id, emid, dateofassign, title } = req.body
  if (req.body.emid && typeof req.body.emid === "string") {
    const q = `insert into misc_project_employee (mdeal_id, mstask_id, mpemid, dateofassign) values(${ndeal_id}, ${category_id}, ${emid}, '${dateofassign}')`
    await dbcon.query(q, (err, result) => {
      if (!err) {
        res.status(200).send(result)
        let q2 = `INSERT INTO emp_task_notify(emid, title, dateofnotify) VALUES(?,?,?);`
        dbcon.query(q2, [emid, title, dateofassign], (err2, results) => {
          if (!err2) { return; } else { res.status(500).send({ msg: err2 }) }
        })
      } else { res.status(500).send({ msg: "Something went wrong!" }) }
    })
  } else if (req.body.emid) {
    const mp_emp_data = []
    const mp_emp_notify = []
    req.body.emid.forEach((el) => { mp_emp_data.push([req.body.ndeal_id, req.body.category_id, el, dateofassign]) })
    req.body.emid.forEach((el) => { mp_emp_notify.push([el, title, dateofassign]) })
    const q = `insert misc_project_employee (mdeal_id, mstask_id, mpemid, dateofassign) values ?`
    await dbcon.query(q, [mp_emp_data], (err1, data) => {
      if (!err1) {
        let q2 = `INSERT INTO emp_task_notify(emid, title, dateofnotify) VALUES ?;`
        dbcon.query(q2, [mp_emp_notify], (err2, results) => {
          if (!err2) { res.status(200).send(data); }
          else {
            res.status(500).send({ msg: err2 })
          }
        })
      } else {
        console.log(err1);
        res.status(500).send({ msg: 'error occurred' })
      }
    })
  } else {
    res.status(500).send({ msg: 'error occurred' })
  }


}

exports.removeEmployeeToMisc = async (req, res) => {
  const { mdeal_id, mstask_id, mpemid, title, dateofremove } = req.query
  const q = `delete from misc_project_employee where mdeal_id = ${mdeal_id} and mstask_id = ${mstask_id} and mpemid = ${mpemid}`
  await dbcon.query(q, (err, result) => {
    if (!err) {
      res.status(200).send({ msg: "Removed successfully!" })
      let q2 = `INSERT INTO emp_task_notify(emid, title, dateofnotify) VALUES(?,?,?);`
      dbcon.query(q2, [mpemid, title, dateofremove], (err2, results) => {
        if (!err2) { return; } else { res.status(500).send({ msg: err2 }) }
      })
    } else { res.status(500).send({ msg: "Something went wrong!" }) }
  })
}


//-----misc project subtask ---------------
exports.updateMiscTaskStatus = async (req, res) => {
  const { mdeal_id, mstask_id, mstask_status, dateofstatus } = req.body
  let q = mstask_status != 'completed' ? `update misc_project_subtask set mstask_status ='${mstask_status}' where mdeal_id=${mdeal_id} and mstask_id=${mstask_id}` : `update misc_project_subtask set mstask_status ='${mstask_status}', dateofcomplete='${dateofstatus}' where mdeal_id=${mdeal_id} and mstask_id=${mstask_id}`
  await dbcon.query(q, (err, results) => {
    if (!err) {
      res.status(200).send({ msg: "status updated successfully" })
    } else { res.status(500).send(err) }
  })
}

exports.getProjectsStaus = (req, res) => {
  let q = 'SELECT misc_project_subtask.mdeal_id ,misc_project_subtask.mstask_status as project_status FROM `single_deal` INNER JOIN misc_project_subtask on single_deal.sdid =misc_project_subtask.mdeal_id GROUP BY misc_project_subtask.mdeal_id'
  dbcon.query(q, (err, result) => {
    if (!err) {
      res.status(200).send({ status: true, msg: 'Successfully data retrieve', data: result })

    } else {
      res.status(500).send({ status: false, msg: "Internal error occurs!" });
    }
  })
}

// It res with list of all employees inside a Misc Project
exports.getEmployListPerProject = async (req, res) => {
  const { dealId, catId } = req.params
  const q = `SELECT employee.em_id, employee.name FROM misc_project_employee INNER JOIN employee ON employee.em_id = misc_project_employee.mpemid WHERE misc_project_employee.mdeal_id = ${dealId} AND misc_project_employee.mstask_id=${catId};`
  dbcon.query(q, (err, results) => {
    if (!err) {
      res.status(200).send(results);
    } else { res.status(500).send({ msg: "Something went wrong!" }) }
  })
}