/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId) {
    for(let song of player.songs) {
        let thisSong =document.getElementById("song" + song.id)
        thisSong.style.borderLeft = "1px solid grey";
        
        if(song.id === songId) {
            thisSong.style.borderLeft = "20px solid lightgreen";
            thisSong.style.borderRadius="5px";
        }
    }
}
// A function to handle events for the play button and the remove button
function songHandle(event){
    let songId=event.target.closest("div").id;
    
    if(event.target.className === "play-button"){
        playSong(parseInt(songId[songId.length-1]))
    }
    if(event.target.className==="remove-button"){
         confirmRemove(event);
    }
}

/**
 * Removes a song from the player, and updates the DOM to match.
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
  function confirmRemove(event)
 {
     const sure = confirm("Are you sure you want to delete this song ?")
     if (sure)
     {
        const toRemove = document.getElementById(event.target.closest("div").id)
        console.log(event.currentTarget , event.target)
        toRemove.remove()
        const toRemoveId = toRemove.id;
        const playerSongId = parseInt(toRemoveId[toRemoveId.length-1]);
       
     }
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
const addButton =document.getElementById("add-button");
addButton.addEventListener("click",handleAddSongEvent);
function addSong(event) {
    event.preventDefault();
    const inputTitle =document.getElementById("inputTitle").value;
    const inputAlbum =document.getElementById("inputAlbum").value;
    const inputArtist =document.getElementById("inputArtist").value;
    const inputDuration =convertMmssToNumber(document.getElementById("inputDuration").value);
    const inputCoverArt =document.getElementById("inputCover-art").value;
    const uniqueId= generateUniqueId();
    const newSong={
      id: uniqueId,
      title: inputTitle,
      album: inputAlbum,
      artist: inputArtist,
      duration: inputDuration,
      coverArt: inputCoverArt
    };
    player.songs.push(newSong);
    const songToAdd = createSongElement(newSong);
    songs.append(songToAdd);
}
// a function that take sthe duration input.value(string) , and turns it to lookalike number
function convertMmssToNumber(duration){
  return Number(duration.split(":")[0])*60 +Number(duration.split(":")[1])
}
// function that generates a new unique id for the added songs
function generateUniqueId(){
    let idSet= new Set();
  for(let song of player.songs){
    idSet.add(song.id);
  }
    let i=1;
    while(true){
      if(!idSet.has(i)){
        break;
      }
      i++
    }
    id=i;
    return id;
}

    
        

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
// function handleSongClickEvent(event) {
//     let songId=event.currentTarget.id;

//     if(event.target.className === "playButton"){
//         playSong(songId[songId.length-1])
//     }
//     if(event.target.className==="removeButton"){
//         confirmRemove(songId[songId.length-1]);
//     }
// }

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    addSong(event);
}

/**
 * Creates a song DOM element based on a song object.
 */

function createSongElement({ id, title, album, artist, duration, coverArt }) {
   
    const children = songList({id : id , title : title , album:album , artist:artist,duration:durationConverter(duration) ,coverArt:coverArt});
    const classes = ["song"]
    const attrs = {id: "song" + id }
    const eventListeners = {"click":songHandle}
    const songReturn=createElement("div", children, classes, attrs,eventListeners);
    // style part
    songReturn.style.textAlign="center";
    // create buttons
    const playbutton = createElement("button" , ["🎶"] , ["play-button"] , {onclick: "songHandle(event)"})
    const removebutton = createElement("button" , ["❌"] , ["remove-button"] , {onclick: "songHandle(event)"})
    // adding the buttons
    songReturn.append(removebutton);
    songReturn.append(playbutton);
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
    const playlistReturn =createElement("div", children, classes, attrs)
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








