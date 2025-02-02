import Phaser from './lib/phaser.js'
import Game from './scene/Game.js'

export default new Phaser.Game({
    type : Phaser.AUTO, 
    width : 480, 
    height : 640, 
    scene : Game, 
    physics:{
        default :'arcade', 
        arcade : {
            gravity : {
                y: 200
            }, 
            debug : true
        }
    }

})
