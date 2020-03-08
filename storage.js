function getSyncTabGroups()
{
    return browser.storage.sync.get('tabGroups');
}

function setSyncTabGroups(tabGroups)
{
    browser.storage.sync.set({tabGroups: tabGroups});
}

function removeDuplicateTabs()
{
    getSyncTabGroups().then((res) =>
    {
        var tabUrls = [];
        var newTabGroups = [];
        var modified = false;

        for (var tabGroup of res.tabGroups)
        {
            var newTabGroup = {id: tabGroup.id, title: tabGroup.title, tabs: []};

            for (var tab of tabGroup.tabs)
            {
                if (tabUrls.includes(tab.url))
                {
                    modified = true;
                }
                else
                {
                    newTabGroup.tabs.push(tab);

                    tabUrls.push(tab.url);
                }
            }

            newTabGroups.push(newTabGroup);
        }

        if (modified)
        {
            setSyncTabGroups(newTabGroups);
        }
    });
}