import Phaser from "phaser";
import { shoot } from "../bullets/util";
import PlayerSpaceship from "../player/spaceship";

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {}

  create() {
    const worldWidth = 3000;
    const worldHeight = 2000;

    this.player = new PlayerSpaceship(this, 400, 300);

    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
    this.add.tileSprite(0, 0, worldWidth, worldHeight, "starfield").setOrigin(0, 0);
    
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setDeadzone(100, 100);
    
    

    this.input.on("pointerdown", (pointer) => {
      const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
      shoot(this, worldPoint.x, worldPoint.y);
    });
  }

  update() {
    this.player.update();
  }
}

export default GameScene;
