import React from 'react';
import styled from "styled-components";
import {CommentTag, Content, Title, Post} from "../../../../StyledComponents/CommentStyle.js";
import {ReactComponent as Icon} from "../../../../assets/clerk.svg";

function Comment(props) {
   return (
        <CommentTag>
            <Content>
                <Title>{props.comment.user}</Title>
                <Post>{props.comment.comment}</Post>
            </Content>
            <UserIcon />
        </CommentTag>
    )
}

const UserIcon = styled(Icon)`
width: 5.5vh;
margin-left: 15px;
`;

export default Comment;
