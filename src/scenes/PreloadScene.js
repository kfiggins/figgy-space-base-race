import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.image("rocket", "/sprites/rocket.png");
    this.load.image("plasma", "/sprites/bluePlasma.png");
    this.load.image("starfield", "/tilesets/starfield.png");
    this.load.image("spaceship", "/sprites/blueSpaceship.png");
    this.load.image("spark", "/sprites/spark.png");
    this.load.image("blue-spark", "/sprites/blueSpark.png");
    this.load.image("glassCannon", "/sprites/glassCannon.png");
    this.load.image("gruntSpaceship", "/sprites/gruntSpaceship.png");
    this.load.image("strikerSpaceship", "/sprites/strikerSpaceship.png");
    this.load.image("droneSpaceship", "/sprites/droneSpaceship.png");
    this.load.image("guardSpaceship", "/sprites/guardSpaceship.png");
  }

  create() {
    this.scene.start("GameScene");
  }
}

export default PreloadScene;
