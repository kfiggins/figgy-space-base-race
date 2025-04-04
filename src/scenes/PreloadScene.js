import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.image("rocket", "/sprites/rocket.png");
    this.load.image("plasma", "/sprites/blue-plasma.png");
    this.load.image("starfield", "/tilesets/starfield.png");
    this.load.image("spaceship", "/sprites/blueSpaceship.png");
    this.load.image("spark", "/sprites/spark.png");
    this.load.image("blue-spark", "/sprites/blue-spark.png");
    this.load.image("glassCannon", "/sprites/glass-cannon.png");
    this.load.image("gruntSpaceship", "/sprites/gruntSpaceship.png");
  }

  create() {
    this.scene.start("GameScene");
  }
}

export default PreloadScene;
