const register = () => {    
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            navigator.serviceWorker
                .register("/service-worker.js")
                .then(function () {
                    console.log("ServiceWorker registered!");
                })
                .catch(function (e) {
                    console.log(e.message);
                });
        });
    } else {
        console.log("ServiceWorker not supported in this browser");
    }
}

register()