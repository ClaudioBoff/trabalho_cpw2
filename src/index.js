import Phaser from "phaser";
import casa from "./assets/sproutLands/tilesets/Wooden House.png";
import grama from "./assets/sproutLands/tilesets/Grass.png";
import moveis from "./assets/sproutLands/objects/basicFurniture.png";
import mapaCasaJSON from "./assets/world_map.json";
import bioma from "./assets/sproutLands/objects/Basic Grass Biom things 1.png";
import agua from "./assets/sproutLands/tilesets/Water.png";
import hills from "./assets/sproutLands/tilesets/Hills.png";
import playerOne from "./assets/sproutLands/characters/Basic Charakter Spritesheet.png";


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
        debug: true
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };
  
  var game = new Phaser.Game(config);
  let player;
  var cursors;
  var enemies;
  
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
  }
  
  function create() {
    const map = this.make.tilemap({ key: "map" })
    const casaTileset = map.addTilesetImage("Wooden House", "casa");
    const gramaTileset = map.addTilesetImage("Grama", "grama");
    const biomaTileset = map.addTilesetImage("Bioma", "bioma");
    const aguaTileset = map.addTilesetImage("Water", "agua");
    const hillsTileset = map.addTilesetImage("Hills", "hills");
    const moveisTileset = map.addTilesetImage("basicFurniture", "moveis");


    const fundoAguaLayer = map.createLayer("Fundo_agua", aguaTileset, 0, 0);//.setScale(4);
    const fundoGramaLayer = map.createLayer("Fundo_grama", gramaTileset, 0, 0);//.setScale(4);
    const altosLayer = map.createLayer("Altos", hillsTileset, 0, 0);//.setScale(4);
    const fundoCasaLayer = map.createLayer("Fundo_casa", casaTileset, 0, 0);//.setScale(4);
    const casaLayer = map.createLayer("Casa", casaTileset, 0, 0);//.setScale(4);
    const moveisCasaLayer = map.createLayer("Moveis_casa", moveisTileset, 0, 0);//.setScale(4);
    const biomaLayer = map.createLayer("Bioma", biomaTileset, 0, 0);//.setScale(4);

    cursors = this.input.keyboard.createCursorKeys();

    const spawnPointObject = map.findObject("Player_spawn", (obj) => obj.name === "spawnPoint");

    if (spawnPointObject) {
      // Retrieve spawn point coordinates
      const spawnX = spawnPointObject.x;
      const spawnY = spawnPointObject.y;

      // Spawn the player at the specified coordinates
      player = this.physics.add.sprite(spawnX, spawnY, 'playerOne');
      this.cameras.main.startFollow(player);
      this.physics.world.enable(player);
    }
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
  }
