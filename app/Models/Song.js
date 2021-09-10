export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this.id = data.trackId || data._id;
  }

  get Template() {
      return /*html*/`
    <div class="card bg-Secondary elevation-2">
  
    <div class="card-header">
    <h3>${this.title}</h3>
    <h2>${this.artist}</h2>
    <p>$${this.price} <button class='btn btn-outline-success' onclick="app.songsController.addSong('${this.id}')">Add song to playlist</button></p>
    </div>
    <div class="card-body">
    <img class="img-fluid" src="${this.albumArt}">
    </div>
    <audio  src=${this.preview} controls></audio>
    </div>
        `
  }

  get playlistTemplate() {
    return /*html*/`
    <div class="card bg- elevation-2">
 
    <h3>${this.title}</h3>
    <h2>${this.artist}</h2>
    <p>$${this.price} <button class='btn btn-outline-danger' onclick="app.songsController.removeSong('${this.id}')">Remove from playlist</button></p>
    <img  class="img-fluid" src="${this.albumArt}">
    <audio  src=${this.preview} controls></audio>
    </div>
    `
  }
}
