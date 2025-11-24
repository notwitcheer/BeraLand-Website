import React, { useState, useMemo } from 'react';
import ProjectCard from './components/ProjectCard';
import HaikuWidgetWrapper from './components/HaikuWidgetWrapper';
import projectsData from './projects.json';
import witcheerPfp from './witcheer-pfp.png';
import './App.css';


const ENABLE_HAIKU_WIDGET = true;

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [nativeFilter, setNativeFilter] = useState('all');
  const [showHaikuWidget, setShowHaikuWidget] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set();
    projectsData.forEach(project => {
      if (project.category) {
        project.category.split(',').forEach(cat => {
          cats.add(cat.trim());
        });
      }
    });
    return ['all', ...Array.from(cats).sort()];
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.category?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || 
                             project.category?.toLowerCase().includes(categoryFilter.toLowerCase());
      
      const matchesNative = nativeFilter === 'all' || 
                          (nativeFilter === 'native' && project.isNative) ||
                          (nativeFilter === 'non-native' && !project.isNative);
      
      return matchesSearch && matchesCategory && matchesNative;
    });
  }, [searchTerm, categoryFilter, nativeFilter]);


  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <a
          href="https://x.com/witcheer"
          target="_blank"
          rel="noopener noreferrer"
          className="header-profile-link"
        >
          <img src={witcheerPfp} alt="Witcheer" className="header-pfp" />
        </a>
        <div className="container">
          <h1 className="title">🐻 Berachain Ecosystem by BeraLand</h1>
          <p className="subtitle">
            Explore {projectsData.length} projects building on Berachain
          </p>
          {ENABLE_HAIKU_WIDGET && (
            <button
              onClick={() => setShowHaikuWidget(true)}
              className="haiku-trade-button"
            >
              🔄 Trade on Haiku
            </button>
          )}
        </div>
      </header>

      {/* Filters */}
      <div className="filters-section">
        <div className="container">
          <div className="filters">
            {/* Search */}
            <div className="search-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="clear-button"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter */}
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            {/* Native Filter */}
            <select
              value={nativeFilter}
              onChange={(e) => setNativeFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Projects</option>
              <option value="native">Berachain Native</option>
              <option value="non-native">Multi-chain</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="results-count">
            Showing {filteredProjects.length} of {projectsData.length} projects
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <main className="main">
        <div className="container">
          {filteredProjects.length > 0 ? (
            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No projects found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                  setNativeFilter('all');
                }}
                className="reset-button"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>Built by <a href="https://x.com/Bera_Land" target="_blank" rel="noopener noreferrer" className="footer-link">
              @Bera_Land
            </a> for the Berachain community</p>
          <p className="footer-links">
            Created by <a href="https://x.com/witcheer" target="_blank" rel="noopener noreferrer" className="footer-creator">
              <img src={witcheerPfp} alt="Witcheer" className="footer-pfp" />
              @witcheer
            </a>
          </p>
        </div>
      </footer>

      {/* Haiku Widget Modal */}
      {ENABLE_HAIKU_WIDGET && showHaikuWidget && (
        <HaikuWidgetWrapper onClose={() => setShowHaikuWidget(false)} />
      )}
    </div>
  );
}

export default App;
