import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import UploadControl from './components/UploadControl';
import Main from './components/main';
import {BrowserRouter, Route} from 'react-router-dom';
import Explore from './components/explore';

const Index = () =>{
    return  (
        <BrowserRouter>
            <div>
<Route exact path="/" component = {Main}/>
<Route path = "/explore" component = {Explore}/>
            </div>
        </BrowserRouter>


    )
}
ReactDOM.render(<Index/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

