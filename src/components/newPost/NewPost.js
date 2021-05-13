import {
  Button, FormControl, IconButton, makeStyles, MenuItem, TextField, withStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Select from '@material-ui/core/Select';

import './NewPostStyles.scss';

const GreenButton = withStyles({
  root: {
    background: '#00693e',
    color: 'white',
    '&:hover': {
      backgroundColor: '#139755',
    },
    '&:active': {
      backgroundColor: '#00552b',
    },
  },
})(Button);

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 100,
    marginRight: '0.5em',
  },
}));

const NewPost = (props) => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [url, setUrl] = useState([]);
  const [tag, setTag] = useState('');

  const addUrl = () => {
    setUrl([...url, '']);
  };

  const deleteUrl = (index) => {
    const array = [...url];
    array.splice(index, 1);
    setUrl(array);
  };

  const setSingleUrl = (e, index) => {
    const array = [...url];
    array[index] = e.target.value;
    setUrl(array);
  };

  const getallUrlBoxes = () => url.map((urlString, index) => (
    <div id="urlTextContainer">
      <div id="textFieldContainer">
        <TextField
          id="body"
          label="Image Url"
          value={urlString}
          onChange={(e) => setSingleUrl(e, index)}
          variant="outlined"
          margin="dense"
          fullWidth
        />
      </div>
      <IconButton size="small" onClick={() => deleteUrl(index)}><RemoveCircleOutlineIcon /></IconButton>
    </div>
  ));
  return (
    <div id="newPostContainer">
      <h4>What&apos;s on your mind?</h4>
      <TextField
        id="body"
        label="Tell us~"
        value={text}
        onChange={(e) => setText(e.target.value)}
        variant="outlined"
        multiline
        rowsMax={10}
        rows={3}
        margin="dense"
        fullWidth
      />

      {getallUrlBoxes()}

      <div id="bottomSection">
        {url.length <= 4 ? (
          <div id="urlAdder" role="button" tabIndex={0} onClick={addUrl}>
            <IconButton size="small"><div id="buttonColor"><AddCircleOutlineIcon /></div></IconButton>
            Add Image
          </div>
        ) : null}
        <FormControl className={classes.formControl}>
          <Select
            labelId="select-tag-label"
            id="select-tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            <MenuItem value=""><em>No Tag</em></MenuItem>
            <MenuItem value="Academics">Academics</MenuItem>
            <MenuItem value="Casual">Casual</MenuItem>
            <MenuItem value="Club">Club</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
            <MenuItem value="News">News</MenuItem>
            <MenuItem value="Random">Random</MenuItem>

          </Select>
        </FormControl>
        <GreenButton variant="contained"
          onClick={() => {
            const newPost = {
              user: 'Dummy', year: 'dummy', userImg: '', body: text, tag, imgUrl: url.filter((urlString) => urlString.length > 0),
            };
            props.handleNewPost(newPost);
            setText('');
            setUrl([]);
            setTag('');
          }}
        >Post
        </GreenButton>
      </div>

    </div>
  );
};

export default NewPost;
