const express = require("express");
const qs = require("qs");
const app = express();
const rp = require("request-promise");
const KEY = "AIzaSyBj51qfOoYYF4wDcPJWmb9GALTBkeVqbMc"; //"AIzaSyCiWZ6dmHKrOEnTRVX_MM9nBhhbWPv28bw";
const {getDB} = require("./db");
const moviesRoute = require("./movies");
const path = require('path');
const { MoviesModel } = require('./moviesModel');
const fs = require('fs');
var logger = require('morgan');


app.use(express.json())
app.use('/movies', moviesRoute);

getDB();

var accessLogStream = fs.createWriteStream('./access.log', {flags: 'a'});
app.use(logger({stream: accessLogStream}));

// 1. express.static
app.use('/', express.static(path.join(__dirname, '../Client/build')));
// 2. Procfile : a> npm i , b> npm run build, c> node server.js
// 3. env vars: a> DB_URL , b> PORT

app.get('/videos', async (req, res) => {       
        const data = await requestVideos().catch(e => console.error(e));
        data.map(item => ({
            ...item,
            comments: [],
            }))       
               
            data.forEach(movie => {
            const result = new MoviesModel(movie);            
            result.save().catch(e => console.error(e)); 
            })
                           
        // res.json(data)
        res.send(result);
})

    const requestVideos = async () => {
    let videoQuery = qs.stringify({
         part: "snippet, statistics",
        maxResults: 20,
         key: KEY,
        chart: 'mostPopular'
    })
     
    let options = {
         method: 'GET',
         url: `https://www.googleapis.com/youtube/v3/videos?${videoQuery}`,
         resolveWithFullResponse: true, //request-promise returns just the response body from a request. To get the full response object use reswuthall
         json: true // const data = await data.JSON();
    }
    try {
     const respone = await rp(options);     
     return respone.body.items;
    } catch(err) {       
        throw new Error(err);
    } 
} 

app.get('/search', async (req, res) => {  
    const data = await searchVideos(req.query.q);
            data.map(value => {
            value.statistics={
            viewCount:0,
            likeCount:0,
            dislikeCount:0,
            commentCount:0
            },
        value.comments = [],
        value.id = value.id.videoId
        });
    res.json(data);
})

const searchVideos = async (value) => {
    try {
    let searchQuery = qs.stringify({
        part: 'snippet',
        key: KEY,
        q: value,
        maxResults: 20
    })
    
    let options = {
        method: 'GET',
        url: `https://www.googleapis.com/youtube/v3/search?${searchQuery}`,
        resolveWithFullResponse: true, 
        json: true // const data = await data.JSON();
    }

    
        const respone = await rp(options).catch(e => console.error(e)); 
        return respone.body.items
    } catch(err) {       
        throw new Error(err);
    }   
    
}

app.listen(process.env.PORT || 5000);
