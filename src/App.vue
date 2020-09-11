<template>
  <div id="app">
    <div class="player">
    <fullscreen ref="fullscreen" @change="fullscreenChange">

      <video
        src="https://pixabay.com/videos/download/video-31377_small.mp4?attachment"
        class="video"
        ref="video"
        @click="play"
        @ended="showPlayBtn"
        @timeupdate="updateprogress"
        @canplay="updateprogress"
        playsinline
      ></video>
      <div class="show-controls">
        <div class="controls-container">
          <div class="progress-rang"  ref="progressRange" title="Seek" @click="setProgress">
            <div class="progress-bar" :style="{width: progressBarWidth}"></div>
          </div>
          <div class="control-group">
            <div class="control-left">
              <div class="play-controls">
                <font-awesome-icon :icon="playStatus" title="play" id="play-btn" @click="play" />
              </div>
              <div class="volume">
                <div class="volume-icon" @click="taggleMute">
                  <font-awesome-icon :icon="volumeIcon" title="Mute" id="volume-icon" />
                </div>
                <div class="volume-range"  ref="volumeRange" title="Change Volume" @click="changVolume">
                  <div class="volume-bar" :style="{width: volumeBarWidth}"></div>
                </div>
              </div>
            </div>
            <div class="control-rigth">
              <div class="speed" @change="changeSpeed" title="Playback Rate">
                <select name="playbackRate" v-model="speed" class="player-speed">
                  <option value="0.5">0.5 x</option>
                  <option value="0.75">0.75 x</option>
                  <option value="1">1 x</option>
                  <option value="1.5">1.5 x</option>
                  <option value="2">2 x</option>
                </select>
              </div>
              <div class="time">
                <span class="time elapsed">{{currentTime}} /</span>
                <span class="time elapsed">{{duration}}</span>
              </div>
              <div class="fullscreen" @click = "toggle">
                 <font-awesome-icon icon="expand" title="Mute" id="volume-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
     </fullscreen>

    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      playStatus: "pause",
      progressBarWidth: 0,
      currentTime:0,
      duration:0,
      volumeBarWidth: 0,
      volumeIcon:"volume-mute",
      lastVolume : 1,
      speed:0,
      fullscreen: false
    };
  },
  methods: {
   toggle () {
        this.$refs['fullscreen'].toggle() // recommended
        // this.fullscreen = !this.fullscreen // deprecated
      },
      fullscreenChange (fullscreen) {
        this.fullscreen = fullscreen
      },

    play() {
      const video = this.$refs["video"];
      if (video.paused) {
        video.play();
        this.playStatus="pause"
      } else {
        video.pause();
       this.showPlayBtn()
      }
    },
    showPlayBtn(){
 this.playStatus = "play"
    },

   displayTime(time){
     const minutes= Math.floor(time / 60)
     let seconds=Math.floor(time % 60)
     seconds = seconds>9 ? seconds :`0${seconds}`;
     return`${minutes}:${seconds}`;
   },

    updateprogress(){
      const video = this.$refs["video"];
      this.progressBarWidth=`${(video.currentTime*100)/video.duration}%`
     this.currentTime =`${this.displayTime(video.currentTime)}/`;
      this.duration = `${this.displayTime(video.duration)}`;
    },
    setProgress(e){
      const video = this.$refs["video"];
      const progressRange= this.$refs["progressRange"]
      const newTime = e.offsetX / progressRange.offsetWidth
      this.progressBarWidth = `${newTime*100}%`;
      video.currentTime = newTime * video.duration
    },
   setVolumeIcon(volume){
           if(volume > 0.7){
        this.volumeIcon =  "volume-up"
      } else if(volume < 0.7 && volume > 0){
           this.volumeIcon = "volume-down"
      }
      else{
        this.volumeIcon = "volume-off"
      }
   },
    changVolume(e){
      const video = this.$refs["video"];
      
     const volumeRange = this.$refs["volumeRange"];
      let volume = e.offsetX / volumeRange.offsetWidth

      if(volume < 0.1){
        volume = 0
      } 
      if(volume > 0.9){
        volume = 1
      }

       this.setVolumeIcon(volume)

      
      this.volumeBarWidth = `${volume*100}%`;
      video.volume = volume
      this.lastVolume = volume
      
    },
    taggleMute(){
     const video = this.$refs["video"];
     if (video.volume){
       this.lastVolume = video.volume
       video.volume = 0
       this.volumeBarWidth= 0
       this.volumeIcon = "volume-mute"
     } else{
       video.volume= this.lastVolume;
       this.volumeBarWidth = `${this.lastVolume*100}%`;
        this.setVolumeIcon(video.volume)
     }
    },

    changeSpeed(){
      const video = this.$refs["video"]
      video.playbackRate = this.speed
    }
    
  },
};
</script>

<style>
:root {
  --primary-color: dodgerblue;
  --font-color: white;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.player {
  max-width: 80vw;
  min-width: 800px;
  border: 5px solid black;
  border-radius: 10px;
  background: black;
  position: relative;
  cursor: pointer;
}

video {
  border-radius: 5px;
  width: 100%;
  height: auto;
}
.show-controls {
  width: 100%;
  height: 30%;
  z-index: 2;
  position: absolute;
  bottom: 0;
  cursor: default;
}
.controls-container {
  position: absolute;
  bottom: -5px;
  width: 100%;
  margin-top: -95px;
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  opacity: 1;
  transition: all 0.3s ease-out 2s;
      height: 7vh;
}

.show-controls:hover .controls-container {
  opacity: 1;
  transition: all 0.2s ease-out;
}
.progress-rang {
  height: 8px;
  width: calc(100% - 30px);
  background: rgba(202, 202, 202, 0.5);
  margin: auto;
  border-radius: 10px;
  position: absolute;
  left: 15px;
  top: 2px;
  cursor: pointer;
  transition: height 0.1s ease-in-out;
}
.progress-rang:hover {
  height: 10px;
}
.control-group{
      display: flex;
    width: 100%;
    justify-content: space-between;
    color:white;
        position: relative;
    top: 1.2rem;
    margin:0 5px;
}
option{
  color:black
}
.volume-range{
  height: 8px;
  width: calc(100% - 800px);
  background:transparent;
  margin: auto;
  border-radius: 10px;
  position: absolute;
  left: 60px;
  top: 4px;
  cursor: pointer;
  transition: height 0.1s ease-in-out;
}
.volume-range:hover > .volume-bar{
 background: var(--primary-color);
}

.volume-range:hover{
 background: white;

}
.volume-icon, .fullscreen{
  margin-left: 20px;
}
.speed {
  margin-right: 15px;
}

select,
option {
  cursor: pointer;
}

select {
  background: transparent;
  color: var(--font-color);
  border: none;
  font-size: 18px;
  position: relative;
  top: -2.5px;
}

select:focus {
  outline: none;
}

.progress-bar {
  background: var(--primary-color);
  width: 20%;
  height: 100%;
  border-radius: 10px;
  transition: all 0.5s ease;
}
.volume-bar{
  
  width: 100%;
  height: 100%;
  border-radius: 10px;
  transition: all 0.5s ease;
}

.control-rigth{
  display: flex;
}

.control-left{
  display: flex;
}

@media screen and(max-width: 600px) {
  .player {
    min-width: 0;
    max-width: 95vw;
  }
}
</style>
