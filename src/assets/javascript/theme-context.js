import React from "react";
import { produce } from 'immer';
export const themes = {
  light: {
    foreground: '#000000',
    background: '#f5f5f5',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext = React.createContext(
  {
    themes: themes.light,
    changeTheme: () => null
  }
);

export default class ThemeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light
    }
  }

  changeTheme = () => {
    this.setState(
      (prevState) => ({
        theme: prevState.theme == themes.dark ? themes.light : themes.dark,
      }),
      () => {
        document.body.style.setProperty('background-color', this.state.theme.background, 'important');
      }
    )
  };

  render() {
    const { children } = this.props;
    const { theme } = this.state;
    return (
      <ThemeContext.Provider value={{ theme, changeTheme: this.changeTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }
}