import Phaser from "phaser";
import casa from "./assets/sproutLands/tilesets/Wooden House.png";
import grama from "./assets/sproutLands/tilesets/Grass.png";
import moveis from "./assets/sproutLands/objects/basicFurniture.png";
import mapaCasaJSON from "./assets/casa.json"


const config = {
    parent: 'gamediv',
    type: Phaser.AUTO,
    width: 9*16*4,
    height: 9*16*4,
    mode: Phaser.Scale.CENTER_BOTH,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
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
    this.load.image("tiles", casa);
    this.load.image("moveis", moveis);
    this.load.tilemapTiledJSON("map", mapaCasaJSON);
  }
  
  function create() {
    const map = this.make.tilemap({ key: "map" })
    const casaTileset = map.addTilesetImage("Wooden House", "tiles");
    const gramaTileset = map.addTilesetImage("Grass", "grama");

    const fundoCasaLayer = map.createLayer("Fundo_casa", casaTileset, 0, 0).setScale(4);
    const fundoGramaLayer = map.createLayer("Fundo_grama", gramaTileset, 0, 0).setScale(4);
    const ParedesLayer = map.createLayer("Paredes", casaTileset,0,0).setScale(4);

  }
//    const moveisTileset = map.addTilesetImage("moveis", "moveis");
  
   /* map.createStaticLayer("Fundo",tileset);
    map.createStaticLayer("Paredes",tileset);
  /* 
    const Fundo = map.createStaticLayer("Fundo", tileset, 0, 0);
    const Casa = map.createStaticLayer("Casa", [tileset, moveisTileset], 0, 0);
    const Atravessavel = map.createStaticLayer("Atravessavel", tileset, 0, 0);
    const Colisor = map.createStaticLayer("Colisor", tileset, 0, 0);
  
    Colisor.setCollisionByProperty({ collider: true });
    Casa.setCollisionByProperty({ collider: true });
    Atravessavel.setDepth(10);*/
  //}

  function update() {

  }
