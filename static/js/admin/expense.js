let BASE_URL = location.href;
let ReqURI = { addUser: BASE_URL + `/add-User`, updUser: BASE_URL + `/Update-User/`, updSubTask: BASE_URL + `/upd-password/` }

function Opn_ExpenseCtn(e,elm) {
    (document.querySelector(`${e}`)).classList.remove(`hide`);
    e == '.uprofile-settings' ? setExpenseToModel(elm) : null
}
function Cls_ExpenseCtn(e) {
    (document.querySelector(`${e}`)).classList.add(`hide`);
    // e == '.uprofile-settings' ? Disable_BtnHandler('.profile-grid', false) : null
}
function AlertNotifier(status, msg, icon) {
    Swal.fire({ title: status ? 'Sucess' : 'Error', text: msg, icon: icon, confirmButtonText: 'Done' });
}
function setExpenseToModel(e) {
}

// ReqHandler Data  
// User Requestes To API
let ReqHandler = {
    GET: async function (url) {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        });
        return response.json();
    }, POST: async function (url, data) {
        console.log(url, data);
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data)
        });
        return response.json();
    }, PUT: async function (url, data) {
        console.log(JSON.stringify(data));
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data)
        });
        return response.json();
    }, DEL: async function (url) {
        const response = await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        });
        return response.json();
    }
}

function addExpense() {
    let user = document.getElementsByClassName('userform')[0]
    let dataObj = {
        Name: user.querySelector('#name').value,
        jobRole: user.querySelector('#designation').value,
        Number: user.querySelector('#cnumber').value,
        Email: user.querySelector('#email').value,
        Password: user.querySelector('#password').value
    }
    ReqHandler.POST(ReqURI.addUser, dataObj)
        .then((res) => {
            console.log(res);
            if (res.status == true) {
                AlertNotifier(res.status, res.msg, 'success');
                Cls_UserCtn('.uprofile-settings')
                Disable_BtnHandler('.profile-grid', false)
                Cls_UserCtn('.usform')
                setTimeout(() => {
                    location.reload()
                }, 2000);
            } else {
                AlertNotifier(res.status, res.msg, 'error');
            }
        }).catch(err => {
            console.log('Error(fn-UserAdd):', err);
        })
}
function updExpense() {
    let user = document.getElementsByClassName('profile-grid')[0]
    let u_id = user.parentElement.parentElement.dataset.id
    let dataObj = {
        name: user.querySelector('#name').value,
        job_role: user.querySelector('#designation').value,
        number: user.querySelector('#cnumber').value,
        email: user.querySelector('#email').value,
    }
    ReqHandler.PUT(ReqURI.updUser + u_id, dataObj)
        .then((res) => {
            console.log(res);
            if (res.status == true) {
                AlertNotifier(res.status, res.msg, 'success');
                setTimeout(() => {
                    location.reload()
                }, 2000);
            } else {
                AlertNotifier(res.status, res.msg, 'error');
            }
        }).catch(err => {
            console.log('Error(fn-UserUpdate):', err);
        })
}