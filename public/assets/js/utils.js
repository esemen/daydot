/**
 @desc: Creates an http request with native XMLHttpRequest object
 @param: method
 @param: url
 @param: body
 @param: extraParams
 @param: callback
 @author: oesemen
 **/
function request(method, url, body = null, extraParams = null, cb = null){
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhr.onload = function () {
        cb(this, extraParams)
    };

    xhr.onerror = function(err){
        alert("somethings went wrong")
    }

    xhr.send(body);
}

/**
 @desc: tpl function get template html with {variable} and returns rendered.
 @param: e template
 @param: t object
 @author: oesemen
 **/
function tpl(e, t) {
    return e.replace(/\{([\w\.]*)\}/g, function (e, n) {
        var r = n.split("."), i = t[r.shift()];
        for (var s = 0, o = r.length; s < o; s++) i = i[r[s]];
        return typeof i !== "undefined" && i !== null ? i : ""
    })
}
