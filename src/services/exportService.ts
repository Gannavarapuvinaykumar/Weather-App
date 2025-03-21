
import { WeatherHistoryRecord } from '../types/weatherHistory';

/**
 * Exports weather records to JSON format
 */
export function exportToJson(records: WeatherHistoryRecord[]): void {
  const dataStr = JSON.stringify(records, null, 2);
  downloadFile(dataStr, 'weather-history.json', 'application/json');
}

/**
 * Exports weather records to CSV format
 */
export function exportToCsv(records: WeatherHistoryRecord[]): void {
  // Create CSV header
  const headers = ['ID', 'Location', 'Start Date', 'End Date', 'Search Date', 'Temperature (°C)', 'Condition'];
  
  // Create CSV rows
  const rows = records.map(record => [
    record.id,
    record.location,
    record.startDate,
    record.endDate,
    record.searchDate,
    record.weatherData.current.temp_c.toString(),
    record.weatherData.current.condition.text
  ]);
  
  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  downloadFile(csvContent, 'weather-history.csv', 'text/csv');
}

/**
 * Exports weather records to XML format
 */
export function exportToXml(records: WeatherHistoryRecord[]): void {
  let xmlContent = '<?xml version="1.0" encoding="UTF-8" ?>\n';
  xmlContent += '<WeatherHistory>\n';
  
  records.forEach(record => {
    xmlContent += '  <Record>\n';
    xmlContent += `    <Id>${record.id}</Id>\n`;
    xmlContent += `    <Location>${record.location}</Location>\n`;
    xmlContent += `    <StartDate>${record.startDate}</StartDate>\n`;
    xmlContent += `    <EndDate>${record.endDate}</EndDate>\n`;
    xmlContent += `    <SearchDate>${record.searchDate}</SearchDate>\n`;
    xmlContent += '    <WeatherData>\n';
    xmlContent += `      <Temperature>${record.weatherData.current.temp_c}</Temperature>\n`;
    xmlContent += `      <Condition>${record.weatherData.current.condition.text}</Condition>\n`;
    xmlContent += '    </WeatherData>\n';
    xmlContent += '  </Record>\n';
  });
  
  xmlContent += '</WeatherHistory>';
  
  downloadFile(xmlContent, 'weather-history.xml', 'application/xml');
}

/**
 * Exports weather records to Markdown format
 */
export function exportToMarkdown(records: WeatherHistoryRecord[]): void {
  let mdContent = '# Weather History\n\n';
  
  records.forEach(record => {
    mdContent += `## ${record.location}\n\n`;
    mdContent += `- **ID:** ${record.id}\n`;
    mdContent += `- **Date Range:** ${record.startDate} to ${record.endDate}\n`;
    mdContent += `- **Search Date:** ${record.searchDate}\n\n`;
    mdContent += `### Weather Data\n\n`;
    mdContent += `- **Temperature:** ${record.weatherData.current.temp_c}°C\n`;
    mdContent += `- **Condition:** ${record.weatherData.current.condition.text}\n`;
    mdContent += `- **Humidity:** ${record.weatherData.current.humidity}%\n`;
    mdContent += `- **Wind:** ${record.weatherData.current.wind_kph} km/h\n\n`;
    mdContent += '---\n\n';
  });
  
  downloadFile(mdContent, 'weather-history.md', 'text/markdown');
}

/**
 * Helper function to download a file
 */
function downloadFile(content: string, fileName: string, contentType: string): void {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
