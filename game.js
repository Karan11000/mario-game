
const render = {
    init(gameObj) {
        // drawSky
        gameObj.tool.fillStyle = "#3498db";
        gameObj.tool.fillRect(0, 0, window.innerWidth, window.innerHeight);
        // gameObj.tool.drawImage(castleImage, 40,40,200,150);
        let mario = gameObj.entities.mario;
        gameObj.levelBuilder.stock(gameObj);
        //    console.log(mario);
        gameObj.tool.drawImage(
            mario.sprite.img
            , mario.sprite.srcX
            , mario.sprite.srcY,
            mario.sprite.srcW,
            mario.sprite.srcH,
            mario.posX,
            mario.posY,
            mario.width,
            mario.height
        )
    },
    update(gameObj) {
        // drawSky
        this.updateFrame(gameObj);
        //    console.log(mario);
        gameObj.tool.clearRect(0, 0, window.innerWidth, window.innerHeight);
        gameObj.tool.fillStyle = "#63adff";
        gameObj.tool.fillRect(0, 0, window.innerWidth, window.innerHeight);
        gameObj.levelBuilder.render(gameObj);
        let mario = gameObj.entities.mario;
        let camera = gameObj.camera
        
        this.drawEntity(camera, mario, gameObj);
        gameObj.entities.goombas.forEach((goomba) => {
            this.drawEntity(camera, goomba, gameObj);
        })
        gameObj.entities.koopas.forEach((koopa) => {
            this.drawEntity(camera, koopa, gameObj);
        })


    },
    drawEntity(camera, entity, gameObj) {
        let entityEnd = entity.posX + entity.width;
        let frameWidth = camera.start + camera.width;
        if (entity.posX >= camera.start && entityEnd <= frameWidth) {
            gameObj.tool.drawImage(
                entity.sprite.img
                , entity.sprite.srcX
                , entity.sprite.srcY,
                entity.sprite.srcW,
                entity.sprite.srcH,
                entity.posX - camera.start,
                entity.posY,
                entity.width,
                entity.height
            )
        }
    },
    updateFrame(gameObj) {
        let centerX = gameObj.entities.mario.posX +
            gameObj.entities.mario.width / 2;
        let dist = window.innerWidth / 8;

        if (centerX < gameObj.camera.start + (2 * dist)) {
            gameObj.camera.start = Math.max(centerX - dist, 0);
        }
    }
}

class Game {
    init() {
        preload()
            .then(() => {
                const canvas = document.querySelector(".board");
                canvas.height = window.innerHeight;
                canvas.width = window.innerWidth;
                const tool = canvas.getContext("2d");
                let entities = {}
                let camera = {
                    start: 0,
                    width: window.innerWidth
                }
                let gameObj = {
                    tool, canvas,
                    entities
                    , animFrame: 0,
                    levelBuilder: new LevelBuilder(levelOne),
                    camera
                    , reset: this.reset,
                    userControl: true

                }
                tool.scale(2.74, 2.74);
                let mario = new Mario(spriteSheetImage, 175, 0, 18, 18);
                gameObj.entities.mario = mario;
                gameObj.entities.goombas = [];
                gameObj.entities.koopas = [];
                gameObj.entities.bricks=[];
                levelOne.goombas.forEach((gCord) => {
                    gameObj.entities.goombas.push(new Goomba(spriteSheetImage, gCord[0], gCord[1], gCord[2], gCord[3]));
                })
                levelOne.koopas.forEach((kCord) => {
                    gameObj.entities.koopas.push(new Koopa(spriteSheetImage, kCord[0], kCord[1], kCord[2], kCord[3]));
                })
                // console.log(gameObj.entities.goombas);
                gameObj.entities.scenery = [];
                render.init(gameObj);
                input.init();
                this.update(gameObj);
            })
    }
    update(gameObj) {
        function gameloop() {
            // console.log("Hello",Math.random());
            console.log(gameObj.entities.mario.posX);
            if(gameObj.entities.mario.posX>=3200){
                if(alert('Congrats, You won')){}
                else{gameObj.reset();}
                
            }
            input.update(gameObj);
            animation.update(gameObj);
            movement.update(gameObj);
            physics.update(gameObj);
            render.update(gameObj)
            gameObj.animFrame++;
            requestAnimationFrame(gameloop);
        }
        gameloop();
    }
    reset() {
        location.reload();
    }

}
const game = new Game();
game.init();