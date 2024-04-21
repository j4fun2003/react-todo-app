import { ThemeContext, themes} from "../assets/javascript/theme-context";
import React from "react";

export default class ThemeButton extends React.Component{
    
    render(){
      const {theme, changeTheme} = this.context;
    return (
          <button
            {...this.props}
            style={{ backgroundColor: theme.background , color: theme.foreground}}
            onClick = {changeTheme}
          >
            {theme.background === themes.dark.background ? 'Light':'Dark' }
          </button>
    );
    }
}
ThemeButton.contextType = ThemeContext;

