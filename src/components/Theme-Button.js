import { ThemeContext, themes} from "../assets/javascript/theme-context";
import React from "react";

export default class ThemeButton extends React.Component{
    
    render(){
    return (
      <ThemeContext.Consumer>
        {theme => (
          <button
            {...this.props}
            style={{ backgroundColor: theme.background , color: theme.foreground}}
          >
            {theme.background === themes.dark.background ? 'Light':'Dark' }
          </button>
        )}
      </ThemeContext.Consumer>
    );
    }
}

