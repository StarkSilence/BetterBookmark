$(document).ready(() =>
{
    this.tabGroupsElement = document.getElementById('tab-groups');

    loadTabGroups();

    browser.storage.onChanged.addListener(reloadTabGroups);
});

function reloadTabGroups()
{
    tabGroupsElement.innerHTML = '';
    loadTabGroups();
}

function loadTabGroups()
{
    browser.storage.sync.get('tabGroups').then((res) => 
    {
        for (const tabGroup of res.tabGroups)
        {
            tabGroupsElement.appendChild(createTabGroup(tabGroup));
        }
    });
}