const originalDate = formatDate(Date.now());
let currentDate = formatDate(Date.now());

//listener
const checkedClick = (create) => {
    const check = document.getElementById(`cb-act${create}`).checked
    updateChecked(create, check)
}

const openNewActForm = () => {
    const article = document.getElementById('new-card-article')
    article.innerHTML = `
    <div class="new-form">
        <div class="level is-mobile">
            <div class="level-right"></div>
            <div class="level-left">
                <a><ion-icon name="close-circle" class="lclosew" onclick="closeNewActForm()"></ion-icon></a>
            </div>
        </div>
        <textarea id="title-area" class="textarea has-fixed-size area-title" rows="2" maxlength="30"
            placeholder="Tulis Judul kegiatan disini"></textarea>
        <textarea id="desc-area" class="textarea has-fixed-size" rows="3"
            placeholder="Tuliskan deskripsi dari kegiatan yang ingin kamu lakukan tersebut disini"
            maxlength="75"></textarea>
        <a><div class="btn-add-new" onclick="addNewAct()">Tambah</div></a>
    </div>
    `
}

const closeNewActForm = () => {
    const article = document.getElementById('new-card-article')
    article.innerHTML = `
    <div class="add-new">
        <a><ion-icon class="add-icon" name="add-circle" onclick="openNewActForm()"></ion-icon></a>
    </div>
    `
}

const addNewAct = async () => {
    const title = document.getElementById('title-area').value
    const desc = document.getElementById('desc-area').value
    const check = false
    const date = formatDate(currentDate)
    saveAct(title, desc, check, date)
    reloadActivities()
}

const removeAct = async (create) => {
    await deleteAct(create);
    const article = document.getElementById(`article-${create}`)
    article.remove()
}


const loadActByDate = async (date) => {
    const result = await getManyActByDate(date)
    removeNewActArticle()
    for (let i = 0, len = result.length; i < len; i++) {
        const act = result[i]
        renderNewAct(act.create, act.title, act.desc, act.check)
    }
    addNewActArticle()
}

const reloadActivities = () => {
    document.getElementById('act-container').innerHTML = " "
    loadActByDate(currentDate)
}

const renderNewAct = (create, title, desc, check) => {
    let checked = ''
    if (check === true) { checked = 'checked' }

    document.getElementById('act-container').innerHTML += `
    <article id="article-${create}" class="column is-full-mobile is-one-third-tablet is-one-quarter-desktop is-one-quarter-widescreen is-one-quarter-fullhd">
        <div create="${create}" class="card">
            <div class="level is-mobile">
                <div class="level-left">
                    <ion-icon name="close-circle" class="lclose" onclick="removeAct(${create})"></ion-icon>
                </div>
                <div class="level-right">
                    <label class="switch">
                        <input id="cb-act${create}" type="checkbox" ${checked} onclick='checkedClick(${create})';>
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <h3>${title}</h3>
            <p>${desc}</p>
        </div>
    </article>
    `
}


//new act article
const removeNewActArticle = () => {
    const element = document.getElementById('new-card-article')
    if (element) {
        element.remove()
    }
}

const addNewActArticle = () => {
    document.getElementById('act-container').innerHTML += `
    <article id="new-card-article" class="column is-full-mobile is-one-third-tablet is-one-quarter-desktop is-one-quarter-widescreen is-one-quarter-fullhd">
        <div class="add-new">
            <a><ion-icon class="add-icon" name="add-circle" onclick="openNewActForm()"></ion-icon></a>
        </div>
    </article>
    `
}

//header
const dateHeaderChange = () => {
    const dateHeader = document.getElementById('date-header');
    dateHeader.innerHTML = new Date(currentDate).toDateString();

    const greeting = document.getElementById('user-greeting');
    if(currentDate === originalDate) {
        greeting.innerHTML = 'Apa yang ingin kamu lakukan hari ini?'
    } else {
        greeting.innerHTML = 'Rencanakan dan catat aktifitas di hari-harimu!'
    }
}

const userNameHeader = () => {
    const userName = document.getElementById('user-name')
    userName.innerHTML = `${localStorage.getItem('name')},`
}

//date
const setTodayToDateInput = () => {
    const dateInput = document.getElementById('date-input')
    dateInput.value = formatDate(Date.now())
    dateHeaderChange();
}

const dateChange = () => {
    const dateInput = document.getElementById('date-input')
    currentDate = dateInput.value;
    reloadActivities()
    dateHeaderChange();
}


//utils
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}



