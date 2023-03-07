import React, { useEffect, useContext, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import CardContext from '../../../context/cardContext';

const UserForm = () => {
  const cardDetails = useContext(CardContext);
  const [topic, setTopic] = useState('');
  const [others, setOthers] = useState(false);
  const { firstName, lastName } = cardDetails.state;

  const topicNames = ['Travel', 'Cars', 'WildLife', 'Technologies', 'Others'];
  const selectOneImageHandler = (arr) => {
    if (topic) {
      return cardDetails.setState({
        ...cardDetails.state,
        selectedTopic: topic,
        imagesList: arr,
      });
    }
  };

  useEffect(() => {
    if (topic.trim()) {
      let topicImages =
        'https://api.unsplash.com/search/photos?query=' +
        topic +
        '&client_id=Q6o5nJfbt-o7Lu729i9xnrAwtmKhwAXxUgR1pC-88e8&orientation=landscape';
      axios.get(topicImages).then((response) => {
        selectOneImageHandler(response.data.results);
      });
    }
  }, [topic]);

  const handleNameChange = (event) => {
    cardDetails.setState({
      ...cardDetails.state,
      firstName: event.target.value,
    });
  };

  const handleSurnameChange = (event) => {
    cardDetails.setState({
      ...cardDetails.state,
      lastName: event.target.value,
    });
  };

  const handleTopicChange = (event) => {
    const {
      target: { value },
    } = event;
    if (value.trim() && value !== 'Others') {
      setTopic(value);
      cardDetails.setState({ ...cardDetails.state, selectedTopic: value });
    } else {
      setOthers(true);
    }
  };

  const handleImageSearch = () => cardDetails.setState({ ...cardDetails.state, imageView: true });

  return (
    <Grid
      container
      spacing={3}
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Grid item>
        <TextField
          sx={{
            width: 300,
          }}
          value={firstName}
          onChange={handleNameChange}
          variant='outlined'
          placeholder='Name'
          label='Name'
        />
      </Grid>
      <Grid item>
        <TextField
          sx={{
            width: 300,
          }}
          value={lastName}
          onChange={handleSurnameChange}
          variant='outlined'
          placeholder='Surname'
          label='Surname'
        />
      </Grid>
      {!others ? (
        <Grid item>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id='demo-multiple-name-label'>Topic</InputLabel>
            <Select
              labelId='topicNameselectLabel'
              id='topicNameselect'
              value={topic}
              align='left'
              onChange={handleTopicChange}
              input={<OutlinedInput label='Topic' />}
            >
              {topicNames.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      ) : (
        <Grid item>
          <TextField
            sx={{
              width: 300,
            }}
            onChange={handleTopicChange}
            variant='outlined'
            placeholder='Type the topic'
            label='Others'
          />
        </Grid>
      )}
      <Button
        size='small'
        color='primary'
        onClick={handleImageSearch}
        className='button acceptButton'
        variant='outlined'
        disabled={!topic}
      >
        Search
      </Button>
    </Grid>
  );
};

export default UserForm;
