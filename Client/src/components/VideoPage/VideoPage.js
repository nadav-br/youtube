import React, { useContext, useState, useEffect } from "react";
import SideVideoList from "./NextInLine/sideVideoList";
import Movie from "../VideoPage/Movie/Movie";
import "./VideoPage.scss";
import _ from "lodash";
import { Context } from "../Store/StoreProvider";
const axios = require("axios");

const VideoPage = props => {
  const videoList = useContext(Context);
  const [video, setVideo] = useState({});
  const [videoTitle, setVideoTitle] = useState("");
  const [likes, setLikes] = useState(0);
  const [unLikes, setUnLikes] = useState(0);
  const [id, SetId] = useState("");
  const [clicked, setClicked] = useState(false);
  const [comments, setComments] = useState([]);
  const [views, setViews] = useState(0);
  const filterVideo = _.find(videoList, { id: props.match.params.id });
  useEffect(() => {
    if (videoList.length === 0) {
      return;
    }
    
    setVideo(filterVideo);
    setVideoTitle(filterVideo.snippet.title);
    setLikes(filterVideo.likes);
    setUnLikes(filterVideo.unLikes);
    SetId(filterVideo.id);
    setClicked(clicked);
    setComments(filterVideo.comments);
    setViews(filterVideo.views)

    console.log("filterVideo",filterVideo)
  }, [videoList]);

  const addLike = () => {
    if (!clicked) {
      setLikes(likes + 1);
      setClicked(true);
    } else {
      setLikes(likes - 1);
      setClicked(false);
    }
  };
  const addUnLikes = () => {
    if (!clicked) {
      setUnLikes(unLikes + 1);
      setClicked(true);
    } else {
      setUnLikes(unLikes - 1);
      setClicked(false);
    }
  }

  useEffect(()=> {  
         
    axios.post("http://localhost:3000/movies", filterVideo)
    setViews(views + 1)
  },[filterVideo])
  // console.log(filterVideo)
  return (
        <div className="videoPage">
            <SideVideoList />
            <Movie 
              id={id} 
              title={videoTitle}
              addUnLikes={addUnLikes} 
              unLikes={unLikes} 
              addLike={addLike} 
              likes={likes} 
              comments={comments}
              views={views}
            />             
        </div>
        )
}

export default VideoPage;
