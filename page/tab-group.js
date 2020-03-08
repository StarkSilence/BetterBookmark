const defaultTabGroup = createElement('tab-group.html');

function createTabGroup(tabGroup)
{
    let newTabGroup = defaultTabGroup.cloneNode(true);
    
    var title = findFirstChildByClass(newTabGroup, 'tab-group-title');
    var moveButton = findFirstChildByClass(newTabGroup, 'move-button');
    var deleteButton = findFirstChildByClass(newTabGroup, 'delete-button');
    var renameButton = findFirstChildByClass(newTabGroup, 'rename-button');
    var removeButton = findFirstChildByClass(newTabGroup, 'remove-button');
    var tabs = findFirstChildByClass(newTabGroup, 'tab-group-tabs');

    setTitle(tabGroup, title);
    setRenameButton(renameButton, title);
    setRemoveButton(tabGroup, removeButton);

    for (const tab of tabGroup.tabs)
    {
        tabs.appendChild(createTab(tab));
    }

    return newTabGroup;
}

function setTitle(tabGroup, title)
{
    title.innerHTML = tabGroup.title;

    $(title).blur(() =>
    {
        title.contentEditable = false;
        
        browser.storage.sync.get('tabGroups').then((res) =>
        {
            res.tabGroups.find((tg) => tg.id == tabGroup.id).title = title.innerText;

            browser.storage.sync.set({tabGroups: res.tabGroups});
        });
    });

    $(title).keydown((key) =>
    {
        if (key.keyCode == 13 || key.key == 'Enter')
        {
            key.preventDefault();
        }
    });
}

function setRenameButton(renameButton, title)
{
    $(renameButton).click(() =>
    {
        title.contentEditable = true;
        title.focus();
    });
}

function setRemoveButton(tabGroup, removeButton)
{
    $(removeButton).click(() =>
    {
        browser.storage.sync.get('tabGroups').then((res) =>
        {
            let index = res.tabGroups.findIndex((tg) => tg.id == tabGroup.id);

            res.tabGroups.splice(index, 1);

            browser.storage.sync.set({tabGroups: res.tabGroups});
        });
    });
}