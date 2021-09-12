/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */


function playSong(songId) {
    for(let song of player.songs) {
        document.getElementById('song' + song.id).style.borderLeft = "5px solid grey";
        if(song.id === songId) {
            document.getElementById('song' + song.id).style.borderLeft = '20px solid lightgreen';
        }
    }
  
   // Your code here
}
// a function i added to mark a played playlist.
function playPlaylist(playlistId) {
    for(let playlist of player.playlists) {
        document.getElementById('playlist' + playlist.id).style.borderLeft = "5px solid grey";
        if(playlist.id === playlistId) {
            document.getElementById('playlist' + playlist.id).style.borderLeft = '20px solid orange';
        }
    }
  
   // Your code here
}


/**
 * Creates a song DOM element based on a song object.
*/

 function songList(song) {
    const list = [];
    for(let key in song) {
        if(key !== "coverArt") {
            const li = document.createElement('li');
            li.innerText = `${key}: ${song[key]}`;
            list.push(li);
        } else {
            const img = document.createElement('img');
            img.src = song[key];
            list.push(img);
            img.style.borderRadius="5px"
        }
    }
    return list;
}


function createSongElement({ id, title, album, artist, duration, coverArt }) {
    
    const children = songList({id : id , title : title , album:album , artist:artist ,duration :durationConverter(duration),coverArt:coverArt});
    const classes = ["song"]
    const attrs = { onclick: `playSong(${id})`, id: "song" + id  }
    // tried to add the bonus require unsucssecfully
    // if(duration<120){
    //     songList[5].style.border="2px green";
    // }else if(duration <420 && duration >120){
    //     songList.style.border="2px orange";
    // }
    let songReturn=createElement("div", children, classes, attrs);
    // style part
    songReturn.style.textAlign="center";
    songReturn.style.border="2px dashed lightgrey";
    // end of style part
    return songReturn;
}


/**
 * Creates a playlist DOM element based on a playlist object.
 */
 function plList(playlist) {
    const playlistList = [];
    for(let key in playlist) {
        if(key !== "coverArt") {
            const li = document.createElement('li');
            li.innerText = `${key}: ${playlist[key]}`;
            playlistList.push(li);
        } else {
            const img = document.createElement('img');
            img.src = song[key];
            img.height = 50 ;
            playlistList.push(img);
        }
    }
    
    return playlistList;
}

function createPlaylistElement({ id, name, songs }) {
    const playlist = arguments[0];
    const children = plList({id:id ,name, songs: songs, duration: durationConverter(playlistDuration(id))});
    const classes = ["pl"]
    const attrs = { onclick: `playPlaylist(${id})`, id: "playlist" + id  }
    let playlistReturn =createElement("div", children, classes, attrs)
    // style part
    playlistReturn.style.border="2px dashed lightgrey";
    playlistReturn.style.textAlign="center";
    // end of style part
   
    return playlistReturn;
}


/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
function createElement(tagName, children = [], classes = [], attributes = {}) {
    const element = document.createElement(tagName);
    element.setAttribute("onclick", "playSong(id)");
    for(let child of children){
        element.append(child);
    }
    for(let name of classes ){
        element.classList.add(name);
    }
    for(let attr in attributes){
        element.setAttribute(attr, attributes[attr]);
    }
    return element;
  

    
}


// You can write more code below this line








// varibales and loops for defining the lists order
// songs list
const sortedSongs=player.songs.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
for(let song of sortedSongs){
    let songsdiv = document.getElementById("songs");
    songsdiv.append(createSongElement(song)); 

}
// playlist list
const sortedPl=player.playlists.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
for(let playlist of sortedPl){
    let playlistsdiv = document.getElementById("playlists");
    playlistsdiv.append(createPlaylistElement(playlist));    

}


function durationConverter(dur){
    // a function to evaluate the song duration in mm:ss format.
    let mins=0;
    let secs=0;
    
    mins=Math.floor(dur/60);
    secs=dur%60;
    let mins_str = mins<10 ? "0" + mins : mins;
    let secs_str = secs<10 ? "0" + secs : secs;
    let mmSs = mins_str + ":" + secs_str;
  
    return mmSs
   
  }
  function playlistDuration(id) {
    // function that calculates the total duration of the playlist
      let songsId=[];
      let plSongsId=new Set();
      totalDuration=0;
      // loop for define a set with the songs id
    for(let i = 0 ; i<player.playlists.length ; i++){
      if(player.playlists[i].id===id){
        songsId=player.playlists[i].songs;
        plSongsId=new Set(songsId)
      }
    }
    // loop for evaluate the total duration of the playlist using "totalDuration" as a paremeter. 
    for(let song of player.songs){
      if(plSongsId.has(song.id)){
        totalDuration+=song.duration;
      }
    }
    return totalDuration;
  }
  








