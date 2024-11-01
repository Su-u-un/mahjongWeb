(function flexible (window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1
  var offsetWid = document.documentElement.clientWidth;
  
   // 组件缩放处理
   function handleComponentZoom() {
    if (window.devicePixelRatio !== 1 && offsetWid > 478) {
      var scaleFactor = window.devicePixelRatio; // 根据浏览器的缩放比例进行调整
      var components = document.querySelectorAll('.zoomable'); // 假设组件有 class "zoomable"
      var header_web = document.querySelector('.header_web');
      var canvas = document.getElementById('canvas_sakura');

      components.forEach(function(component) {
        component.style.transform = 'scale(' + scaleFactor + ')';
        component.style.transformOrigin = 'center'; 
      });

      if (header_web) {
        header_web.style.transform = 'scale(' + scaleFactor + ')';
        header_web.style.transformOrigin = 'top'; // 缩放中心从顶部开始
        header_web.style.position = 'fixed'; // 确保其保持置顶
      }
    }
  }
  // adjust body font size
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit () {
    // // !==1说明当前是缩放功能，不是浏览器窗口的变化
    // if(window.devicePixelRatio!==1){
    //   handleComponentZoom();  // 处理组件缩放
    // }
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
