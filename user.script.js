// ==UserScript==
// @name         Better TrakCare 2025
// @namespace    https://github.com/lukespacewalker
// @version      1.1-2026-04-14
// @description  A userscript to enhance the user interface of TrakCare 2025, a healthcare information system, by adding custom styles and functionalities for better user experience.
// @copyright    2026, Suttisak Denduangchai (https://github.com/lukespacewalker)
// @license      MIT
// @include      https://bhq-tcp-w.bdms.co.th/*
// @author       Suttisak Denduangchai
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bdms.co.th
// @grant        GM_addStyle
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

.custom-button{
    background-color: hsl(175.18deg 100% 21.96%);
    color:white;
    border:none;
    padding:0.25rem 0.5rem;
    border-radius:4px;
    cursor:pointer;
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

function addDocscanAndEclinicalButtons(){
    // access global variable sessionData to grab userCode via sessionData.logonData.userCode
    const userCode = unsafeWindow.sessionData?.logonData?.userCode;
    if(!userCode){
        return;
    }

    const locationId = unsafeWindow.sessionData?.logonData?.locId;
    if(!locationId){
        return;
    }

    const episodeNumber = document.querySelector('#PAPerson_Banner-row-0-item-BANNERPAADMADMNo')?.innerText;
    if(!episodeNumber){
        return;
    }

    const hospitalNumber = document.querySelector('#PAPerson_Banner-row-0-item-BANNERRegistrationNo')?.innerText;
    if(!hospitalNumber){
        return;
    }

    // select the before last td element in the banner table and add two buttons for Docscan and Eclinical
    const bannerTable = document.querySelector('#tPAPerson_Banner');
    const targetTd = bannerTable.querySelector('td:nth-last-child(2)');
    // if the buttons container already exists, return
    if(document.querySelector('#custom-buttons-container')){
        return;
    }
    // append div with id of custom-buttons-container to the target td
    const buttonsContainer = document.createElement('div');
    buttonsContainer.id = 'custom-buttons-container';
    buttonsContainer.classList.add('componentTableItemColumnRow');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.gap = '0.5rem';
    targetTd.appendChild(buttonsContainer);
    // create Docscan button
    const docscanButton = document.createElement('button');
    docscanButton.innerText = 'Docscan';
    docscanButton.classList.add('custom-button');

    const formattedHospitalNumber = hospitalNumber.replace(/-/g, '');
    docscanButton.addEventListener('click', () => {
        window.open(`https://dscanweb.bdms.co.th/docview?hn=${formattedHospitalNumber}&uid=${userCode}&location=01HPC`, '_blank');
    });
    buttonsContainer.appendChild(docscanButton);
    // create Eclinical button
    const eclinicalButton = document.createElement('button');
    eclinicalButton.innerText = 'Eclinical';
    eclinicalButton.classList.add('custom-button');
    eclinicalButton.addEventListener('click', () => {
        window.open(`https://bhq-eclinical.bdms.co.th/quippeview/${hospitalNumber}/${episodeNumber}?locationid=${locationId}&userid=${userCode}&securitygroupid=14&agent=tk`, '_blank');
    });
    buttonsContainer.appendChild(eclinicalButton);
}

function addAbnormalClass() {
    if (document.querySelector('td.componentTableItemDynamicCell')) {
        const containers = document.querySelectorAll('td.componentTableItemDynamicCell div[style*="display: inline-flex"]');
        containers.forEach(container => {
            // 1. Find the first child div
            const firstDiv = container.querySelector('div:nth-child(1)');
            // 2. Find the second child div
            const secondDiv = container.querySelector('div:nth-child(2)');

            if (firstDiv && secondDiv) {
                const hasAbnormalImg = firstDiv.querySelector('img[title="Abnormal"]');

                if (hasAbnormalImg) {
                    secondDiv.classList.add('custom-abnormal');
                }
            }
        });
    }
}

function markTodayColumn() {
    const dateSpan = document.querySelector('#PAPerson_Banner-row-0-item-BANNERPAADMAdmDate');
    let date = null;
    if (dateSpan) {
        date = dateSpan.innerText;
    }

    const componentTableHeaderWrappers = document.querySelectorAll('div.componentTableHeaderWrapper');
    componentTableHeaderWrappers.forEach(wrapper => {
        const span = wrapper.querySelector("span");
        if (span.innerText.includes(date)) {
            wrapper.parentNode.classList.add('custom-today');
        }
    })
}

function highlightFrequentlyUsedMenu() {
    const higlightMenu = ["Observations and Monitoring", "Order DF", "Diagnosis", "Radiology Results",
        "Other Investigation", "Laboratory Results", "Laboratory Cumulative Result"]
    const menuCaptions = document.querySelectorAll('div.chartMenuItemCaption');
    menuCaptions.forEach(menuCaption => {
        if (higlightMenu.includes(menuCaption.innerText)) {
            if (menuCaption.parentNode.classList.contains("chartMenuSelected")) {
                return;
            }
            if (menuCaption.parentNode.classList.contains("chartItemHasData") || menuCaption.innerText === "Diagnosis") {
                menuCaption.parentNode.classList.add('custom-highlight');
            }
        }
    })
}

function main() {
    'use strict';
    addStyles();

    (new MutationObserver(action)).observe(document, { childList: true, subtree: true });
    function action(changes, observer) {
        addAbnormalClass();
        addDocscanAndEclinicalButtons();
        markTodayColumn();
        highlightFrequentlyUsedMenu();
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
} else {
    main();
}
