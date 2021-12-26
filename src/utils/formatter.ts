import config from '~config';

class Formatter {
  constructor(public locale = config.locale) {}

  formatCurrency(value: string | number, options?: Intl.NumberFormatOptions) {
    return Number(value).toLocaleString(this.locale, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
      ...options,
    });
  }

  formatDecimal(value: string | number, options?: Intl.NumberFormatOptions) {
    return Number(value).toLocaleString(this.locale, {
      style: 'decimal',
      ...options,
    });
  }

  formatPercent(value: string | number, options?: Intl.NumberFormatOptions) {
    return (Number(value) / 100).toLocaleString(this.locale, {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options,
    });
  }
}

// create singleton instance
export default new Formatter();
