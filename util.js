function createElement(path)
{
    let client = new XMLHttpRequest();
    client.open('GET', path, false);
    client.send();
    
    let newElement = document.createElement('div');
    newElement.innerHTML = client.responseText;

    return newElement;
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

