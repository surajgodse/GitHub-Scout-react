import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <img src={user.avatar_url} alt={user.name} className="user-avatar" />
      <div className="user-info">
        <h2 className="user-name">{user.name}</h2>
        <p className="user-username">@{user.login}</p>
        <p>{user.bio}</p>
        <p>{user.location}</p>
        <div className="user-stats">
          <div className="stat">
            <span className="stat-value">{user.public_repos}</span>
            <span className="stat-label"> Repos</span>
          </div>
          <div className="stat">
            <span className="stat-value">{user.followers}</span>
            <span className="stat-label"> Followers</span>
          </div>
          <div className="stat">
            <span className="stat-value">{user.following}</span>
            <span className="stat-label"> Following</span>
          </div>
        </div>
        <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="view-profile-button">
          View GitHub Profile
        </a>
      </div>
    </div>
  );
};

export default UserProfile;