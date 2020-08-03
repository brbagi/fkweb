const dbPromised = idb.open("fastabiqulkhoirot", 1, upgradeDb => {
    const db = upgradeDb.createObjectStore("activities", {
        keyPath: "create"
    });
    db.createIndex("date", "date", { unique: false });
});

const saveAct = async (title, desc, check, date) => {
    try {
        dbPromised.then(async (db) => {
            const create = Date.now()
            const data = {create, title, desc, check, date}
            const transaction = db.transaction("activities", "readwrite");
            const store = transaction.objectStore("activities");
            store.add(data);
            return transaction.complete;
        }).then(() => {
            //complete
        })
    } catch (e) {
        console.log(e);
    }
}

const getActByCreate = (create) => {
    return new Promise((resolve, reject) => {
        try {
            dbPromised
            .then(db => {
                var tx = db.transaction("activities", "readonly");
                var store = tx.objectStore("activities");
                return store.get(create);
            })
            .then(activity => {
                resolve(activity);
            });
        } catch (e) {
            reject(e)
        }
    });
}

const getManyActByDate = (date) => {
    return new Promise((resolve, reject) => {
        try {
            dbPromised
            .then(db => {
                const tx = db.transaction("activities", "readonly");
                const store = tx.objectStore("activities");
                const index = store.index('date')
                return index.getAll(date)
            })
            .then(activity => {
                resolve(activity);
            });
        } catch (e) {
            reject(e)
        }
    });
}

const updateChecked = async (create, check) => {
    try {
        let act = await getActByCreate(create)
        act.check = check
        console.log(act);

        dbPromised.then(async (db) => {
            const transaction = db.transaction("activities", "readwrite");
            const store = transaction.objectStore("activities");
            store.put(act);
            return transaction.complete;
        }).then(() => {
            //complete
        })
    } catch (e) {
        console.log(e);
    }
}

const deleteAct = async (create) => {
    dbPromised
        .then(db => {
            var tx = db.transaction("activities", "readwrite");
            var store = tx.objectStore("activities");
            store.delete(create);
            return tx.complete
        })
        .then(() => {
            //success deleted
        });
}
