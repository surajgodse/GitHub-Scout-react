import React from 'react';

const RepoList = ({ repos }) => {
  return (
    <div className="repo-container">
      <h3>Repositories</h3>
      <div className="repo-grid">
        {repos.map((repo) => (
          <div key={repo.id} className="repo-item">
            <h4 className="repo-name">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h4>
            <p className="repo-description">{repo.description}</p>
            <div className="repo-stats">
              <span>Stars: {repo.stargazers_count}</span>
              <span>Main Language: {repo.language}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepoList;