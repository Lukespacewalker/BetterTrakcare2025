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
img[title=Abnormal]{
    width: 14px;
    margin-right: 0.25rem;
}

.clsOEOrdItem_ListLabCummEMRList table th[id^=OEOrdItem_ListLabCummEMRList_][id$=-column-TestItem] {
    min-width: 15rem;
}

.clsOEOrdItem_ListLabCummEMRList table th[id^=OEOrdItem_ListLabCummEMRList_][id$=-column-Units] {
    min-width: 8rem;
}

.custom-abnormal a{
    color:red;
}

.custom-highlight{
    background-color: hsl(175.18deg 100% 21.96% / 15%);
}

.custom-today{
    background-color:rgba(255, 231, 155, 0.8);
}

.custom-today{
position:relative;
}

.custom-today::after{
content: "Current";
opacity: 0.3;
font-size: 1.5rem;
position:absolute;
top:50%;
transform: translate(0,-50%);
right:6px;
}
    `);
}

function addAbnormalClass(){
    if(document.querySelector('td.componentTableItemDynamicCell')) {
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

function markTodayColumn(){
    const dateSpan = document.querySelector('#PAPerson_Banner-row-0-item-BANNERPAADMAdmDate');
    let date = null;
    if(dateSpan) {
        date = dateSpan.innerText;
    }

    const componentTableHeaderWrappers = document.querySelectorAll('div.componentTableHeaderWrapper');
    componentTableHeaderWrappers.forEach(wrapper =>{
        const span = wrapper.querySelector("span");
        if(span.innerText.includes(date)){
            wrapper.parentNode.classList.add('custom-today');
        }
    })
}

function highlightFrequentlyUsedMenu(){
    const higlightMenu = ["Observations and Monitoring", "Order DF", "Diagnosis", "Radiology Results",
                          "Other Investigation","Laboratory Results","Laboratory Cumulative Result"]
    const menuCaptions = document.querySelectorAll('div.chartMenuItemCaption');
    menuCaptions.forEach(menuCaption=>{
        if(higlightMenu.includes(menuCaption.innerText)){
            // chartMenuSelected chartMenuItemExpanded custom-highlight chartItemHasData
            if(menuCaption.parentNode.classList.contains("chartMenuSelected")){
                return;
            }
            if(menuCaption.parentNode.classList.contains("chartItemHasData") || menuCaption.innerText==="Diagnosis"){
                menuCaption.parentNode.classList.add('custom-highlight');
            }
        }
    })
}

function main(){
    'use strict';

    addStyles();

    (new MutationObserver(check)).observe(document, {childList: true, subtree: true});
    function check(changes, observer) {
        addAbnormalClass();
        markTodayColumn();
        highlightFrequentlyUsedMenu();
    }
}


if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
} else {
    main();
}
