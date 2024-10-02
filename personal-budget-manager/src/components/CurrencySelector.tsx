import React from 'react';

interface Currency {
  code: string;
  symbol: string;
}

const currencies: Currency[] = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' },
  { code: 'AUD', symbol: 'A$' },
  { code: 'CAD', symbol: 'C$' },
  { code: 'CHF', symbol: 'Fr' },
  { code: 'CNY', symbol: '¥' },
  { code: 'HKD', symbol: 'HK$' },
  { code: 'NZD', symbol: 'NZ$' },
  { code: 'RWF', symbol: 'Rwf' },
];

interface CurrencySelectorProps {
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ selectedCurrency, onCurrencyChange }) => {
  return (
    <div className="flex items-center">
      <label className="mr-2">Select Currency:</label>
      <select 
        value={selectedCurrency.code} 
        onChange={(e) => {
          const selected = currencies.find(currency => currency.code === e.target.value);
          if (selected) {
            onCurrencyChange(selected);
          }
        }}
        className="border rounded p-1"
      >
        {currencies.map(currency => (
          <option key={currency.code} value={currency.code}>
             {currency.code}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;