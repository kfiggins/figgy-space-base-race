import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.image("spaceship", "/test/spaceship.png");
    this.load.image("spark", "/test/spark.png");
    this.load.image("blue-spark", "/test/blue-spark.png");
    this.load.image("rocket", "public/test/rocket.png")
    this.load.image("plasma", "public/test/blue-plasma.png")
    this.load.image("glassCannon", "public/test/glass-cannon.png")
  }

  create() {
    this.scene.start("GameScene");
  }
}

export default PreloadScene;
