AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy");

        var scene = document.querySelector("#scene");

        for (var i = 0; i < els.length; i++) {

            //enemyBullet entity
            var enemyBullet = document.createElement("a-entity");

            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.3,
            });

            enemyBullet.setAttribute("material", {
                src:"./images/ball-texture.jpg"
            });

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x,
                y: position.y,
                z: position.z,
            });

            enemyBullet.setAttribute("class", "enemyBullet" )

            scene.appendChild(enemyBullet);

            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();

            //shooting direction
            var enemy = els[i].object3D
            
            var player = document.querySelector("#weapon2").object3D

            var camera = document.querySelector("#camera")

            //Get enemey and player position using Three.js methods
            //getWorlfPosition() method helps to get the vector value of the enemy and the player
            player.getWorldPosition(position1)
            enemy.getWorldPosition(position2)

            //set the velocity and it's direction
            var enemyVel = new THREE.Vector3()

            // camera.getWorldDirection(enemyVel)
            //subVectors() gives the result after subtracting two vectors
            enemyVel.subVectors(position1,position2).normalize()

            enemyBullet.setAttribute("velocity",enemyVel.multiplyScalar(20))
            
            //Set dynamic-body attribute
            enemyBullet.setAttribute("dynamic-body",{
                mass:"0",
                shape:"sphere"
            })
            

            //Get text attribute
            var textCount = document.querySelector("#countLife")
            var playerLife = parseInt(textCount.getAttribute("text").value)

            //collide event on enemy bullets
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon2") {

                    //Add the conditions here
                    if(playerLife>0){
                        playerLife-=1
                        textCount.setAttribute("text",{
                            value:playerLife
                        })
                    }
                    if(playerLife <= 0){
                        var gameOver = document.querySelector("#over")
                        gameOver.setAttribute("visible",true)

                        var tanlel = document.querySelectorAll(".enemy")
                        for(var i=0; i<tanlel.length;i++){
                            scene.removeChild(tanlel[i])
                        }
                    }

                }
            });

        }
    },

});