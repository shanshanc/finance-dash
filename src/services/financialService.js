import { config } from '../config';
import { staticData } from '../data/staticData';

/**
 * Service class for handling financial data operations
 */
class FinancialService {
  /**
   * Fetches financial metrics for a given stock symbol
   * @param {string} Stock symbol (e.g., 'AAPL')
   * @param {string} Data period ('annual' or 'quarterly')
   * @returns {Promise<Array>} Array of financial metrics
   * @throws {Error} If the fetch operation fails
   */
  static async getFinancialMetrics(symbol, period) {
    // console.log('getFinancialMetrics import url: ', import.meta.env.VITE_WORKER_BASE_URL);

    if (config.dataSource === 'static') {
      return staticData;
    }

    try {
      const WORKER_BASE_URL = import.meta.env.VITE_WORKER_BASE_URL
      const url = `${WORKER_BASE_URL}?symbol=${symbol}&period=${period}`;
      const response = await fetch(url);
      
      return response.json();
      
    } catch (error) {
      console.error('Error in getFinancialMetrics:', error);
      throw error;
    }
  }

  /**
   * Transforms raw financial data into a standardized format
   * @param {Array} rawData - Raw financial data from the API
   * @returns {Array} Transformed financial data
   */
  static transformData(rawData) {
    if (!rawData || !Array.isArray(rawData)) {
      return [];
    }

    return rawData.map(item => ({
      id: item.id,
      name: item.name,
      title: item.title,
      subTitle: item.subTitle,
      subTitleZhTw: item.subTitleZhTw,
      values: item.values,
      periods: item.periods,
      currentValue: item.values[item.values.length - 1],
      previousValue: item.values[item.values.length - 2],
      periodChange: item.values.length > 1 
        ? ((item.values[item.values.length - 1] - item.values[item.values.length - 2]) / item.values[item.values.length - 2]) * 100 
        : 0
    }));
  }

  /**
   * Sorts financial data by date in ascending order
   * @param {Array} data - Array of financial metrics
   * @returns {Array} Sorted array of financial metrics
   * @private
   */
  static sortDataByDate(data) {
    return [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  /**
   * Validates a stock symbol format
   * @param {string} symbol - Stock symbol to validate
   * @returns {boolean} True if symbol is valid
   */
  static isValidSymbol(symbol) {
    return /^[A-Z]{1,5}$/.test(symbol);
  }
}

export default FinancialService;
