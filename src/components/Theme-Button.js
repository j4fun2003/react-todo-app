import React, { useContext } from 'react';
import { ThemeContext, themes } from '../assets/javascript/theme-context';

const ThemeButton = (props) => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <button
      {...props}
      style={{ backgroundColor: theme.background, color: theme.foreground }}
      onClick={changeTheme}
    >
      {theme.background === themes.dark.background ? 'Light' : 'Dark'}
    </button>
  );
};

export default ThemeButton;
