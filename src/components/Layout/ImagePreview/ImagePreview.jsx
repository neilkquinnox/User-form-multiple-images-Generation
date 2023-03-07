import { Button, Grid } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import CardContext, { initialState } from '../../../context/cardContext';

const ImagePreview = () => {
  const cardDetails = useContext(CardContext);
  const { selectedImage, imagesList, selectedTopic, lastImage } =
    cardDetails.state;

  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const handleBack = () => cardDetails.setState(initialState);

  const selectOneImageHandler = (arr) => {
    if (arr.length) {
      return cardDetails.setState({
        ...cardDetails.state,
        imagesList: arr,
      });
    }
  };
  const handleImageReject = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageAccept = () => {
    cardDetails.setState({
      ...cardDetails.state,
      showCard: true,
      imageView: false,
      selectedImage: images,
    });
  };

  const handleSelection = (item) => {
    const isImageAlreadyPresent = images.find(image => image.id === item.id);
    if(isImageAlreadyPresent) {
        const newArray = images.filter(image => image.id !== item.id);
        return setImages(newArray);
    }
    setImages([...images, item]);
  };

  useEffect(() => {
    let topicImages =
      'https://api.unsplash.com/search/photos?query=' +
      selectedTopic +
      '&page=' +
      page +
      '&client_id=Q6o5nJfbt-o7Lu729i9xnrAwtmKhwAXxUgR1pC-88e8&orientation=landscape';
    axios.get(topicImages).then((response) => {
      selectOneImageHandler(response.data.results);
    });
  }, [page]);

  const getClassName = (item) => images.find(image => image.id === item.id) ? 'imageBox selected' : 'imageBox';
  return (
    <Grid container direction={'column'} className="container">
      <Grid item className='headerSection'>
        <Button
          size='small'
          color='primary'
          onClick={handleBack}
          className='button'
        >
          {'<'} Go Back
        </Button>
        <h2>{selectedTopic}</h2>
        <span/>
      </Grid>
      <Grid item className='grid'>
        {imagesList.length > 0 ? (
          imagesList.map((image) => (
            <div onClick={() => handleSelection(image)} className={getClassName(image)}>
              <img src={image.urls.regular} alt='selected pic' className='img1' />
            </div>
          ))
        ) : (
          <p>Loading</p>
        )}
      </Grid>
      <Grid item className='buttonGroup'>
        <Button
          size='small'
          color='primary'
          onClick={handleImageReject}
          className='button'
        >
          Reject
        </Button>
        <Button
          size='small'
          color='primary'
          onClick={handleImageAccept}
          className='button acceptButton'
          variant='outlined'
        >
          Accept
        </Button>
      </Grid>
    </Grid>
  );
};

export default ImagePreview;
