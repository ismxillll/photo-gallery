import React, { useEffect, useState } from 'react';
import Pagination from './Components/pagination/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [imageData, setImageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [likeCounts, setLikeCounts] = useState({});
  const totalPages = 35;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}`);
        const data = await response.json();
        setImageData(data);
      } catch (error) {
        console.error('Error fetching image data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleThumbsUpClick = (id) => {
    setLikeCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1
    }));
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <h1 className='header'>Photo Gallery</h1>
      {imageData?.length > 0 && !isLoading ? (
        imageData.map((item, index) => (
          <div key={index} className='image-container'>
            <img src={item?.download_url} alt={item?.author} width={200} height={200} />
            <p className='author-name'>Author: {item?.author}</p>
            <div className="thumbs-up" onClick={() => handleThumbsUpClick(item?.id)}>
              <FontAwesomeIcon icon={faThumbsUp} className='thumbs-up-icon' style={{ color: 'blue' }} /> 
              <p>{likeCounts[item.id] || 0}</p>
            </div>
          </div>
        ))
      ) : null}
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default App;
