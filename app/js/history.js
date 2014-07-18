/*
 * event listener
 */
gui.btnCfg.addEventListener('click', function () {
    'use strict';
    if (gui.dspCfg.classList.contains('hidden')) {
        if (stopwatch.state === 'run') {
            stopwatch.init = Date.now();
            stopwatch.state = 'pause';
            gui.notice.textContent = '이어서 계속하려면 클릭!';
        }
        gui.dspCfg.classList.remove('hidden');
    } else {
        gui.dspCfg.classList.add('hidden');
    }
});
