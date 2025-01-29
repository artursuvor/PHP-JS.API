import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import AresSearch from '../components/AresSearch/AresSearch.jsx';
import './App.scss';

const App = () => {
  const { isDarkMode } = useTheme();

  React.useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <>
    <Header />
      <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
        <main>
          <h2>Welcome to My Application</h2>
          <div className={`content ${isDarkMode ? 'dark' : 'light'}`}>
            <h3>How to Use the Search</h3>
            <div className={`search-instructions ${isDarkMode ? 'dark' : ''}`}>
              <p>To search for a company, you can enter either the company's ICO number or its name in the input field.</p>
              <p>Choose the search type by clicking the appropriate button: "Search by ICO" or "Search by Company Name".</p>
              <p>The search results will appear below once you hit the search button.</p>
            </div>
          </div>
        </main>
        <AresSearch />
      </div>
    <Footer />
    </>

  );
};

export default App;
