import React from "react";
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
    themes.light
  );