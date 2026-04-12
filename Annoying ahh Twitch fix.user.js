// ==UserScript==
// @name        Annoying ahh Twitch fix
// @namespace   Violentmonkey Scripts
// @match       https://www.twitch.tv/*/clip/*
// @match       https://www.twitch.tv/popout/*/guest-star
// @version     1.2.0
// @author      Kawaiian Pizza
// @run-at      document-start
// @downloadURL https://github.com/KawaiianPizza/Scripts/raw/main/Annoying%20ahh%20Twitch%20fix.user.js
// @homepageURL https://github.com/KawaiianPizza/Scripts/raw/main/Annoying%20ahh%20Twitch%20fix.user.js
// @description 12/16/2025, 12:43:59 PM
// ==/UserScript==

if(location.pathname.endsWith('/guest-star'))
  Object.defineProperty(navigator, 'userAgent', { get: () => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36' })
else
  location.replace(`https://clips.twitch.tv${location.pathname.slice(location.pathname.lastIndexOf('/'))}`)
