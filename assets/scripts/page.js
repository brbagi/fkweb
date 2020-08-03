
const checkUserData = async () => {
    if (localStorage === undefined) {
        //error
    } else {
        await openLoading()
        setTimeout(() => {
            const name = localStorage.getItem('name')
            if(name){
                openMainPage()
                return true
            } else {
                openStartPage()
                return false
            }
        }, 2000);
    }
}

const openLoading = async () => {
    const loadingPage = await fetch('/component/pages/loading.html')
    const loadingPageHtml = await loadingPage.text()
    const container = document.querySelector('.container').innerHTML = loadingPageHtml
}

const openStartPage = async () => {
    const startPage = await fetch('/component/pages/start.html')
    const startPageHtml = await startPage.text()
    document.querySelector('.container').innerHTML = startPageHtml
}

const openMainPage = async () => {
    const mainPage = await fetch('/component/pages/main.html')
    const mainPageHtml = await mainPage.text()
    document.querySelector('.container').innerHTML = mainPageHtml
    loadActByDate(formatDate(Date.now()))
    setTodayToDateInput()
    userNameHeader()
}

const startFk = () => {
    const input = document.getElementById('name-input').value
    if(input.replace(/\s/g, '') !== "") {
        localStorage.setItem('name', input)
        checkUserData()
    }
}

checkUserData()
