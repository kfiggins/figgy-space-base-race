import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.image("spaceship", "/test/spaceship.png");
    this.load.image("spark", "/test/spark.png");
  }

  create() {
    this.scene.start("GameScene");
  }
}

export default PreloadScene;
