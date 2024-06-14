import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";

const AdminDashboardPage = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const response = await axios.post('(link unavailable)', {
      payload: {},
      page,
      limit: 10
    }, {
      headers: {
        'x-project': 'cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==',
        Authorization: `Bearer ${token}`
      }
    });

    const { list, num_pages } = response.data;
    setVideos(list);
    setTotalPages(num_pages);
  };

  const handleNextPage = () => {
    setPage(page + 1);
    fetchVideos();
  };

  const handleLogout = () => { axios.post('(link unavailable)', {
      payload: {},
    }, {
      headers: {
        'x-project': 'cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==',
        Authorization: `Bearer ${token}`
      }
    });
    setIsAuthenticated(false);
  }

  return (
    <div>
      {isAuthenticated ? (
        <>
          {videos.map((video) => (
            <div key={'(link unavailable)'} >
              <h2>{video.title}</h2>
              <img src={video.photo} alt={video.title} />
              <p>Username: {video.username}</p>
              <p>Likes: {video.like}</p>
            </div>
          ))}
          {page < totalPages && (
            <button onClick={handleNextPage}>Next Page</button>
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      ): (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default AdminDashboardPage;
