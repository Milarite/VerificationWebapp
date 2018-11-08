import React , {Component} from 'react';
import util from 'ethereumjs-util' ;



class AdminLogin extends Component {
    constructor(props){
        super(props);
    }
render(){
    return(
    <div className="container">
            <form>
                <div className="row">
                <div className="col-4">
               
                <input type="text"  placeholder=" Input Your private key" className="form-control margin-top"/>
               
    <input type="submit" className="btn margin-top"/>
                </div>
    
                </div>
            </form>
            </div>
            
)
}


}
export default AdminLogin ;