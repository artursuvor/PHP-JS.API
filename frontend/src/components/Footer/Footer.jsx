import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './Footer.scss';

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`footer ${isDarkMode ? 'dark' : 'light'}`}>
      <p>© 2025 My Application</p>
    </footer>
  );
};

export default Footer;
