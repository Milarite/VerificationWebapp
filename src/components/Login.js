import React , {Component} from 'react';

class Login extends Component {
    constructor(props){
        super(props);

    }
    render (){
        return(
            <div className="container">
            <form>
                <div className="row">
                <div className="col">
               
                <input type="email"  placeholder="Email" className="form-control margin-top"/>
               
                <input type="password" placeholder="Password" className="form-control margin-top"/>
    <input type="submit" className="btn margin-top"/>
                </div>
    
                </div>
            </form>
            </div>
    
        )
    }
}
export default Login ; 