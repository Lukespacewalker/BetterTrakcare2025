// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2026-04-08
// @description  try to take over the world!
// @include      https://bhq-tcp-w.bdms.co.th/*
// @author       Suttisak Denduangchai
// @match        https://bhq-tcp-w.bdms.co.th/trakcare/live/web/csp/system.Home.cls
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bdms.co.th
// @grant        GM_addStyle
// @run-at      document-idle
// ==/UserScript==

function addStyles() {
    'use strict';

    GM_addStyle(`
.componentTable td:not(.componentListDynamicPagingSpacer){
padding:0.25rem 0 0 0.2rem;
}

.componentTableItemContainer{
white-space:nowrap;
}

.componentTableItem span span div div:nth-child(3){
display:none;
}
.componentTableItem span span div div:nth-child(1) img{
    width: 14px;
    margin-right: 0.25rem;
}

.clsOEOrdItem_ListLabCummEMRList table th[id^=OEOrdItem_ListLabCummEMRList_][id$=-column-TestItem] {
    min-width: 15rem;
}

.clsOEOrdItem_ListLabCummEMRList table th[id^=OEOrdItem_ListLabCummEMRList_][id$=-column-Units] {
    min-width: 8rem;
}

td.componentTableItemDynamicCell div.custom-abnormal a{
    color:red;
}
    `);
}

function addAbnormalClass(){
    (new MutationObserver(check)).observe(document, {childList: true, subtree: true});

    function check(changes, observer) {
        if(document.querySelector('td.componentTableItemDynamicCell')) {
            // observer.disconnect();
            // actions to perform after #mySelector is found
            const containers = document.querySelectorAll('td.componentTableItemDynamicCell div[style*="display: inline-flex"]');
            containers.forEach(container => {
                // 1. Find the first child div
                const firstDiv = container.querySelector('div:nth-child(1)');
                // 2. Find the second child div
                const secondDiv = container.querySelector('div:nth-child(2)');

                if (firstDiv && secondDiv) {
                    // Check if there is an img with title "Abnormal" (case-insensitive check is safer)
                    const hasAbnormalImg = firstDiv.querySelector('img[title="Abnormal"]');

                    if (hasAbnormalImg) {
                        secondDiv.classList.add('custom-abnormal');
                    }
                }
            });
        }
    }
}

function main(){
    'use strict';

    addStyles();
    addAbnormalClass();
}


if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
} else {
    main();
}
