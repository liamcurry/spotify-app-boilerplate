'use strict';

var sp = getSpotifyApi(1),
    trackInfo = document.getElementById('track-info');


function updateTrackDetails() {
  var playerTrackInfo = sp.trackPlayer.getNowPlayingTrack(),
      infoHTML = '',
      track;
  if (playerTrackInfo == null) {
    infoHTML = 'Nothing playing!';
  } else {
    track = playerTrackInfo.track;
    console.log(playerTrackInfo);
    console.log(track);
    infoHTML = '<span id="track-title">' + track.name + '</span>' +
      'on the album <span id="track-album">' + track.album.name + '</span>' +
      'by <span id="track-artist">' + track.album.artist.name + '</span>';
  }

  trackInfo.innerHTML = infoHTML;
}

(function () {
  console.log('init()');

  updateTrackDetails();

  sp.trackPlayer.addEventListener('playerStateChanged', function (event) {
    // Only update the page if the track changed
    if (event.data.curtrack == true) {
        updatePageWithTrackDetails();
    }
  });
})();
