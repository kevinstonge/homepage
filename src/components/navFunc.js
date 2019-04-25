import isDescendant from './isDescendant';
export default function navFunc(e) {
    const documentHeader = document.querySelector('header');
    console.log('header clicked?',isDescendant(documentHeader,e.target))
}
