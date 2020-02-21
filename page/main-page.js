const tabGroupsElement = document.getElementById('tab-groups');

const defaultTab = createElement('tab.html');
const defaultTabGroup = createElement('tab-group.html');

loadTabGroups();

function createElement(path)
{
    let client = new XMLHttpRequest();
    client.open('GET', path, false);
    client.send();
    
    let newElement = document.createElement('div');
    newElement.innerHTML = client.responseText;

    return newElement;
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

function createTabGroup(tabGroup)
{
    let newTabGroup = defaultTabGroup.cloneNode(true);
    
    let tabGroupTitle = findFirstChildByClass(newTabGroup, 'tab-group-title');
    tabGroupTitle.innerHTML = tabGroup.title;
    tabGroupTitle.onblur = () =>
    {
        tabGroupTitle.contentEditable = false;
    };
    tabGroupTitle.onkeydown = (key) =>
    {
        if (key.keyCode == 13 || key.key == 'Enter')
        {
            key.preventDefault();
        }
    };

    let tabGroupRenameButton = findFirstChildByClass(newTabGroup, 'rename-button');
    tabGroupRenameButton.onclick = () =>
    {
        tabGroupTitle.contentEditable = true;
        tabGroupTitle.focus();
    };

    let tabGroupRemoveButton = findFirstChildByClass(newTabGroup, 'remove-button');
    tabGroupRemoveButton.onclick = () =>
    {
        browser.storage.sync.get('tabGroups').then((res) =>
        {
            let index = res.tabGroups.findIndex((tg) => tg.id == tabGroup.id);

            res.tabGroups.splice(index, 1);

            browser.storage.sync.set({tabGroups: res.tabGroups});
            newTabGroup.remove();
        });
    };

    let tabGroupTabs = findFirstChildByClass(newTabGroup, 'tab-group-tabs');

    for (const tab of tabGroup.tabs)
    {
        tabGroupTabs.appendChild(createTab(tab));
    }

    return newTabGroup;
}

function createTab(tab)
{
    let newTab = defaultTab.cloneNode(true);

    findFirstChildByClass(newTab, 'tab-title').innerHTML = tab.title;
    findFirstChildByClass(newTab, 'tab-url').innerHTML = tab.url;
    findFirstChildByClass(newTab, 'tab-link').href = tab.url;
    findFirstChildByClass(newTab, 'tab-icon').src = tab.iconUrl;

    return newTab;
}

function findFirstChildByClass(element, className) 
{
    let queue = [...element.children];

    while (queue.length != 0)
    {
        let current = queue.shift();

        if (current.classList.contains(className))
        {
            return current;
        }

        queue = [...current.children, ...queue];
    }
    
    return null;
}