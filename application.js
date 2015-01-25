/*jslint browser:true */
// Note: if I always compare currentTime to startTime, problem started when there is pause/resume feature, which make me need to track what time to compensate for the pause->resume time difference
// Let's make thing simple, I'll only track the time difference.
// rAF relies on FPS too much; when FPS is down, the timer will be inaccurate: start -> tab out of focus -> fps goes down (as set by browser) -> inaccurate
// YES, I THINK NOW I NEED TO TRACK PAUSE/RESUME TIME FOR 100% ACCURACY
// WAIT WAIT WAIT; if the tick interval slows down, the time tracking still accurate since it measures the interval every tick; and the interval are not fixed.
"use strict";
var Timer = function () {
    this.reset();
};
Timer.data = {
    startTime: null, // ASSUME: time of last resume
    prevTime: null,
    currentTime: null,
    endTime: null, // ASSUME: time of last pause
    current: 0, // current time difference, time tracking here; integer
    run: null
};
Timer.prototype.start = function () {
    this.resume();
};
Timer.prototype.resume = function () {
    this.run = true;
    this.startTime = new Date();
    this.prevTime = this.startTime;
    this.tick();
};
Timer.prototype.tick = function () {
    if (!this.run) {
        return;
    }
    this.currentTime = new Date();
    this.current += this.currentTime - this.prevTime;
    this.prevTime = this.currentTime;
    // console.log(this.current);
    // NOTE: rAF is not widely supported
    if (!!window.requestAnimationFrame) {
        window.requestAnimationFrame(this.tick.bind(this));
    } else {
        window.setTimeout(this.tick.bind(this), 16); // 1000ms / 60; 60 fps
    }
};
Timer.prototype.end = function () {
    this.pause();
};
Timer.prototype.pause = function () {
    this.run = false;
    this.endTime = new Date();
};
Timer.prototype.reset = function () {
    this.run = false;
    this.startTime = null;
    this.current = 0;
};
