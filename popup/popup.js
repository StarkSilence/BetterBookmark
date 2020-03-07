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
    return browser.tabs.query({highlighted: true, currentWindow: true});
}

function saveAllTabs()
{
    getAllTabs().then(saveTabs);
}

function saveAndCloseAllTabs()
{
    getAllTabs().then(saveAndCloseTabs);
}

function getAllTabs()
{
    return browser.tabs.query({currentWindow: true});
}

function saveTabs(tabs)
{
    const saved = tabs.map(e => createNewTab(e.title, e.url, e.favIconUrl));
    const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

    const tabGroup = { id: id, title: "", tabs: saved };

    browser.storage.sync.get("tabGroups").then((res) =>
    {
        if (!Array.isArray(res.tabGroups))
        {
            res.tabGroups = [];
        }
    
        res.tabGroups.push(tabGroup);
        browser.storage.sync.set({ tabGroups: res.tabGroups });
    });
}

function createNewTab(title, url, iconUrl)
{
    return { title: title, url: url, iconUrl: iconUrl };
}

function saveAndCloseTabs(tabs)
{
    saveTabs(tabs);

    for (const tab of tabs)
    {
        browser.tabs.remove(tab.id);
    }
}