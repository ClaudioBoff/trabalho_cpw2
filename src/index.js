import Phaser from "phaser";
import casa from "./assets/sproutLands/tilesets/Wooden House.png";
import grama from "./assets/sproutLands/tilesets/Grass.png";
import moveis from "./assets/sproutLands/objects/basicFurniture.png";
import mapaCasaJSON from "./assets/world_map.json";
import bioma from "./assets/sproutLands/objects/Basic Grass Biom things 1.png";
import agua from "./assets/sproutLands/tilesets/Water.png";
import hills from "./assets/sproutLands/tilesets/Hills.png";
import playerOne from "./assets/sproutLands/characters/Basic Charakter Spritesheet.png";
import egg from "./assets/sproutLands/objects/Egg item.png";
import music from "./assets/sounds/02.ogg";
import nom from "./assets/sounds/nom.ogg";
import sound from "./assets/sounds/jumpscare.ogg";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const config = {
    parent: 'gamediv',
    type: Phaser.AUTO,
    width: 9*16*4,
    height: 9*16*4,
    zoom: 3,
    mode: Phaser.Scale.CENTER_BOTH,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
        debug: false
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };
  
  var game = new Phaser.Game(config);
  var BGMusic;
  var soundSound;
  var nomSound;
  let eggsGroup;
  let player;
  var cursors;
  let eggs;
  let score = 0;
  var starting = 0;
  
///////////////////////////////////////////////////////////////////////

  function preload() {
    this.load.image("grama", grama);
    this.load.image("agua", agua);
    this.load.image("casa", casa);
    this.load.image("moveis", moveis);
    this.load.tilemapTiledJSON("map", mapaCasaJSON);
    this.load.image("bioma", bioma);
    this.load.image("water", agua);
    this.load.image("hills", hills);
    this.load.spritesheet('playerOne', playerOne, { frameWidth: 48, frameHeight: 48 });
    this.load.image("egg", egg);
    this.load.audio('backgroundMusic', music);
    this.load.audio('nom', nom);
    this.load.audio('sound', sound);

  }
  
  function create() {
    const map = this.make.tilemap({ key: "map" })
    const casaTileset = map.addTilesetImage("Wooden House", "casa");
    const gramaTileset = map.addTilesetImage("Grama", "grama");
    const biomaTileset = map.addTilesetImage("Bioma", "bioma");
    const aguaTileset = map.addTilesetImage("Water", "agua");
    const hillsTileset = map.addTilesetImage("Hills", "hills");
    const moveisTileset = map.addTilesetImage("basicFurniture", "moveis");
    const eggTileset = map.addTilesetImage("Egg", "egg");

    const fundoAguaLayer = map.createLayer("Fundo_agua", aguaTileset, 0, 0);//.setScale(4);
    const fundoGramaLayer = map.createLayer("Fundo_grama", gramaTileset, 0, 0);//.setScale(4);
    const altosLayer = map.createLayer("Altos", hillsTileset, 0, 0);//.setScale(4);
    const fundoCasaLayer = map.createLayer("Fundo_casa", casaTileset, 0, 0);//.setScale(4);
    const casaLayer = map.createLayer("Casa", casaTileset, 0, 0);//.setScale(4);
    const moveisCasaLayer = map.createLayer("Moveis_casa", moveisTileset, 0, 0);//.setScale(4);
    const biomaLayer = map.createLayer("Bioma", biomaTileset, 0, 0);//.setScale(4);

    const tilesetLayers = [
      fundoAguaLayer,
      fundoGramaLayer,
      altosLayer,
      fundoCasaLayer,
      casaLayer,
      moveisCasaLayer,
      biomaLayer
  ];

  tilesetLayers.forEach(layer => {
      layer.setCollisionByProperty({ Collider: true });
  });

    BGMusic = this.sound.add("backgroundMusic");
    nomSound = this.sound.add("nom");
    soundSound = this.sound.add("sound");

    cursors = this.input.keyboard.createCursorKeys();

    const spawnPointObject = map.findObject("Player_spawn", (obj) => obj.name === "spawnPoint");
    const egg1Object = map.findObject("Ovos", (obj) => obj.name == "Egg1");
    const egg2Object = map.findObject("Ovos", (obj) => obj.name == "Egg2");
    const egg3Object = map.findObject("Ovos", (obj) => obj.name == "Egg3");
    const egg4Object = map.findObject("Ovos", (obj) => obj.name == "Egg4");
    const egg5Object = map.findObject("Ovos", (obj) => obj.name == "Egg5");
    const egg6Object = map.findObject("Ovos", (obj) => obj.name == "Egg6");


    if (spawnPointObject) {
      // Retrieve spawn point coordinates
      const spawnX = spawnPointObject.x;
      const spawnY = spawnPointObject.y;

      // Spawn the player at the specified coordinates
      player = this.physics.add.sprite(spawnX, spawnY, 'playerOne');
      this.cameras.main.startFollow(player);
      this.physics.world.enable(player);
    }
    eggsGroup = this.physics.add.group();

    const egg1 = eggsGroup.create(egg1Object.x, egg1Object.y, "egg");
    const egg2 = eggsGroup.create(egg2Object.x, egg2Object.y, "egg");
    const egg3 = eggsGroup.create(egg3Object.x, egg3Object.y, "egg");
    const egg4 = eggsGroup.create(egg4Object.x, egg4Object.y, "egg");
    const egg5 = eggsGroup.create(egg5Object.x, egg5Object.y, "egg");
    const egg6 = eggsGroup.create(egg6Object.x, egg6Object.y, "egg");


    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.add.collider(player, tilesetLayers);

       this.anims.create({
        key: 'player_walk', // Animation key
        frames: this.anims.generateFrameNumbers('playerOne', { start: 0, end: 3 }), // Adjust frame range
        frameRate: 6, // Adjust frame rate
        repeat: -1, // -1 means loop indefinitely
    }) ;
    player.anims.play('player_walk', true);
    
  }


  function update() {
    console.log("Player X:", player.x, "Player Y:", player.y);
    player.body.offset.x =  16;
    player.body.offset.y = 16;
    player.body.width = 16;
    player.body.height = 16;

    if (cursors.left.isDown) {
      player.setVelocityX(-160); // Adjust the velocity based on your needs
  } else if (cursors.right.isDown) {
      player.setVelocityX(160); // Adjust the velocity based on your needs
  } else {
      player.setVelocityX(0);
  }

  if (cursors.up.isDown) {
      player.setVelocityY(-160); // Adjust the velocity based on your needs
  } else if (cursors.down.isDown) {
      player.setVelocityY(160); // Adjust the velocity based on your needs
  } else {
      player.setVelocityY(0);
  }

  this.physics.overlap(player, eggsGroup, collectEgg, null, this);

  function collectEgg(player, egg){
    egg.destroy();
    score+=1;
    nomSound.play();
  }
  if(score==1){
    alert("I have eaten all the eggs I wanted! Now I can finally cease from existence. Become the void. I was already dead from the start.");
    this.scene.stop();
    score = 0;
    BGMusic.stop();
    soundSound.play();
    sleep(2000).then(window.close);
  }

  if(starting==6){
    alert("Damn! I'm hungry af. I need me some eggs! 6 to be exact.");
    BGMusic.play();
    starting+=1;
  }
  }
