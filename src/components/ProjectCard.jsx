import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  const getTwitterHandle = (twitterUrl) => {
    if (!twitterUrl) return null;
    const match = twitterUrl.match(/(?:twitter\.com|x\.com)\/([^/?]+)/);
    return match ? `@${match[1]}` : null;
  };


  return (
    <div
      className="project-card"
      style={{
        backgroundImage: project.banner
          ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${project.banner})`
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      {/* Overlay for readability */}
      <div className="card-content">
        <div className="project-header">
          {project.logo ? (
            <img 
              src={project.logo} 
              alt={`${project.name} logo`}
              className="project-logo"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/80x80?text=?';
              }}
            />
          ) : (
            <div className="project-logo-placeholder">
              {project.name.charAt(0)}
            </div>
          )}
          <div className="project-info">
            <h3 className="project-name">{project.name}</h3>
            {project.category && (
              <span className="project-category">{project.category}</span>
            )}
          </div>
        </div>

        {project.shortDescription && (
          <p className="project-description">{project.shortDescription}</p>
        )}

        <div className="project-links">
          {project.twitter && (
            <a
              href={project.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link twitter"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="twitter-handle">{getTwitterHandle(project.twitter) || 'Twitter'}</span>
            </a>
          )}
          {project.website && (
            <a 
              href={project.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link website"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              Website
            </a>
          )}
        </div>

        {project.isNative && (
          <div className="native-badge">Native</div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
