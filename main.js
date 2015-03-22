/*jslint browser:true */
"use strict";
document.addEventListener("DOMContentLoaded", function () {
    var timer = new Timer(),
        frameId = null,
        // element = document.getElementById("svg-text"),
        canvas = document.getElementById("timer"),
        ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    ctx.font = '10em "Fira Sans", sans-serif';
    ctx.fillStyle = "#111";
    function pad(number, digits) {
        if (digits === undefined || digits < 2) {
            digits = 2;
        }
        if (number < Math.pow(10, digits - 1)) {
            var ret = "", i;
            for (i = 0; i < digits - 1; i += 1) {
                ret = "0" + ret;
            }
            return ret + number;
        }
        return number;
    }
    function parse(time) {
        var ms = time % 1000, s, mins, hrs;
        time = parseInt(time / 1000, 10);
        s = time % 60;
        time = parseInt(time / 60, 10);
        mins = time % 60;
        time = parseInt(time / 60, 10);
        hrs = time;
        return pad(hrs, 3) + ":" + pad(mins) + ":" + pad(s) + "." + pad(ms, 3);
    }
    function show(timer) {
        // Profiling performance: this is the bottleneck, updating DOM is really costly
        // element.textContent = timer.current;
        // updating SVG is fast enough, although some performance drop occurs
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText(parse(timer.current), 0, canvas.height);
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
        canvas.width = window.innerWidth;
        ctx.font = '100pt "Fira Sans", sans-serif';
        show(timer);
    });
}, false);