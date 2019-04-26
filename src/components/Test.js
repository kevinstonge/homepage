//template for a stateless functional component
import React from 'react'; //this is only needeed if returning JSX

export default function Test({currentPage}) {
    console.log('hi');
    return(<p>{currentPage}</p>);
}
