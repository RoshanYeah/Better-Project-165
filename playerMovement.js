AFRAME.registerComponent("player-movement", {
  init: function () {
    this.walk();
    this.jump()
  },
  walk: function () {
    window.addEventListener("keydown", (e) => {
      if (
        e.key === "w" ||
        e.key === "a" ||
        e.key === "s" ||
        e.key === "d"
      ) {
        var entity = document.querySelector("#sound2");
        entity.components.sound.playSound();
      }
    });
  },
  jump:function(){
    window.addEventListener("keydown",(e)=>{
      var player = document.querySelector("#camera")
      var pPos = player.getAttribute("position")

      var gravity = 0.5
      var leap = pPos.y+1.5

      if(e.key === " "){
        player.setAttribute("position", {x:pPos.x,y:leap,z:pPos.z})
      }
      if(pPos.y>1.6){
        player.setAttribute("position",{x:pPos.x,y:pPos.y-gravity,z:pPos.z})
      }
      else{
        player.setAttribute("position", {x:pPos.x,y:pPos.y,z:pPos.z})
      }

    })
  },
});
