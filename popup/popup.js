document.querySelector('#display-tabs').addEventListener('click', openMainPage);
document.querySelector('#save-this').addEventListener('click', saveThisTab);
document.querySelector('#save-this-close').addEventListener('click', saveAndCloseThisTab);
document.querySelector('#save-selected').addEventListener('click', saveSelectedTabs);
document.querySelector('#save-selected-close').addEventListener('click', saveAndCloseSelectedTabs);
document.querySelector('#save-all').addEventListener('click', saveAllTabs);
document.querySelector('#save-all-close').addEventListener('click', saveAndCloseAllTabs);

function openMainPage()
{
    browser.tabs.create({active: true, url: "/page/main-page.html"});
}

function saveThisTab()
{
    getActiveTab().then(saveTabs);
}

function saveAndCloseThisTab()
{
    getActiveTab().then(saveAndCloseTabs);
}

function getActiveTab()
{
    return browser.tabs.query({active: true, currentWindow: true});
}

function saveSelectedTabs()
{
    getSelectedTabs().then(saveTabs);
}

function saveAndCloseSelectedTabs()
{
    getSelectedTabs().then(saveAndCloseTabs);
}

function getSelectedTabs()
{
    return browser.tabs.query({highlighted: true});
}

function saveAllTabs()
{
    getSelectedTabs().then(saveTabs);
}

function saveAndCloseAllTabs()
{
    getSelectedTabs().then(saveAndCloseTabs);
}

function getAllTabs()
{
    return browser.tabs.query({currentWindow: true});
}

function saveTabs(tabs)
{
    const urls = tabs.map(e => e.url);

    browser.storage.sync.set(urls);
}

function saveAndCloseTabs(tabs)
{
    saveTabs(tabs);

    for (const tab of tabs)
    {
        browser.tabs.remove(tab.id);
    }
}