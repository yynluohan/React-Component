import './toast.css';

export let ToastTips = function (text, timeout, options) {

    //如果已经弹出一个了，那么就先移除，这边只会有一个
    try {
        document.body.removeChild(document.querySelector('div.toast-frame'));
    } catch (e) {

    }

    //开始创造
    var timeout = timeout || 3000;

    let toastFrame = document.createElement('DIV');
    toastFrame.classList.add('toast-frame');
    toastFrame.style.animationDuration = timeout / 1000 + 's';
    toastFrame.style['background-color'] = 'rgba(0, 0, 0, 0)';
    toastFrame.style['position'] = 'fixed';
    toastFrame.style['top'] = '0';
    toastFrame.style['right'] = '0';
    toastFrame.style['bottom'] = '0';
    toastFrame.style['left'] = '0';
    toastFrame.style['display'] = 'flex';
    toastFrame.style['justify-content'] = 'center';
    toastFrame.style['align-items'] = 'center';
    toastFrame.style['padding'] = '0 20px';
    toastFrame.style['z-index'] = 9999998;

    let toast = document.createElement('DIV');
    toast.classList.add('toast-it');
    let content = document.createTextNode(text);
    toast.appendChild(content);
    toast.style.animationDuration = timeout / 1000 + 's';

    for (let prop in options) {
        toast.style[prop] = options[prop];
    }
    //窗口样式
    toast.style['background-color'] = '#4D4D4D';
    // toast.style['color'] = '#F4F4F4';
    toast.style['color'] = '#fff';
    toast.style['padding'] = '12px 20px';
    toast.style['border-radius'] = '6px';
    toast.style['text-align'] = '#555555';
    toast.style['font-size'] = '16px';
    // toast.style['transform'] = 'translate(-50%, -80%)';
    // toast.style['animation-name'] = 'TOAST-APPEAR';
    // toast.style['background-timing-function'] = 'ease-in';
    // toast.style['background-duration'] = '3s';

    //TOAST-APPEAR
    // toast.style['@keyframes TOAST-APPEAR'] = '0%{opacity:0;}15%{opacity:1;}80%{opacity:1;top:80%;}100%{opacity:0;top:75%;}';

    //别被挡住了
    // toast.style['z-index'] = 9999999;
    toastFrame.appendChild(toast);
    document.body.appendChild(toastFrame);
    setTimeout(function () {
        try {
            toastFrame.removeChild(toast);
            document.body.removeChild(toastFrame);
        } catch (e) {

        }
    }, timeout);

}
