import React from 'react';
import Header from './header';
import UploadControl from './UploadControl';
import Loadable from 'react-loading-overlay';
class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {IsActive : false}
    }
    loadSpinner = (value) =>{
        this.setState({IsActive:value});
      }
    render(){
    return  (
<div>
<Loadable
        active ={this.state.IsActive}
        spinner
        
        
  text='Loading your content...'
  className="loading"
        >
    <div className="row">
    <div className="col-md-2"></div>
    <div className="col-md-5">
    <Header/>
    </div>
    <div className="col-md-5">
    <UploadControl onUploadLoadSpiner = {this.loadSpinner}/>
    </div>
    </div>
    </Loadable>
</div>
    )
    }
}


export default Main;