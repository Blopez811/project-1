var trackInput = document.querySelector("#searchInput");
var searchButton = document.querySelector("#searchButton");
var topTracksEl = document.querySelector("#searchResults");
var artistLinkEl = document.querySelector("#artistLink");
var modal = document.querySelector("#myModal");
var span = document.querySelector(".close");
var accessToken = "Bearer BQA-c7XwAxGtuew5vhM1BV1GvlvcFyNvEAAFbeLSf_v4jcyb0iqJE84RUnyTgYyPzfYGyQjNRNL6yUTH7ADN3Gz7YpPv2THWBbGGwfPOuPsaa4IW63MLg4-hcXLk6N03jjAXNTRbF2sxtqklPk4a6fpS6G_lvmU";

getArtist = function () {
    topTracksEl.innerHTML = "";
    artistLinkEl.innerHTML = "";
    var apiUrl = "https://api.spotify.com/v1/search?q=" + trackInput.value + "&type=artist";
    var headers = {
        Authorization: accessToken,
        Accept: "application/json"
    }
    fetch(apiUrl, { headers: headers }).then(function (response) {
        if (response.ok) {
            return (response.json());
         } else {
            modal.style.display = "block";
            console.log("showModal function 1 fired"); 
            return
         }          
    }).then(function (data) {
        console.log(data.artists.total);
        if(data.artists.total === 0) {
            modal.style.display = "block";
            console.log("showModal function 3 fired"); 
            return   
        }

        var artistName = data.artists.items[0].name;
        var artistId = data.artists.items[0].id;
        var artistLink = data.artists.items[0].external_urls.spotify;
        var apiUrl = "https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?market=US";
        var headers = {
            Authorization: accessToken,
            Accept: "application/json"
        }
        fetch(apiUrl, { headers: headers }).then(function (response) {
            if (response.ok) {
            return (response.json());
             } 
        }).then(function (data) {
            var anchor = document.createElement('a');
            var linkText = document.createTextNode("Click here to visit " + artistName + "'s page!");
            var tracksText = document.createTextNode("Top five songs for " + artistName + ":" + data.tracks[0].name + ", " + data.tracks[1].name + ", " + data.tracks[2].name + ", " + data.tracks[3].name + ", " + data.tracks[4].name);
            anchor.appendChild(linkText);
            anchor.title = "Click here to visit " + artistName + "'s page!";
            anchor.href = artistLink
            anchor.target = "_blank";
            topTracksEl.appendChild(tracksText);
            artistLinkEl.appendChild(anchor);
        })
    })
};

closeModal = function() {
    modal.style.display = "none";
}

searchButton.addEventListener("click", getArtist);
span.addEventListener("click", closeModal)