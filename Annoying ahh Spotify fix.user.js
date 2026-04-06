// ==UserScript==
// @name        Annoying ahh Spotify fix
// @namespace   Violentmonkey Scripts
// @match       https://open.spotify.com/*
// @version     1.0.1
// @downloadURL https://github.com/KawaiianPizza/Scripts/raw/main/Annoying%20ahh%20Spotify%20fix.user.js
// @homepageURL https://github.com/KawaiianPizza/Scripts/raw/main/Annoying%20ahh%20Spotify%20fix.user.js
// @author      KawaiianPizza
// @description 3/28/2026, 1:27:57 AM
// ==/UserScript==

// Side bar
const sideBarInterval = setInterval(()=>{
  const hide = document.querySelector("button[aria-label=\"Hide Now Playing view\"]")
  if(!hide) return
  clearInterval(sideBarInterval)
  hide.click()
},1)

// Scroll to bottom button
const scrollToBottomInterval = setInterval(()=>{
  const containerDiv = document.querySelector(".main-view-container__scroll-node-child>main")
  if(!containerDiv) return
  clearInterval(scrollToBottomInterval)

  const callback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
      if(mutation.addedNodes.length === 0) continue

      const addedNode = mutation.addedNodes[0]
      if(addedNode.nodeName !== "SECTION") continue

      const rowNode = addedNode.querySelector("div[data-testid=\"action-bar\"]>div[data-testid=\"action-bar-row\"]")
      const newButton = document.createElement("button")
      newButton.className = rowNode.lastChild.previousSibling.className
      newButton.textContent = "Scroll ⭳"
      newButton.addEventListener("click", function() {
        console.log(addedNode)
        const scrollable = addedNode.parentElement.parentElement.parentElement
        const playlist = addedNode.querySelector("div.contentSpacing>div:first-child:has(div[data-testid=\"playlist-tracklist\"])")
        scrollable.scrollTo({ top: playlist.scrollHeight, behavior: "smooth" })
      })

      rowNode.insertBefore(newButton, rowNode.lastChild)
    }
  }

  const observer = new MutationObserver(callback);
  observer.observe(containerDiv, { childList: true });
},1)
