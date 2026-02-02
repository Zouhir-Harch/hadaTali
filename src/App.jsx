import { useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    etablissement: '',
    filiere: '',
    encadrant: '',
    jury: '',
    titre_projet: '',
    année: '2024 - 2025'
  });

  const [selectedStyle, setSelectedStyle] = useState('classic');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  // Mettre à jour un champ
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  // Remplir avec un exemple
  const useExample = (num) => {
    setResult(null);
    setError('');
    if (num === 1) {
      setFormData({
        nom: 'Amine',
        prenom: 'Mohamed',
        etablissement: 'ENSA Oujda',
        filiere: 'Génie Informatique',
        encadrant: 'Dr. Hassan Benali',
        jury: 'Pr. Youssef Mehdi, Pr. Sarah Bouali',
        titre_projet: 'Système de Gestion Intelligente des Étudiants',
        année: '2024 - 2025'
      });
    } else if (num === 2) {
      setFormData({
        nom: 'Kharbouch',
        prenom: 'Fatima Zahra',
        etablissement: 'Université Mohammed I Oujda',
        filiere: 'Management et Leadership',
        encadrant: 'Pr. Abderrahim Chabli',
        jury: 'Dr. Karim Sifi, Dr. Nadia Tahiri',
        titre_projet: 'Analyse Stratégique des Entreprises',
        année: '2024 - 2025'
      });
    } else if (num === 3) {
      setFormData({
        nom: 'Bennani',
        prenom: 'Youssef',
        etablissement: 'ENSTA Oujda',
        filiere: 'Génie Électronique',
        encadrant: 'M. Omar Driss',
        jury: 'Pr. Ali Hami, Dr. Leila Nasri',
        titre_projet: 'Système de Contrôle Automatique',
        année: '2024 - 2025'
      });
    }
  };

  // Générer la page de garde
  const handleGenerate = async () => {
    if (!formData.nom || !formData.prenom) {
      setError('Le nom et le prénom sont obligatoires !');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = {
        ...formData,
        jury: formData.jury
          ? formData.jury.split(',').map(j => j.trim()).filter(j => j !== '')
          : []
      };

      const response = await axios.post('http://localhost:3000/api/generate', {
        data: data,
        style: selectedStyle
      });

      setResult(response.data);
    } catch (err) {
      const message = err.response?.data?.error || err.message || 'Une erreur est survenue';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Télécharger le PDF
  const handleDownload = () => {
    if (!result?.pdfUrl) return;
    const url = 'http://localhost:3000' + result.pdfUrl;
    const link = document.createElement('a');
    link.href = url;
    link.download = 'page-de-garde.pdf';
    link.click();
  };

  // Style pour les inputs
  const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    marginTop: '6px',
    background: 'rgba(0,0,0,0.3)',
    border: '2px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s'
  };

  const labelStyle = {
    color: '#a8a8b3',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    display: 'block'
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>📄 Générateur de Pages de Garde</h1>
        <p>Remplissez le formulaire et générez votre page de garde en PDF — 100% gratuit !</p>
      </div>

      {/* Exemples rapides */}
      <div className="card">
        <h2>💡 Exemples rapides</h2>
        <div className="style-selector">
          <div className="style-option" onClick={() => useExample(1)}>
            <span className="style-icon">💻</span>
            Informatique
          </div>
          <div className="style-option" onClick={() => useExample(2)}>
            <span className="style-icon">📊</span>
            Management
          </div>
          <div className="style-option" onClick={() => useExample(3)}>
            <span className="style-icon">⚡</span>
            Électronique
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="card">
        <h2>✏️ Vos Informations</h2>

        {/* Ligne 1: Prénom + Nom */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={labelStyle}>Prénom *</label>
            <input
              type="text"
              placeholder="Ex: Mohamed"
              value={formData.prenom}
              onChange={(e) => handleChange('prenom', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Nom *</label>
            <input
              type="text"
              placeholder="Ex: Bennani"
              value={formData.nom}
              onChange={(e) => handleChange('nom', e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Ligne 2: Etablissement + Filière */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={labelStyle}>Établissement</label>
            <input
              type="text"
              placeholder="Ex: ENSA Oujda"
              value={formData.etablissement}
              onChange={(e) => handleChange('etablissement', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Filière</label>
            <input
              type="text"
              placeholder="Ex: Génie Informatique"
              value={formData.filiere}
              onChange={(e) => handleChange('filiere', e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Ligne 3: Encadrant + Année */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={labelStyle}>Encadrant</label>
            <input
              type="text"
              placeholder="Ex: Dr. Hassan Benali"
              value={formData.encadrant}
              onChange={(e) => handleChange('encadrant', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Année académique</label>
            <input
              type="text"
              placeholder="Ex: 2024 - 2025"
              value={formData.année}
              onChange={(e) => handleChange('année', e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Jury - pleine largeur */}
        <div style={{ marginTop: '15px' }}>
          <label style={labelStyle}>Membres du jury (séparés par des virgules)</label>
          <input
            type="text"
            placeholder="Ex: Pr. Youssef Mehdi, Pr. Sarah Bouali"
            value={formData.jury}
            onChange={(e) => handleChange('jury', e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Titre du projet - pleine largeur */}
        <div style={{ marginTop: '15px' }}>
          <label style={labelStyle}>Titre du projet (optionnel)</label>
          <input
            type="text"
            placeholder="Ex: Système de Gestion Intelligente"
            value={formData.titre_projet}
            onChange={(e) => handleChange('titre_projet', e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Sélecteur de style */}
      <div className="card">
        <h2>🎨 Choisissez un Style</h2>
        <div className="style-selector">
          <div
            className={`style-option ${selectedStyle === 'classic' ? 'active' : ''}`}
            onClick={() => setSelectedStyle('classic')}
          >
            <span className="style-icon">📜</span>
            Classic
            <br />
            <small style={{ color: '#a8a8b3' }}>Élégant et classique</small>
          </div>
          <div
            className={`style-option ${selectedStyle === 'modern' ? 'active' : ''}`}
            onClick={() => setSelectedStyle('modern')}
          >
            <span className="style-icon">🎨</span>
            Modern
            <br />
            <small style={{ color: '#a8a8b3' }}>Moderne et coloré</small>
          </div>
        </div>
      </div>

      {/* Bouton Générer */}
      <button
        className="btn btn-primary"
        onClick={handleGenerate}
        disabled={loading || !formData.nom || !formData.prenom}
      >
        {loading ? '⏳ Génération en cours...' : '🚀 Générer la Page de Garde'}
      </button>

      {/* Loading */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>📄 Génération du PDF avec LaTeX...</p>
        </div>
      )}

      {/* Erreur */}
      {error && (
        <div className="error-box">
          <span>❌</span>
          <span>{error}</span>
        </div>
      )}

      {/* Résultat */}
      {result && (
        <div className="results-card">
          <h2>✅ Page de Garde Générée !</h2>

          <div className="data-grid">
            <div className="data-item">
              <div className="label">Prénom</div>
              <div className="value">{result.data?.prenom || '—'}</div>
            </div>
            <div className="data-item">
              <div className="label">Nom</div>
              <div className="value">{result.data?.nom || '—'}</div>
            </div>
            <div className="data-item">
              <div className="label">Établissement</div>
              <div className="value">{result.data?.etablissement || '—'}</div>
            </div>
            <div className="data-item">
              <div className="label">Filière</div>
              <div className="value">{result.data?.filiere || '—'}</div>
            </div>
            <div className="data-item">
              <div className="label">Encadrant</div>
              <div className="value">{result.data?.encadrant || '—'}</div>
            </div>
            <div className="data-item">
              <div className="label">Jury</div>
              <div className="value">{result.data?.jury?.join(', ') || '—'}</div>
            </div>
            {result.data?.titre_projet && (
              <div className="data-item full-width">
                <div className="label">Titre du Projet</div>
                <div className="value">{result.data.titre_projet}</div>
              </div>
            )}
          </div>

          <div className="download-section">
            <button className="btn btn-download" onClick={handleDownload}>
              📥 Télécharger le PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
