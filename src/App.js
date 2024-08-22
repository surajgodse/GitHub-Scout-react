import React, { useState } from 'react';
import axios from 'axios';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import RepoList from './components/RepoList';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setPage(1);
    setHasMore(true);
    try {
      const userResponse = await axios.get(`https://api.github.com/users/${username}`);
      setUser(userResponse.data);

      const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=9&page=1`);
      setRepos(reposResponse.data);
      setHasMore(reposResponse.data.length === 9);
    } catch (err) {
      setError('User not found');
      setUser(null);
      setRepos([]);
    }
    setLoading(false);
  };

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=9&page=${nextPage}`);
      setRepos([...repos, ...reposResponse.data]);
      setPage(nextPage);
      setHasMore(reposResponse.data.length === 9);
    } catch (err) {
      setError('Error loading more repositories');
    }
    setLoading(false);
  };

  const handleClear = () => {
    setUsername('');
    setUser(null);
    setRepos([]);
    setError(null);
    setPage(1);
    setHasMore(true);
  };

  return (
    <div className="app-container">
      <div className="content">
        <h1>GitHub Scout</h1>
        <div className="search-container">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
          />
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleClear}>Clear</button>
        </div>

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}

        {user && (
          <>
            <UserProfile user={user} />
            <RepoList repos={repos} />
            {hasMore && (
              <button onClick={handleLoadMore} disabled={loading} className="load-more-button">
                {loading ? 'Loading...' : 'Load More Repositories'}
              </button>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;