!function e(r,n,t){function o(a,u){if(!n[a]){if(!r[a]){var c="function"==typeof require&&require;if(!u&&c)return c(a,!0);if(i)return i(a,!0);var f=new Error("Cannot find module '"+a+"'");throw f.code="MODULE_NOT_FOUND",f}var d=n[a]={exports:{}};r[a][0].call(d.exports,function(e){var n=r[a][1][e];return o(n?n:e)},d,d.exports,e,r,n,t)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<t.length;a++)o(t[a]);return o}({1:[function(e,r,n){function t(e,r,n,t){var o='<canvas id="'+e+'" width="'+n+'" height="'+t+'"></canvas>';document.getElementById(r).innerHTML=o;var i=document.getElementById(e),a=i.getContext("2d");a.beginPath(),a.arc(95,50,40,0,2*Math.PI),a.stroke()}t("doodler-canvas","doodler-container",800,600)},{}]},{},[1]);
//# sourceMappingURL=doodler.js.map
