export function strToDom(domStr){
    let dom = document.createElement('div');
    dom.innerHTML = domStr;
    return dom.children[0];
}