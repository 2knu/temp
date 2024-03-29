let db = new Array();

function create(url) {
    const idx = db.findIndex((currUrl) => url === currUrl);
    if (idx && idx > -1) {
        return idx + 1;
    } else {
        const shortUrlID = db.length + 1;
        db.push(url);
        return shortUrlID;
    }
}

function isValidID(id) {
    return id.match(/^\d+$/gi) != null;

}

function getURL(id) {
    id = parseInt(id) - 1;
    if (!isNaN(id) && db.length >= id) {
        const url = db[id];
        return url;
    } else {
        return;
    }
}

module.exports.create = create;
module.exports.isValidID = isValidID;
module.exports.getURL = getURL;