// --- Imports --- //
import React, { useContext } from 'react';
import CardContext, { initialState } from '../../../context/cardContext';

// --- Material Ui Imports --- //
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

function UserCard() {
  const cardDetails = useContext(CardContext);
  const { firstName, lastName, selectedImage, selectedTopic } = cardDetails.state;

  const handleBack = () => cardDetails.setState(initialState);
  
  return (
    <Grid container direction={'column'}>
      <Grid item className='headerSection'>
        <Button
          size='small'
          color='primary'
          onClick={handleBack}
          className='button'
        >
          {'<'} Go Back
        </Button>
        <h2><span>{firstName} {lastName}</span> Topic: {selectedTopic}</h2>
        <span/>
      </Grid>
      <Grid item className='grid'>
      {selectedImage.length > 0 ? (
          selectedImage.map((image) => (
            <div className='imageBox'>
              <img src={image.urls.regular} alt='selected pic' />
            </div>
          ))
        ) : (
          <p>No images selected</p>
        )}
      </Grid>
    </Grid>
  );
}

export default UserCard;
