import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";


const api = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Kyle/songs'
})

class SongsService {
  constructor(){
  this.getMySongs()
  }
  
  
  

  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
      })
      .catch(err => {
        throw new Error(err);
      });
      console.log(ProxyState.songs);
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    //TODO What are you going to do with this result
      let res= await sandBoxApi.get()
  ProxyState.playlist = res.data.map(s => new Song(s))
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addSong(id) {
    let foundSongs = ProxyState.songs.find(p => p.id == id)
    await sandBoxApi.post('', foundSongs)
    ProxyState.playlist = [...ProxyState.playlist, foundSongs]
    console.log(foundSongs)
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async removeSong(id) {

  await api.delete(id)
  ProxyState.playlist= ProxyState.playlist.filter(c=>c.id !== id)
    
  }
}

const service = new SongsService();
export default service;
