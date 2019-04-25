import isDescendant from './isDescendant';
export default function navFunc(e) {
    console.log(e.target.innerHTML);
    const documentHeader = document.querySelector('header');
    console.log('header clicked?',isDescendant(documentHeader,e.target))
}
