import ThemeButton from "./Theme-Button";
import React from "react";

export default class Toolbar extends React.Component{

    render(){
        return (
           <nav className="toolbar">
             <ThemeButton/>
           </nav>
        );
    }
}