import Phaser from "phaser";
import { shoot } from "../bullets/util";
import PlayerSpaceship from "../player/playerSpaceship";
import EnemySpaceship from "../enemies/baseEnemySpaceship";
import GruntSpaceship from "../enemies/gruntSpaceship";
import StrikerSpaceship from "../enemies/strikerSpaceship";
import DroneSpaceship from "../enemies/droneSpaceship";
import GuardSpaceship from "../enemies/guardSpaceship";


class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() { }

  create() {
    const worldWidth = 3000;
    const worldHeight = 2000;

    this.enemies = this.physics.add.group({
      classType: EnemySpaceship,
      runChildUpdate: true,
    });
    this.enemies.add(new GruntSpaceship(this, 500, 500));
    this.enemies.add(new StrikerSpaceship(this, 600, 600));
    this.enemies.add(new DroneSpaceship(this, 500, 600));
    this.enemies.add(new GuardSpaceship(this, 600, 500));

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
