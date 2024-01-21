let itemNames = document.querySelectorAll(`.nav-lists ul a span`);
let Icons = document.querySelectorAll(`.nav-lists ul a`);
let namue = document.querySelectorAll(`.namue`);
let nav = document.querySelector(`nav`);
let aside = document.querySelector(`aside`);
let ham = document.querySelector(`#ham`);


activate();
function activate() {
    Icons.forEach(function (icon) {
        icon.addEventListener('click', () => {
            Icons.forEach(function (otherIcon) {
                if (otherIcon !== icon) {
                    otherIcon.classList.remove(`active`);
                }
            });
            icon.classList.toggle(`active`);
        });
    });
}

// HMABURGER
if (window.innerWidth < 930) {
    aside.onclick = function () {
        aside.style.display = `none`;
    }
    ham.addEventListener("click", () => {
        aside.style.display = `block`;
        document.querySelector(`#thead`).style.opacity = `1`;
    })
}
else {
    aside.style.display = `block`;
    ham.addEventListener("click", () => {
        document.querySelector(`#thead`).style.opacity = `1`;
        itemNames.forEach(item => {
            item.classList.toggle(`hide`);
        });
        activate();
        namue.forEach(nae => {
            nae.classList.toggle(`hide`);
        })
        nav.classList.toggle(`width`);
        document.querySelector(`.main`).classList.toggle(`width`);
    })
}

//Search Icon

if (window.innerWidth < 780) {
    function searchIcon() {
        document.querySelector(`.search`).style.display = 'block';
        document.querySelector(`.searchIcon`).style.display = `none`;
    }
    document.querySelector(`.close`).onclick = function () {
        document.querySelector(`.search`).style.display = 'none';
        document.querySelector(`.searchIcon`).style.display = `block`;
    }
}


//ACCORDION

document.querySelectorAll(`.accordion-content`).forEach((item, index) => {
    let header = item.querySelector(".ahead");
    header.addEventListener("click", () => {
        item.classList.toggle("open");
        let description = item.querySelector(".adata");
        if (item.classList.contains("open")) {
            // description.style.height = `${description.scrollHeight}px`;
            description.classList.add(`open`);
            document.querySelector(".arrow-down").classList.add(`open`);

        } else {
            // description.style.height = "0px";
            description.classList.remove(`open`);
            document.querySelector(".arrow-down").classList.remove(`open`);
        }
        removeOpen(index);
    })
})
function removeOpen(index1) {
    document.querySelectorAll(`.accordion-content`).forEach((item2, index2) => {
        if (index1 != index2) {
            item2.classList.remove("open");
            let des = item2.querySelector(".adata");
            des.classList.remove(`open`);
        }
    })
}
// CLOSE ALERT WINDOW 
function closeAlert() {
    document.querySelector(`.status`).style.display = `none`;
}

function openNotification() {
    document.querySelector(`.notification-list`).classList.toggle(`hide`);
    document.querySelector(`.notification`).classList.toggle(`active`);
}
function openProfile() {
    document.querySelector(`.account-settings`).classList.toggle(`hide`);
}

// Requester Handler 
class DataCall {
    urlHead = location.origin;
    GET_POST = async (url, method, body, type) => {
        if (method == 'GET') {
            try {
                const fet = await fetch(this.urlHead + url, { method: method })
                const res = await fet.json()
                return res;
            } catch (error) {
                throw new Error('request not proceed !' + error.message)
            }
        } else if (method == 'POST' && body != undefined && type === undefined) {
            try {
                const fet = await fetch(this.urlHead + url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                })
                const res = await fet.json()
                if (fet.ok) { this.GET_Notify('Successfully Done', 'Successfull', 'success') }
                return res;
            } catch (err) {
                throw new Error('request not proceed !' + err.message)
            }
        } else if (type && type == 'form' && body != undefined) {
            try {
                const payload = new URLSearchParams(body);
                const fet = await fetch(this.urlHead + url, {
                    method: method,
                    body: payload
                })
                const res = await fet.json()
                if (fet.ok) { this.GET_Notify('Successfully Done', 'Successfull', 'success') }
                return res;
            } catch (err) {
                throw new Error('request not proceed !' + err.message)
            }
        } else {
            this.GET_Notify('Something Error', 'Invalid Request!', 'error')
            throw new Error('Invalid request !')
        }

    }
}
const req = new DataCall()
async function CheckNotification() {
    let nCtn = document.querySelector('.notification-column')
    let id = document.querySelector('.main').dataset.appId
    let res = await req.GET_POST('/apiv1/get-notifi?id=' + id, 'GET')
    if (res.status) {
        nCtn.innerHTML = ''
        for (const e of res.data) {
            nCtn.innerHTML += ` <p class="notification-name ${e.status}" data-nId="${e.notid}"><span>${e.title}</span>
        <span class="actionBtn"><span class="n-icon" onclick="UpdateNotify('read',${e.notid})"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </svg></span>|<span class="n-icon" onclick="UpdateNotify('removed',${e.notid})"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /> </svg></span></span></p>`}
    }
}
CheckNotification()
async function setUserWorkInfo() {
    let id = document.querySelector('.main').dataset.appId
    let res = await req.GET_POST('/getWorkInfo/' + id, 'GET')
}
// getWorkInfo