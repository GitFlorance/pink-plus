(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('node_modules/tiny-slider')) :
    typeof define === 'function' && define.amd ? define('index', ['node_modules/tiny-slider'], factory) :
    (global = global || self, factory(global.tns));
}(this, (function (tns) { 'use strict';

    tns = tns && Object.prototype.hasOwnProperty.call(tns, 'default') ? tns['default'] : tns;

    document.addEventListener("DOMContentLoaded", () => {
      const icons = document.querySelectorAll('.js-cross');
      console.log(icons);
      icons.forEach(icon => {
        console.log('go');
        icon.addEventListener('click', event => {
          icon.classList.toggle("open");
        });
      });
      document.querySelectorAll('.js-btn-menu').forEach(btn => {
        btn.addEventListener('click', event => {
          console.log(event);
          document.getElementById("myDropdown").classList.toggle("show");
        });
      });
      const slider = tns({
        "container": "#base",
        "items": 3,
        "slideBy": "page",
        "mouseDrag": true,
        "swipeAngle": false,
        "speed": 400
      });
    });

})));
