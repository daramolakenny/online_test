import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useDrag, useDrop } from 'react-dnd';

const AdminDashboardPage = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const response = await axios.post('(link unavailable)',
      {
        payload: {},
        page,
        limit: rowsPerPage
      },
      {
        headers: {
          'x-project': 'cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw',
          Authorization: `Bearer ${token}`
        }
      }
    );
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
        'x-project': 'cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw',
        Authorization: `Bearer ${token}`
      }
    });
    setIsAuthenticated(false);
  }

  const [ isDragging , setIsDragging] = useDrag(() => ({
    type: 'video',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'video',
    drop: (item) => {
      const video = item.video;
      const newVideos = [...videos];
      newVideos.splice(video.index, 1);
      setVideos(newVideos);
    },
  }));

  return (
   <div>
      {isAuthenticated ? (
        <>
          <table ref={drag}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Username</th>
                <th>Likes</th>
              </tr>
            </thead>
            <tbody>
              {videos.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((video, index) => (
                <tr key={('link unavailable')} ref={drop}>
                  <td>{video.title}</td>
                  <td>{video.username}</td>
                  <td>{video.like}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            page={page}
            totalPages={totalPages}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
          />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default AdminDashboardPage;
