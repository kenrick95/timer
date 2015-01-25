/*jslint browser:true */
"use strict";
document.addEventListener("DOMContentLoaded", function () {
    var timer = new Timer(),
        frameId = null,
        element = document.getElementById("svg-text");
        // canvas = document.getElementById("timer"),
        //ctx = canvas.getContext('2d');
    //canvas.width = window.innerWidth;
    //ctx.font = '10em "Fira Sans", sans-serif';
    //ctx.fillStyle = "#111";
    function show(timer) {
        // Profiling performance: this is the bottleneck, updating DOM is really costly
        element.textContent = timer.current;
        // updating SVG is fast enough, although some performance drop occurs
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.fillText(timer.current, 0, canvas.height);
    }
    function tick(timer) {
        // console.log(timer);
        show(timer);
        frameId = window.requestAnimationFrame(function () {
            tick(timer);
        });
        // console.log(frameId);
    }
    document.getElementById("start").addEventListener("click", function () {
        timer.start();
        tick(timer);
    });
    document.getElementById("pause").addEventListener("click", function () {
        timer.pause();
        window.cancelAnimationFrame(frameId);
        // console.log(frameId);
    });
    document.getElementById("reset").addEventListener("click", function () {
        timer.reset();
        show(timer);
    });
    window.addEventListener("resize", function () {
        //canvas.width = window.innerWidth;
        //ctx.font = '100pt "Fira Sans", sans-serif';
        show(timer);
    });
}, false);