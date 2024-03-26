import Phaser from '../lib/phaser.js'

 export default class Game extends Phaser.Scene{
 
    constructor(){

    super('game'); 
    }

    preload(){
        this.load.image("background","./src/assets/bg_layer1.png"); 
        this.load.image("platform",  "./src/assets/ground_grass.png"); 
        this.load.image("bunny-stand", "./src/assets/bunny1_stand.png"); 
        
    } 
    /** @type {Phaser.Physics.Arcade.Sprite} */
    player
    /** @type {Phaser.Physics.Arcade.StaticGroup} */
    platforms
    create(){
        this.add.image(240, 320, 'background').setScrollFactor(1,0); 
        //

        //vai criar um grupo de plataforma
         this.platforms =  this.physics.add.staticGroup(); 
        for(let i = 0 ; i < 5; i++){
            const x = Phaser.Math.Between(80,400); 
            const y = 150*i; 
            /** @type {Phaser.Physics.Arcade.Sprite} */
            const platform = this.platforms.create(x, y , 'platform'); 
            //vai separar as plataformas 
            platform.scale= 0.5;
            /** @type {Phaser.Physics.Arcade.StaticBody} */
            const body = platform.body; 
            body.updateFromGameObject(); 
        }
        //criar o jogador
        this.player = this.physics.add.sprite(240, 320, 'bunny-stand').setScale(0.5);
       // colidir com a plataforma
       this.physics.add.collider(this.platforms, this.player);
       
       
       this.player.body.checkCollision.up = false; 
       this.player.body.checkCollision.down = false; 
       this.player.body.checkCollision.left = false; 
       this.player.body.checkCollision.right = false; 
       
        //camera vai começar seguir o player
        this.cameras.main.startFollow(this.player);
    }

    update(){
        // Este código em Phaser itera sobre as plataformas do jogo.
        // Se alguma plataforma estiver mais de 700 pixels abaixo da câmera principal, 
        // ajusta sua posição vertical para uma altura mais próxima da câmera. Isso corrige a posição das plataformas que caíram muito abaixo da tela.
        this.platforms.children.iterate(child=>{
            /** @type {Phaser.Physics.Arcade.Sprite} */   
            const platform = child; 
            const scrollY = this.cameras.main.scrollY; 
            if(platform.y >= scrollY+700){
                platform.y = scrollY -  Phaser.main.scrollY; 
                platform.body.updateFromGameObject(); 
            }
        })
        
        // descubra no Arcade Physics se o corpo físico do jogador
        // está tocando algo abaixo dele
    const touchingDown = this.player.body.touching.down; 
    if(touchingDown){
        // isso faz o coelho pular para cima
        this.player.setVelocityY(-300); 
    }
}
}