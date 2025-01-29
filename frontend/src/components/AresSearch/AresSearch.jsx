import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';
import { utils, writeFile } from 'xlsx';
import { useDispatch } from 'react-redux';
import { addCompany } from '../../redux/slices/favoriteCompaniesSlice';
import './AresSearch.scss';

const AresSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchBy, setSearchBy] = useState('ico');
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const dispatch = useDispatch();

  const { isDarkMode } = useTheme();

  const itemsPerPage = 10;

  const handleSearch = async () => {
    if (!inputValue) {
      setError('Enter a value for search');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let requestData;
      if (searchBy === 'ico') {
        requestData = { ico: [inputValue], pocet: itemsPerPage, start: currentPage * itemsPerPage, razeni: [] };
      } else {
        requestData = { obchodniJmeno: inputValue, pocet: itemsPerPage, start: currentPage * itemsPerPage, razeni: [] };
      }

      const response = await axios.post('http://localhost:5150/GetAresData.php', requestData);

      if (response.data && response.data.ekonomickeSubjekty) {
        setCompanies(response.data.ekonomickeSubjekty);
        setTotalItems(response.data.pocetCelkem);
      } else {
        setError('No data to display');
      }
    } catch (error) {
      setError('Error during request');
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < totalItems) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleExportCSV = () => {
    const csvData = companies.map(company => ({
      'ICO': company.ico,
      'Company Name': company.obchodniJmeno,
      'Address': company.sidlo?.textovaAdresa,
      'Registration Date': company.datumVzniku,
      'Legal Form': company.pravniForma,
      'Executive': company.dic,
    }));

    const ws = utils.json_to_sheet(csvData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Companies');

    writeFile(wb, 'companies.csv');
  };

  const handleAddToFavorites = (company) => {
    dispatch(addCompany(company));
  };

  React.useEffect(() => {
    if (companies.length > 0) {
      handleSearch();
    }
  }, [currentPage]);

  return (
    <div className={`ares-search ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className={`search-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <TextField
          label={searchBy === 'ico' ? 'Enter ICO' : 'Enter company name'}
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: isDarkMode ? "#E0E0E0" : "#1E1E1E", 
              fontWeight: "bold",
              backgroundColor: isDarkMode ? "#2C2C2C" : "#FFFFFF", 
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: isDarkMode ? "#1976D2" : "#2E2E2E",
                borderWidth: "2px",
              },
            },
            "& .MuiInputLabel-outlined": {
              color: isDarkMode ? "#B0BEC5" : "#2E2E2E",
              fontWeight: "bold",
            },
          }}
        />
        <Button onClick={handleSearch} variant="contained" color="primary" fullWidth>
          Search
        </Button>

        <div className={`search-buttons ${isDarkMode ? 'dark-mode' : ''}`}>
          <Button onClick={() => setSearchBy('ico')} variant="outlined" color={searchBy === 'ico' ? 'primary' : 'default'}>
            Search by ICO
          </Button>
          <Button onClick={() => setSearchBy('obchodniJmeno')} variant="outlined" color={searchBy === 'obchodniJmeno' ? 'primary' : 'default'}>
            Search by Name
          </Button>
        </div>

        {loading && <CircularProgress />}
      </div>

      {error && <Typography color="error">{error}</Typography>}

      <div className={`grid-container ${isDarkMode ? 'dark-mode' : ''}`}>
        {companies.length > 0 && (
          <div className={`company-list ${isDarkMode ? 'dark-mode' : ''}`}>
            {companies.map((company) => (
              <div className={`company-item ${isDarkMode ? 'dark-mode' : ''}`} key={company.ico}>
                <Typography variant="h6" className={`company-title ${isDarkMode ? 'dark-mode' : ''}`}>
                  {company.obchodniJmeno}
                </Typography>
                <Typography>ICO: {company.ico}</Typography>
                <Typography>Address: {company.sidlo?.textovaAdresa}</Typography>
                <Typography>Registration Date: {company.datumVzniku}</Typography>
                <Typography>Legal Form: {company.pravniForma}</Typography>
                <Typography>Executive: {company.dic}</Typography>
                <Button onClick={() => handleAddToFavorites(company)} variant="outlined" color="primary">+</Button>
              </div>
            ))}
          </div>
        )}
        {companies.length > 0 && (
          <>
            <div className={`pagination-buttons ${isDarkMode ? 'dark-mode' : ''}`}>
              <Button onClick={handlePreviousPage} variant="outlined" disabled={currentPage === 0}>
                Previous
              </Button>
              <Button onClick={handleNextPage} variant="outlined" disabled={(currentPage + 1) * itemsPerPage >= totalItems}>
                Next
              </Button>
            </div>

            <div className={`pagination-info ${isDarkMode ? 'dark-mode' : ''}`}>
              <Typography>Page {currentPage + 1} of {totalPages}</Typography>
            </div>
          </>
        )}
      </div>

      {companies.length > 0 && (
        <div className={`csv-export-button ${isDarkMode ? 'dark-mode' : ''}`}>
          <Button onClick={handleExportCSV} variant="outlined" color="primary">
            Export to CSV
          </Button>
        </div>
      )}
    </div>
  );
};

export default AresSearch;