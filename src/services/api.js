import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Analyser un prompt sans générer de PDF
export async function parsePrompt(prompt) {
  const response = await axios.post(`${API_URL}/parse-prompt`, { prompt });
  return response.data;
}

// Générer une page de garde complète (analyse + PDF)
export async function generatePage(prompt, style = 'classic') {
  const response = await axios.post(`${API_URL}/generate`, { prompt, style });
  return response.data;
}

// Télécharger un PDF
export function getPdfUrl(pdfPath) {
  return `http://localhost:3000${pdfPath}`;
}
