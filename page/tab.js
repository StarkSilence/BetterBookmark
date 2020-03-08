const defaultTab = createElement('tab.html');

function createTab(tab)
{
    let newTab = defaultTab.cloneNode(true);

    findFirstChildByClass(newTab, 'tab-title').innerHTML = tab.title;
    findFirstChildByClass(newTab, 'tab-url').innerHTML = tab.url;
    findFirstChildByClass(newTab, 'tab-link').href = tab.url;
    findFirstChildByClass(newTab, 'tab-icon').src = tab.iconUrl;

    var drag = findFirstChildByClass(newTab, "tab-drag");

    $(drag).click(() =>
    {
        $(drag).toggleClass('tab-drag-down');
        $(newTab).toggleClass('panel');
    });

    return newTab;
}