/*
 * GUI
 */
var gui = {
    today : document.getElementById('today'),
    total : document.getElementById('total'),
    canvas: document.getElementById('cvs'),
    btnBig: document.getElementById('btnBig'),
    notice: document.getElementById('notice'),
    btnCfg: document.getElementById('btnCfg'),
    dspCfg: document.getElementById('dspCfg')
};
gui.today.textContent = (new Date()).toLocaleDateString('ko-KR');

/*
 * using IndexedDB
 */
window.indexedDB      = window.indexedDB ||
                        window.webkitIndexedDB ||
                        window.mozIndexedDB ||
                        window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction ||
                        window.webkitIDBTransaction ||
                        window.msIDBTransaction;
window.IDBKeyRange    = window.IDBKeyRange ||
                        window.webkitIDBKeyRange ||
                        window.msIDBKeyRange;
if (!window.indexedDB) {
    window.alert("This browser doesn't support a stable version of IndexedDB. History feature will not be available.");
}
var idbReq = window.indexedDB.open('DailyTimeTracker', 1);
