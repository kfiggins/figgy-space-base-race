import Phaser from "phaser";
import Rocket from "../bullets/rocket";
import Plasma from "../bullets/plasma";
import GlassCannon from "../bullets/glassCannon";
import { handleBulletHitEnemy } from "../enemies/util";

export default class PlayerSpaceship extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "spaceship");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.scene = scene;
    this.setScale(0.4);
    this.setDepth(10);
    this.setCollideWorldBounds(true);
    this.speed = 0;
    this.velocityX = 0;
    this.velocityY = 0;
    this.maxSpeed = 5;
    this.friction = 1.03;
    this.minVelocity = 0.1;
    this.speedChange = 0.05;
    this.particleAngle = 10;
    this.currentWeaponIndex = 0;

    this.turret = scene.add.sprite(0, 0, "plasmaBarrel");
    this.turret.setScale(0.3);
    this.turret.setOrigin(0.5, .95);
    this.turret.setDepth(9);

    this.weapons = [
      scene.physics.add.group({
        classType: Rocket,
        runChildUpdate: true,
      }),
      scene.physics.add.group({
        classType: Plasma,
        runChildUpdate: true,
      }),
      scene.physics.add.group({
        classType: GlassCannon,
        runChildUpdate: true,
      }),
    ];

    this.weapons.forEach((weaponGroup) => {
      scene.physics.add.overlap(weaponGroup, scene.enemies, handleBulletHitEnemy, null, scene);
    });

    this.bullets = this.weapons[0];

    this.eKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.wasd = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.particleEmitter = scene.add.particles(0, 0, "spark", {
      speed: { min: 50, max: 200 },
      scale: { start: 0.1, end: 0, ease: "Power3" },
      blendMode: Phaser.BlendModes.ADD,
      lifespan: { min: 1000, max: 6000 },
      gravityY: 0,
      frequency: -1,
    });
    this.particleEmitter.setDepth(1);
    this.particleEmitter.startFollow(this, 0, 0, false);
  }

  update(time, delta) {
    const frameScale = delta / 16.666; // Normalizes to 60 FPS

    const player = this;
    const { scene, eKey, wasd } = player;

    // Update turret position to follow the ship
    this.turret.x = this.x;
    this.turret.y = this.y; // Adjust the offset as needed
    
    // Make the turret rotate to face the mouse pointer
    const pointer = scene.input.activePointer;
    const angle = Phaser.Math.Angle.Between(
        this.turret.x, this.turret.y,
        pointer.worldX, pointer.worldY
    );
    this.turret.rotation = angle+Math.PI/2;

    let yIsMoving = false;
    let xIsMoving = false;

    if (Phaser.Input.Keyboard.JustDown(eKey)) {
      player.currentWeaponIndex += 1;
      player.bullets = player.weapons[player.currentWeaponIndex % player.weapons.length];
    }

    if (wasd.left.isDown) {
      player.velocityX += -player.speedChange;
      player.rotation = Math.PI * 1.5;
      xIsMoving = true;
    } else if (wasd.right.isDown) {
      player.velocityX += player.speedChange;
      player.rotation = Math.PI / 2;
      xIsMoving = true;
    }

    if (wasd.up.isDown) {
      player.velocityY += -player.speedChange;
      yIsMoving = true;
      player.rotation = 0;
      if (wasd.left.isDown) {
        player.rotation = Math.PI * 1.7;
      } else if (wasd.right.isDown) {
        player.rotation = Math.PI * 0.25;
      } else {
        player.rotation = 0;
      }
    } else if (wasd.down.isDown) {
      player.velocityY += player.speedChange;
      yIsMoving = true;
      if (wasd.left.isDown) {
        player.rotation = Math.PI * 1.25;
      } else if (wasd.right.isDown) {
        player.rotation = Math.PI * 0.75;
      } else {
        player.rotation = Math.PI;
      }
    }

    // hit max speed. remove for fun
    if (player.velocityX > player.maxSpeed) {
      player.velocityX = player.maxSpeed;
    }
    if (player.velocityX < -player.maxSpeed) {
      player.velocityX = -player.maxSpeed;
    }
    if (player.velocityY > player.maxSpeed) {
      player.velocityY = player.maxSpeed;
    }
    if (player.velocityY < -player.maxSpeed) {
      player.velocityY = -player.maxSpeed;
    }

    player.x += player.velocityX * frameScale;
    player.y += player.velocityY * frameScale;

    if (yIsMoving || xIsMoving) {
      player.particleEmitter.ops.angle.loadConfig({
        angle: {
          min: ((player.rotation + Math.PI / 2) * 180) / Math.PI - player.particleAngle,
          max: ((player.rotation + Math.PI / 2) * 180) / Math.PI + player.particleAngle,
        },
      });
      player.particleEmitter.emitParticle(2);
    }

    if (!yIsMoving && player.velocityY !== 0) {
      player.velocityY /= Math.pow(player.friction, frameScale);
      if (Math.abs(player.velocityY) < player.minVelocity) {
        player.velocityY = 0;
      }
    }
    if (!xIsMoving && player.velocityX !== 0) {
      player.velocityX /= Math.pow(player.friction, frameScale);
      if (Math.abs(player.velocityX) < player.minVelocity) {
        player.velocityX = 0;
      }
    }
  }
}
