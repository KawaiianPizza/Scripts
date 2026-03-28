// ==UserScript==
// @name        Old Reddit
// @namespace   Violentmonkey Scripts
// @match       https://*.reddit.com/*
// @version     1.0
// @downloadURL https://github.com/KawaiianPizza/Scripts/raw/main/Old%20Reddit.user.js
// @homepageURL https://github.com/KawaiianPizza/Scripts/raw/main/Old%20Reddit.user.js
// @author      KawaiianPizza
// @run-at      document-start
// @description 12/17/2025, 9:56:00 PM
// ==/UserScript==
if (location.host.startsWith("www.") && (document.referrer.search("/comments/") === -1 || location.pathname.search("/comments/") > 0)) {
    location.replace(location.href.replace("www", "old"))
}
if (location.host.startsWith("old.")) {
  const IS_GALLERY = location.pathname.indexOf("comments") === -1
  const LINK_SELECTOR = IS_GALLERY ? ".thing[data-permalink] a.title" : ".usertext-body p > a:not(:has(img))"

  // Process all matching links inside a given container
  function processLinks(container = document) {
    const links = container.querySelectorAll(LINK_SELECTOR)

    setTimeout(()=>{
      if (IS_GALLERY) {
        const url = container.getAttribute("data-permalink")
        if (!url) return
        for (const link of links) {
          link.setAttribute("data-url", url)
          link.href = url
          link.setAttribute("data-url", url)
          link.setAttribute("data-href-url", url)
          link.setAttribute("data-outbound-url", url)
        }
        return
      }
      for (const link of links) {
        if (link.dataset.imageReplaced || link.textContent !== "<image>") continue

        const img = document.createElement("img")
        img.src = link.href
        img.alt = "<image>"
        img.loading = "lazy"
        link.dataset.imageReplaced = "true"
        link.replaceWith(img)
      }
    },0)
  }

  const observerCallback = (mutationsList) => {
    for (const mutation of mutationsList) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue
        if (node.nodeName !== "DIV") continue
        if (!node.classList.contains("thing")) continue
        if(IS_GALLERY) {
          if (node.classList.contains("promoted")) continue
        }
        //console.log(node)
        processLinks(node)
      }
    }
  }

  const observer = new MutationObserver(observerCallback);
  observer.observe(document, { childList: true, subtree: true });
  document.querySelectorAll(".thing[data-permalink]").forEach(e=>processLinks(e))
}
