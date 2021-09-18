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
// A function to handle events for the play button,stop button and the remove button
function songHandle(event){
    let songId=event.target.closest("div").id;
    
    if(event.target.className === "play-button"){
        playSong(parseInt(songId[songId.length-1]))
    }
    if(event.target.className==="remove-button"){
         removeSong(event);
    }
    if(event.target.className==="stop-button"){
      event.target.closest("div").style.borderLeft="1px solid grey";
    }
}
// A function to handle events for the play button,stop button and the remove button
function plHandle(event){
  
  if(event.target.className==="remove-buttonPl"){
    const toRemove = document.getElementById(event.target.closest("div").id)
    console.log(event.currentTarget , event.target)
    toRemove.remove()
  }
  if(event.target.className==="stop-buttonPl"){
    event.target.closest("div").style.borderLeft="1px solid grey";
  }
  if(event.target.className === "play-buttonPl"){   
    event.target.closest("div").style.borderLeft = '20px solid orange';
  }
}

  function removeSong(event)
 {
     const sure = confirm("Are you sure you want to delete this song ?")
     if (sure)
     {
      //  removes the song from the page
        const toRemove = document.getElementById(event.target.closest("div").id)
        toRemove.remove()
        toRemoveId=toRemove.id;
        songToRemoveId=parseInt(toRemoveId[toRemoveId.length-1]);
        for(let playlist of player.playlists){
          for(let i= 0 ; i <playlist.songs.length ;i++){
            if(songToRemoveId===playlist.songs[i]){
              playlist.songs.splice(i,1);
            }
          }
        }
        // removes the song from the playlists and updates them

        const playlistElement = document.getElementById("playlists");
        playlistElement.textContent="";
        for(let playlist of player.playlists){
          let plToAdd=createPlaylistElement(playlist);
          playlistElement.append(plToAdd);
        }
        
        

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

    
        



//  * Handles a click event on the button that adds songs.
 
function handleAddSongEvent(event) {
    addSong(event);
}

/**
 * Creates a song DOM element based on a song object.
 */
//creates and generates songs elements
function createSongElement({ id, title, album, artist, duration, coverArt }) {
   
    const children = songList({id : id , title : title , album:album , artist:artist,duration:duration,coverArt:coverArt});
    const classes = ["song"]
    const attrs = {id: "song" + id }
    const eventListeners = {"click":songHandle}
    const songReturn=createElement("div", children, classes, attrs,eventListeners);
    // style part
    songReturn.style.textAlign="center";
    // create buttons
    const playbutton = createElement("button" , ["🎶"] , ["play-button"] , {onclick: "songHandle(event)"})
    const removebutton = createElement("button" , ["❌"] , ["remove-button"] , {onclick: "songHandle(event)"})
    const stopbutton = createElement("button" , ["⛔"] , ["stop-button"] , {onclick: "songHandle(event)"})
    // adding the buttons
    songReturn.append(removebutton);
    songReturn.append(stopbutton);
    songReturn.append(playbutton);
    // end of style part
    return songReturn;
}
// creates and generates playlists elements
function createPlaylistElement({ id, name, songs }) {
  const playlist = arguments[0];
  const children = plList({id:id ,name, songs: songs, duration: durationConverter(playlistDuration(id))});
  const classes = ["pl"]
  const attrs = { id: "playlist" + id  }
  const playlistReturn =createElement("div", children, classes, attrs)
  const playbutton = createElement("button" , ["🎶"] , ["play-buttonPl"] , {onclick: "plHandle(event)"})
  const removebutton = createElement("button" , ["❌"] , ["remove-buttonPl"] , {onclick: "plHandle(event)"})
  const stopbutton = createElement("button" , ["⛔"] , ["stop-buttonPl"] , {onclick: "plHandle(event)"})
  // adding the buttons
  playlistReturn.append(removebutton);
  playlistReturn.append(stopbutton);
  playlistReturn.append(playbutton);
  return playlistReturn;
  
}

// generic function to create elements
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

// creates a the content of each song element(used for the children of createSongElement)
 function songList(song) {
    const list = [];
    for(let key in song) {
        if(key !== "coverArt") {
          if(key === "duration"){
            // paints the duration li with the right color
            g=getColor(song[key])
            const li = document.createElement('li');
            li.innerText = `${key}: ${durationConverter(song[key])}`;
            li.style.color=`rgb(${255-g},${g},0)`;
            list.push(li);
          }
          else{
            const li = document.createElement('li');
            li.innerText = `${key}: ${song[key]}`;
            list.push(li);
          }
        } else {
            const img = document.createElement('img');
            img.src = song[key];
            list.push(img);
            img.style.borderRadius="5px"
        }
    }
    return list;
}





// creates a the content of each playlist element(used for the children of createPlaylistElement)
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
  
  // function to find the right rgb values based on the duration
function getColor(d){
    let g=0;
    d=d/60;
    if(d<=2){
      g=255;
    }else if(d>=7){
      g=0;
    }else{
      g=(-51)*d+357
    }
    return g;
    
  }










