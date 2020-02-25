import React, { useState, useEffect } from "react";
import SideVideoList from "./NextInLine/sideVideoList";
import Movie from "../VideoPage/Movie/Movie";
import "./VideoPage.scss";

const axios = require("axios");

const VideoPage = props => {
  const [video, setVideo] = useState({});
  const [likeClicked, setLikeClicked] = useState(false);
  const [unLikeClicked, setUnLikeClicked] = useState(false);
  const [title,setTitle] = useState("")
  // const [comments, setComments] = useState([]);
  const [views, setViews] = useState(0);

  // useEffect(() => {
  //   axios.post("http://localhost:3000/movies",video)
  // },[])
  
  
  console.log("likes",video.id)
  
  const empty = () => <div>HOLD</div>
  const full = () => {
    return(
      <div className="videoPage">
            <SideVideoList />
            <Movie 
              video={video}
              id={video.id} 
              title={video.snippet.title}
              addUnLikes={addUnLikes} 
              addLike={addLike} 
              // comments={comments}
            />             
        </div>
    )
  }
  
  useEffect(() => {
    fetch(`http://localhost:3000/movies/${props.match.params.id}`)
      .then(res => res.json())
      .then(video => {
        setVideo(video);
        setTitle(video.snippet.title);
        // setComments(comments)
      })
  }, [props.match.params.id]);
     


  const addLike = () => {
    if (!likeClicked) {
      setVideo(prevState => ({
          ...prevState,
          ...prevState.statistics,
          likeCount: prevState.statistics.likeCount + 1,
        }
      ));
      setLikeClicked(true);
    } else {
      setVideo(prevState => ({
        ...prevState,
        ...prevState.statistics,
        likeCount: prevState.statistics.likeCount - 1,
      }
    ));
    setLikeClicked(false);
    }
    axios.post("http://localhost:3000/movies",video);
  };

  const addUnLikes = () => {
    if (!unLikeClicked) {
      setVideo(prevState => ({
          ...prevState,
          unLikes: prevState.unLikes + 1,
        }
      ));
      setUnLikeClicked(true);
    } else {
      setVideo(prevState => ({
        ...prevState,
        unLikes: prevState.unLikes - 1,
      }
    ));
    setUnLikeClicked(false);
    }
    axios.post("http://localhost:3000/movies",video);
  };
 
  return video.id === undefined? empty(): full()
}

export default VideoPage;
