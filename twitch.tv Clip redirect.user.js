// ==UserScript==
// @name        twitch.tv Clip redirect
// @namespace   Violentmonkey Scripts
// @match       https://www.twitch.tv/*/clip/*
// @version     1.0
// @author      Kawaiian Pizza
// @run-at      document-start
// @downloadURL https://github.com/KawaiianPizza/Scripts/raw/main/twitch.tv%20Clip%20redirect.user.js
// @homepageURL https://github.com/KawaiianPizza/Scripts/raw/main/twitch.tv%20Clip%20redirect.user.js
// @description 12/16/2025, 12:43:59 PM
// ==/UserScript==
location = `https://clips.twitch.tv${location.pathname.slice(location.pathname.lastIndexOf('/'))}`
