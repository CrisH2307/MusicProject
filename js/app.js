/* ********* 

  BTI225 – Assignment 05

  I declare that this assignment is my own work in accordance with
  Seneca Academic Policy. No part of this assignment has been
  copied manually or electronically from any other source
  (including web sites) or distributed to other students.

  Please update the following with your information:

  Name:       Xuan Khang Huynh (Cris Huynh)
  Student ID: 105444228
  Date:       Jul 23rd 2023
 
********* */
function convertMin(time) {
  var min = Math.floor(time / 60);
  var sec = time % 60;

  if (sec < 10) {
    sec = "0" + sec;
  }

  return `${min}:${sec}`;
}
// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
// console.log({ artists, songs }, "App Data");

function buildMenu() {
  /*
This function adds all of the artists (from the "artists" array) as clickable elements to the element with ID"menu".
When each element is clicked, it should invoke a function such as "showSelectedArtist(artistID)" (seebelow) with the correct (corresponding) artist ID
*/

  for (let i = 0; i < artists.length; i++) {
    menu.innerHTML += `<span onclick='showSelectedArtist("${artists[i].id}")' class="artists">${artists[i].name}</span>&nbsp;`;
  }
}

function showSelectedArtist(artistID) {
  /*
This function serves to add the Artist's information whose id = the function's artistID parameter, in the elementwith ID "selected-artist".
This includes the Artist's name and a comma separated list of links that each open anew window for the corresponding URL (defined in the "links" property for each artist)
This function should also invoke the "showCardsByArtist(artistID)" function (see below) with the current artist ID
*/

  let selectedArtistContainer = document.getElementById("selected-artist");

  let selectedArtist = artists.find((artist) => artist.id == artistID);

  selectedArtistContainer.innerHTML = `<span class="display-artist">${selectedArtist.name}</span>`;

  for (let i = 0; i < selectedArtist.links.length; i++) {
    const link = selectedArtist.links[i];
    selectedArtistContainer.innerHTML += `<br><a href="${link.url}" target="_blank" class="links">${link.name}</a>`;
  }

  showCardsByArtist(artistID);
}

function showCardsByArtist(artistID) {
  /*
This function is responsible for generating the HTML and updating the DOM to show the corresponding song"cards" for the selected artist
(ie: 1 for every song in the "songs" array whose "artistId" property matches thefunction's artistID parameter).
The information displayed for each "song" card is as follows:
*/

  let artistsSongs = songs.filter((song) => song.artistId == artistID);
  let cardContainer = document.getElementById("correct-container");

  cardContainer.innerHTML = "";

  for (let i = 0; i < artistsSongs.length; i++) {
    const time = convertMin(artistsSongs[i].duration);
    const album = artistsSongs[i].album;

    fetch("https://dummyjson.com/quotes/random")
      .then((res) => res.json())
      .then((data) => {
        console.log("fetch complete");

        cardContainer.innerHTML += `
    <article class="card" onclick='showSongForm("${artistsSongs[i].id}")'>
      <img class="image" src="${album.imageURL}" width="200">
      <div class="content">
        <p>
          <h4>${artistsSongs[i].title}</h4>
          <p>Year: ${artistsSongs[i].year} <br>
          Duration: ${time}<br>
          Album: ${album.name} </p><br />
          <h6>Quotes: ${data.quote}</h6>
        </p>
      </div>
     </article> `;
      });
  }
}

function showSongForm(songId) {
  /*
  With the "songForm" HTML now in place, we can concentrate on updating the "showSongForm(songId)" 
  function to correctly show the form and populate the form fields with the values from the song 
  with the correct "id" value (ie: the song with the "id" value that matches the "songId" parameter). 
  This will involve:  
  Removing the class "hidden" from the "songForm"
  Finding the song in the "songs" array whose "id" value matches the value from the "songId" function parameter
  Updating the "id","artistId","title","year" and "duration" form field values with the value from the found song (above)
  Note: At this point you may wish to style your form (recall, the "Forms and CSS" section of the Week 10 notes). 
  You should also consider adding the ":hover" pseudo-class to your "cards" to provide a style to 
  indicate to the user that they can click on them.
  */

  var that;
  for (var i = 0; i < songs.length; ++i) {
    if (songs[i].id == songId) {
      that = i;
    }
  }

  var show = document.getElementById("hidden");

  var songID = document.getElementById("songID");
  songID.value = `${songs[that].id}`;

  var artistID = document.getElementById("artistID");
  artistID.value = `${songs[that].artistId}`;

  var title = document.getElementById("title");
  title.value = `${songs[that].title}`;

  var year = document.getElementById("year");
  year.value = `${songs[that].year}`;

  var duration = document.getElementById("duration");
  duration.value = `${songs[that].duration}`;

  show.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  buildMenu();
  showSelectedArtist(artists[0].id);
  let form = document.getElementById("hidden");

  form.onsubmit = function () {
    console.log("Hello WOrld");
    var songID = document.getElementById("songID");
    var artistID = document.getElementById("artistID");
    var title = document.getElementById("title");
    var year = document.getElementById("year");
    var duration = document.getElementById("duration");

    let index = songs.findIndex((song) => song.id == songID.value);

    songs[index].title = title.value;
    songs[index].duration = duration.value;
    songs[index].year = year.value;

    showCardsByArtist(artistID.value);
    form.style.display = "none";
    return false;
  };
});
