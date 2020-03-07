const tabGroupsElement = document.getElementById('tab-groups');

const defaultTab = createElement('tab.html');
const defaultTabGroup = createElement('tab-group.html');

loadTabGroups();

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