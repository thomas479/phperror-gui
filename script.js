var uniqid = require('locutus/php/misc/uniqid');
const Entities = require('html-entities').XmlEntities;
var moment = require('moment');
var nl2br = require('nl2br');

function addLog(log, types) {
    var list = $('#errorList');
    var path = log.path;
    const entities = new Entities();
    if (log.path !== undefined) {
        path = entities.encode(log.path);
    }
    var title = log.core;
    if (log.core === undefined) {
        title = log.msg;
    }
    title = entities.encode(title);
    var htmlType = entities.encode(log.type);
    var html = '<article class="' + types[log.type] + '"' +
        'data-path="' + path + '"' +
        'data-line="' + log.line + '"' +
        'data-type="' + types[log.type] + '" ' +
        'data-hits="' + log.hits + '" ' +
        'data-last="' + log.last + '"> ' +
        '<div class="' + types[log.type] + '">' +
        '<i>' + htmlType + '</i> <b>' + title + '</b><br />';

    if (log.more !== undefined) {
        var more = entities.encode(log.more);
        more = nl2br(more, false);
        html += '<p><i>' + more + '</i></p>';
    }

    html += '<p>';

    if (log.path !== undefined) {
        html += entities.encode(log.path) + ', line ' + log.line + '<br>';
    }
    var date = moment(log.last);
    html += 'last seen ' + date.format("dddd, MMMM Do YYYY, h:mm:ss a") + ',' + log.hits + 'hit<br></p>';

    if (log.trace !== undefined) {
        var uid = uniqid('tbq');

        html += '<p><a href="#" class="traceblock" data-for="' + uid + '">Show stack trace</a></p>' +
            '<blockquote id="' + uid + '"><pre><code class="php">' + log.trace + '</code></pre></blockquote>';
    }

    if (log.code !== undefined) {
        var uid = uniqid('cbq');
        html += '<p><a href="#" class="codeblock" data-for="' + uid + '">Show code snippet</a></p>' +
            '<blockquote id="' + uid + '"><pre><code class="php">' + log.code + '</code></pre></blockquote>';
    }

    html += '</div></article>';
    console.log(list);
    $(list).prepend(html);
}

$(function () {
    logs.forEach(function (log) {
        addLog(log, types);
    });
});
