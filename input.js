// left,right space
let input = {
    down: {},
    pressed:{},
    init() {
        window.addEventListener("keydown", (e) => {
            this.down[e.code] = true;
        })
        window.addEventListener("keyup", (e) => {
            delete this.down[e.code];
            delete this.pressed[e.code];
        })
    }
    ,
    update(gameObj) {
        let mario = gameObj.entities.mario
        if (gameObj.userControl == true) {
            //left 
            if (this.isDown("ArrowLeft")) {
                // go left
                mario.posX -= mario.velX;
                mario.currentDirection = "left";
                mario.currentState = mario.states.walkingAnim;

            }
            // right 
            if (this.isDown("ArrowRight")) {
                // go right
                mario.posX += mario.velX;
                mario.currentDirection = "right";
                mario.currentState = mario.states.walkingAnim;
            }
            // space  
            // console.log(mario.velY);
            if (this.ispressed("Space")) {
                if (mario.velY == 1.1) {
                    mario.velY -= 15;
                    mario.currentState = mario.states.jumpingAnim;
                }
            }
        }


    }
    , isDown(key) {
        return this.down[key];
    }, 
    ispressed(key){
        if(this.pressed[key]){
            return false;
        }else if(this.isDown(key)){
            return true;
        }
    }

}