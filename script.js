import config from "./env.js";

// DOM elements
const countryContainer = document.getElementById("country-container");
const openSlide = document.getElementById('open-slide');
const closeSlide = document.getElementById('close-slide');
const country = document.querySelectorAll('.country');

// Get top hits from API
async function displayPopularMusic(country) {
  const proxyURL = "https://cors-anywhere.herokuapp.com/";
  const apiURL = `https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=5&country=${country}&f_has_lyrics=1&apikey=${config.apiKey}`;

  try {
    const response = await fetch(proxyURL + apiURL);
    const data = await response.json();
    const trackList = data.message.body.track_list;

    // Clear previous data 
    while (countryContainer.children.length > 0) {
        countryContainer.removeChild(countryContainer.children[0]);
      }
    trackList.forEach(function (track) {
    // Create wrapper for track data
      const wrapperDiv = document.createElement("div");
      wrapperDiv.id = 'wrapper-div'
    // Create Artist, track and album and add ID 
      var artistDiv = document.createElement("h1")
      var trackDiv = document.createElement("div");
      var albumDiv = document.createElement("div");
    // Reduce font size depending on artist_name length
    track.track.artist_name.length > 20 ? artistDiv.classList.add('long-title') : artistDiv.classList.remove('long-title')
      artistDiv.append(document.createTextNode(`Artist: ${track.track.artist_name}`));
      trackDiv.append(document.createTextNode(`Track: ${track.track.track_name}`));
      albumDiv.append(document.createTextNode(`Album: ${track.track.album_name}`));
    // Append Artist, track and album data to wrapper
      wrapperDiv.append(artistDiv);
      wrapperDiv.append(trackDiv);
      wrapperDiv.append(albumDiv);
    // Style wrapper 
    // Append wrapper to container div
      countryContainer.appendChild(wrapperDiv);
    });
  } catch (error) {
    console.log(error);
  }
}
displayPopularMusic();


// Events 
function openSlideMenu() {
  document.getElementById('side-menu').style.width = '250px';
  document.getElementById('country-container').style.marginLeft = '250px'
}

function closeSlideMenu() {
  document.getElementById('side-menu').style.width = '0'
  document.getElementById('country-container').style.marginLeft = '0'
}

function countryOnClick(evt){
  let country = evt.target.dataset.code
  displayPopularMusic(country);
}
// Event Listeners
openSlide.addEventListener('click', openSlideMenu);
closeSlide.addEventListener('click', closeSlideMenu);
country.forEach((e) => e.addEventListener('click', countryOnClick));

