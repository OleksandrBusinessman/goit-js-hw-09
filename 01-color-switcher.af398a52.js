const e=document.querySelector("body"),t=document.querySelector("[data-start]"),d=document.querySelector("[data-stop]");let a=null;function n(){e.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}d.disabled=!0,t.addEventListener("click",(function(){t.disabled=!0,d.disabled=!1,a=setInterval(n,1e3)})),d.addEventListener("click",(function(){t.disabled=!1,d.disabled=!0,clearInterval(a)}));
//# sourceMappingURL=01-color-switcher.af398a52.js.map
