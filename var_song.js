var song = {
name: "Walk This Way",
artist: "Run-D.M.C.",
minutes: 4,
seconds: 3,
genre: "80s",
playing: false,
play: function() {
if (!playing) {
this = true;
console.log("Playing "
+ name + " by " + artist);
}
},
};
pause: function() {
if (playing) {
this.playing = false;
}
}