import React from 'react';
import background from './wallpaper.jpg';
const HeaderComp =  () => {
   
const backGroundStyle = {
    width:"100%",
    height:"100px"
}

    return (

<header className="header-area">
       <div className="container">
       <div class="box">
       <img style={backGroundStyle} src={background}/>
       </div>
       </div>
    </header>


    )

}

export default HeaderComp