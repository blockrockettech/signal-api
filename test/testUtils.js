function flushDb(db) {
    let keys = [];
    const stream = db.createKeyStream()
        .on('data', function (data) {
            keys.push(data);
        });

    return new Promise((resolve, reject) => {
        stream.on('end', () => {
            keys.forEach((key) => {
                db.del(key);
            });
            resolve(keys);
        });
        stream.on('error', () => reject(new Error('Something went terribly wrong...')));
    });
}


module.exports = {
    flushDb
};
