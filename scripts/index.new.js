/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId) {
    // Your code here
}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(id) {
    // removes the chosen song from the songs list
    let found=false;
    for(let i=0 ; i<player.songs.length ; i++){
      if(player.songs[i].id===id){
        found=true;
        player.songs.splice(i,1);
      }
    }
    if(!found){
      throw("non-existent ID");
    }
    // removes the song from all playlist it appears in
    for(let playlist of player.playlists){
      for(let i=0 ; i<playlist.songs.length ; i++){
        if(playlist.songs[i]===id){
          playlist.songs.splice(i,1);
        }
      }
  
    }
  }

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
    // Your code here
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    // Your code here
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    // Your code here
}

/**
 * Creates a song DOM element based on a song object.
 */
// function createSongElement({ id, title, album, artist, duration, coverArt }) {
//     const children = []
//     const classes = []
//     const attrs = {}
//     const eventListeners = {}
//     return createElement("div", children, classes, attrs, eventListeners)
// }
function createSongElement({ id, title, album, artist, duration, coverArt }) {

    const children = songList({id : id , title : title , album:album , artist:artist ,duration :durationConverter(duration),coverArt:coverArt});
    const classes = ["song"]
    const attrs = ({ onclick: `playSong(${id})`, id: "song" + id })
    const eventListeners = {}
    let songReturn=createElement("div", children, classes, attrs,eventListeners);
    // style part
    songReturn.style.textAlign="center";
    songReturn.style.border="2px dashed lightgrey";
    // end of style part
    return songReturn;
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = []
    const classes = []
    const attrs = {}
    const eventListeners = {}
    return createElement("div", children, classes, attrs, eventListeners)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    // Your code here
}

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
    // Your code here
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
   
}

// Creating the page structure
generateSongs()
generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)




function playSong(songId) {
    
    for(let song of player.songs) {
        let thisSong =document.getElementById('song' + song.id)
        thisSong.style.borderLeft = "1px solid grey";
        
        if(song.id === songId) {
            thisSong.style.borderLeft = '20px solid lightgreen';
           
            
            

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
	@@ -41,7 +120,84 @@ function createPlaylistElement({ id, name, songs }) {
 * @param {Object} attributes - the attributes for the new element
 */
function createElement(tagName, children = [], classes = [], attributes = {}) {
    const element = document.createElement(tagName);


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
// sort and adds to playlist list 
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

//   const song=document.querySelectorAll(".song")
//   function addDur(song){
//     let durText= song.durationConverter(duration);
//     let durli=document.createElement("li");
//     durli.textContent=durText;
//     song.append(durli);
//   }
const playButton = document.createElement("button");
const removeButton = document.createElement("button");
playButton.setAttribute("class","playButton");
removeButton.setAttribute("class","removeButton");
playButton.innerText="🎶";
removeButton.innerText="❌"
const firstSong= document.getElementById("song4");
firstSong.append(removeButton);
firstSong.append(playButton);

function addBt(songId){
let fS=document.getElementById("song"+songId);
firstSong.append(playButton);
}
// A function to handle events for the play button and the remove button
function songHandle(event){
    let songId=event.currentTarget.id;

    if(event.target.className === "playButton"){
        playSong(songId[songId.length-1])
    }
    if(event.target.className==="removeButton"){
        removeSong(songId[songId.length-1]);
    }
}

