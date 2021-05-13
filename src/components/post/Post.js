import React from 'react';
import Linkify from 'react-linkify';
import Image from '../image/Image';
import Tag from '../tag/Tag';

import './PostStyles.scss';

const Post = (props) => (
  <div id="postContainer">
    <div id="userInfo">
      <Image usage="profile" alt={props.name} src={props.userImg} />
      <div id="userDescription">
        <span id="name">{props.name}</span>
        <span id="subSection">{`Class of 20${props.year}`}</span>
      </div>
    </div>
    {props.imgUrl.length !== 0
      ? <Image usage="post" src={props.imgUrl} /> : null}
    <p id="bodyText"><Linkify>{props.body}</Linkify></p>

    <div id="tagsContainer"><Tag tag={props.tag} /></div>
  </div>
);

export default Post;
