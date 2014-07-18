/*
 * clock animation
 */
var stopwatch = {
    context  : gui.canvas.getContext('2d'),
    total    : 3600,    // 1 hour
    partial  : 0,       // time passed
    state    : 'ready',
    init     : 0,       // beginning of current phase
    now      : 0,       // current time

    x        : gui.canvas.width / 2,
    y        : gui.canvas.height / 2,
    r        : gui.canvas.width / 4,  // radius
    fgColor  : '#ffaf00',
    bgColor  : '#ffd36d',
    initAngle: Math.PI * -0.5
};
var update = function (sw) {
    'use strict';
    var interval = 1000, // millisecond
        delta;
    if (sw.partial < sw.total && sw.state === 'run') {
        sw.now = Date.now();
        delta = sw.now - sw.init;
        if (delta > interval) {
            sw.partial += delta / interval;
            delta %= interval;
            sw.init = sw.now - delta;
        }
    } else if (sw.state === 'run') {
        sw.state = 'stop';
        window.alert('짝짝짝! 오늘의 할 일 끝!');
    }
};
var drawBack = function (sw) {
    'use strict';
    sw.context.beginPath();
    sw.context.arc(sw.x, sw.y, sw.r * 1.99, 0, Math.PI * 2);
    sw.context.fillStyle = sw.bgColor;
    sw.context.fill();
};
var drawRuler = function (sw) {
    'use strict';
    var num = sw.total / (60 * 15), // every 15 minutes
        i = 0,
        theta,
        x1,
        x2,
        y1,
        y2,
        r1 = sw.r * 2,
        r2 = r1 - 10;

    if (sw.total / (60 * 15)) { return; }

    sw.context.lineWidth = 0.25;
    sw.context.strokeStyle = '#000';
    for (i; i < num; i += 1) {
        theta = Math.PI * 2 * i / num;
        x1 = r1 * Math.cos(theta) + sw.x;
        y1 = r1 * Math.sin(theta) + sw.y;
        x2 = r2 * Math.cos(theta) + sw.x;
        y2 = r2 * Math.sin(theta) + sw.y;
        sw.context.beginPath();
        sw.context.lineTo(x1, y1);
        sw.context.lineTo(x2, y2);
        sw.context.stroke();
        sw.context.closePath();
    }
};
var drawWatch = function (sw) {
    'use strict';
    var ratio = sw.partial / sw.total,
        endAngle = Math.PI * (2 * ratio - 0.5);
    sw.context.beginPath();
    sw.context.arc(sw.x, sw.y, sw.r, sw.initAngle, endAngle, false);
    sw.context.lineWidth = sw.r * 2;
    sw.context.strokeStyle = sw.fgColor;
    sw.context.stroke();
    sw.context.closePath();
};
var draw = function (sw) {
    'use strict';
    drawBack(sw);
    drawRuler(sw);
    drawWatch(sw);
};
var animate = function () {
    'use strict';
    stopwatch.context.clearRect(0, 0, gui.canvas.width, gui.canvas.height);
    update(stopwatch);
    draw(stopwatch);

    window.requestNextAnimationFrame(animate);
};
animate();

/*
 * event listener
 */
gui.btnBig.addEventListener('click', function () {
    'use strict';
    stopwatch.init = Date.now();
    switch (stopwatch.state) {
    case 'ready':
        if (!gui.total.value) { gui.total.value = 1; }
        stopwatch.total *= gui.total.value;
    case 'pause':
        stopwatch.init = Date.now();
        stopwatch.state = 'run';
        gui.notice.textContent = '';
        break;
    case 'run':
        stopwatch.state = 'pause';
        gui.notice.textContent = '이어서 계속하려면 클릭!';
        break;
    default:
        window.alert('오늘은 끝!');
    }
});
