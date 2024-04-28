import React, { useState , useEffect } from 'react';

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

export const ThemeContext = React.createContext({
  theme: themes.light,
  changeTheme: () => null,
});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);

  const changeTheme = () => {
    setTheme(prevTheme => prevTheme === themes.dark ? themes.light : themes.dark);
  };

  useEffect(() => {
    document.body.style.setProperty('background-color', theme.background, 'important');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
