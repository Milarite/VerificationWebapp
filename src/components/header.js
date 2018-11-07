import React from 'react';
import logo from './logo.png';
import background from './blockchain-gif.gif';
const HeaderComp =  () => {
   
const backGroundStyle = {
    width:"500px",
    height:"400px",
    marginLeft: "-150px",
    marginRight : "auto",
    float:"left"
    

}

const logoStyle = {
    width:"15ppx",
    height:"150px"
      
}

    return (

<header className="header-area background">
       <div className="container">
       
       <div class="box">
       <img className="img-background" style={backGroundStyle} src={background}/>
       </div>
       </div>
    </header>


    )

}

export default HeaderComp