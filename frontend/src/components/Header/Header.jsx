import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { utils, writeFile } from 'xlsx';
import { useTheme } from '../../context/ThemeContext';
import { removeCompany } from '../../redux/slices/favoriteCompaniesSlice';
import './Header.scss';

const Header = () => {
  const favoriteCompanies = useSelector((state) => state.favoriteCompanies || []);
  const dispatch = useDispatch();
  const { isDarkMode, toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const handleExportCSV = () => {
    if (favoriteCompanies.length === 0) {
      console.warn('No companies to export');
      return;
    }

    const csvData = favoriteCompanies.map((company) => ({
      'ICO': company.ico,
      'Company Name': company.obchodniJmeno,
      'Address': company.sidlo?.textovaAdresa,
      'Registration Date': company.datumVzniku,
      'Legal Form': company.pravniForma,
      'Executive': company.dic,
    }));

    const ws = utils.json_to_sheet(csvData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Favorite Companies');

    writeFile(wb, 'favorite_companies.csv');
  };

  const handleRemoveCompany = (company) => {
    dispatch(removeCompany(company));
  };

  const toggleList = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <header className={`header ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="logo">Ares SEARCH 🔎</div>
      <div className="header-info">
        <div>SAVED COMPANIES: {favoriteCompanies.length}</div>

        <Button
          onClick={toggleList}
          variant="outlined"
          color="primary"
          className={isDarkMode ? 'dark' : 'light'}
        >
          {isOpen ? 'Hide Companies' : 'Show Companies'}
        </Button>

        <Button
          onClick={handleExportCSV}
          variant="outlined"
          disabled={favoriteCompanies.length === 0}
          color="primary"
          className={isDarkMode ? 'dark' : 'light'}
        >
          Export to CSV
        </Button>
      </div>

      <div className={`company-list-container ${isOpen ? 'open' : 'closed'} ${isDarkMode ? 'dark' : 'light'}`}>
        {favoriteCompanies.map((company) => (
          <div
            key={company.ico}
            className={`company-item ${isDarkMode ? 'dark' : 'light'}`}
          >
            <span>{company.obchodniJmeno}</span>
            <Button
              onClick={() => handleRemoveCompany(company)}
              variant="outlined"
              color="error"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? '🌙' : '🌞'}
      </button>
    </header>
  );
};

export default Header;
