// ==UserScript==
// @name        Full theater mode - youtube.com
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/*
// @run-at      document-body
// @version     1.2.14
// @downloadURL https://kawaiian.pizza/YouTube Theater Mode.user.js
// @homepageURL https://kawaiian.pizza/YouTube Theater Mode.user.js
// @author      Kawaiian Pizza
// @description 4/4/2022, 9:16:34 PM
// ==/UserScript==
const style = document.createElement('style')
document.body.append(style)

let app;
let flexyPlayer;
let observer = new MutationObserver(function(mutations) {
  UpdateApp()
})

let wait = setInterval(()=>{
  if(!document.querySelector('ytd-watch-flexy'))
    return
  app = document.querySelector('ytd-app')
  flexyPlayer = document.querySelector('ytd-watch-flexy')
  UpdateApp()
  observer.observe(flexyPlayer, { attributes: true, attributeFilter: ['hidden', 'theater', 'fullscreen']})
  console.log('Clear wait loop')
  clearInterval(wait)
},1)

async function UpdateApp() {
  document.location.pathname.match(/\/(?:watch|clip)/)
  ? app.setAttribute('is-video-page','')
  : app.removeAttribute('is-video-page')

  flexyPlayer.hasAttribute('theater')
  ? app.setAttribute('theater','')
  : app.removeAttribute('theater')

  flexyPlayer.hasAttribute('fullscreen')
  ? app.setAttribute('fullscreen','')
  : app.removeAttribute('fullscreen')

  app.hasAttribute('masthead-hidden') || app.removeAttribute('style')
  const wide = await cookieStore.get({ name: "wide", domain: "youtube.com" })
  if(!wide?.expires)
    cookieStore.set({ ...wide, expires: 2147487247000 })
  document.querySelectorAll('*[darker-dark-theme-deprecate],*[darker-dark-theme]').forEach(e=>{e.removeAttribute('darker-dark-theme-deprecate'); e.removeAttribute('darker-dark-theme')})
}
style.textContent = `
ytd-app[is-video-page][theater]>#content>#page-manager {
--header-size: 56px;
}`

// Full theater
style.textContent += `
ytd-app[is-video-page][theater] :is(#player-theater-container, #player-wide-container, #ytd-player) {
max-height: calc(100vh - var(--header-size)) !important;
max-width: max-content !important;
margin: 0 auto !important;
height: unset !important;
min-height: unset !important;
}
ytd-app[is-video-page][fullscreen] :is(#player-theater-container, #player-wide-container, #ytd-player) {
max-width: 100% !important;
}
ytd-app[is-video-page][theater] :is(.html5-video-container>video, #player-full-bleed-container) {
position: unset !important;
height: calc(min(100vh, calc(100vw * calc(var(--ytd-watch-flexy-height-ratio) / var(--ytd-watch-flexy-width-ratio)))) - var(--header-size)) !important;
max-height: 100vh !important;
width: auto !important;
background: unset !important;
}
#player-theater-container>#player-container, #player-wide-container>#player-container {
position: unset !important;
}
#full-bleed-container {
height: unset !important;
max-height: unset !important;
background: unset !important;
}
.html5-video-container {
text-align: -webkit-center !important;
}
#cinematics>div>div {
transform: scale(4, 2) !important;
}
`

// Hidden header
style.textContent += `
ytd-app[is-video-page][theater]>#content>#page-manager {
--header-size: 0px;
margin-top: var(--header-size) !important;
}
ytd-app[is-video-page][theater]>#content>#masthead-container {
opacity: 0.001 !important;
transition: opacity .1s cubic-bezier(0.4,0,1,1) !important;
}
ytd-app[is-video-page][theater]>#content>#masthead-container:hover {
opacity: 1 !important;
transition: opacity .25s cubic-bezier(0,0,0.2,1) !important;
}
ytd-app[is-video-page][theater]:not([fullscreen]) :is(.ytp-chrome-top,.iv-drawer>div,.html5-video-info-panel) {
margin-top: calc(56px - var(--header-size)) !important;
}`

// Hidden end cards
style.textContent += `
#movie_player:hover>.ytp-ce-element {
display: block !important;
}
#movie_player>.ytp-ce-element {
display: none !important;
}`
