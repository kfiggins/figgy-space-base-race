import Phaser from "phaser";
import { shoot } from "../bullets/util";
import Rocket from "../bullets/rocket";
import Plasma from "../bullets/plasma";
import GlassCannon from "../bullets/glass-cannon";

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {}

  create() {
    const worldWidth = 3000;
    const worldHeight = 2000;

    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
    this.add.tileSprite(0, 0, worldWidth, worldHeight, "starfield").setOrigin(0, 0);

    this.spaceship = this.physics.add.sprite(400, 300, "spaceship");
    this.spaceship.setScale(0.2);
    this.spaceship.setDepth(10);
    this.spaceship.setCollideWorldBounds(true);
    this.spaceship.speed = 0;
    this.spaceship.velocityX = 0;
    this.spaceship.velocityY = 0;
    this.spaceship.maxSpeed = 0;
    this.spaceship.currentWeaponIndex = 0;
    this.spaceship.weapons = [Rocket, Plasma, GlassCannon];
    this.spaceship.bullet = this.physics.add.group({
      classType: this.spaceship.weapons[this.spaceship.currentWeaponIndex],
      runChildUpdate: true,
    });

    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.startFollow(this.spaceship, true, 0.09, 0.09);
    this.cameras.main.setDeadzone(100, 100);

    this.particleEmitter = this.add.particles(0, 0, "spark", {
      x: { min: -5, max: 5 },
      y: { min: -5, max: 5 },
      speed: { min: 50, max: 200 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.1, end: 0, ease: "Power3" },
      blendMode: Phaser.BlendModes.ADD,
      lifespan: { min: 1000, max: 6000 },
      gravityY: 0,
      frequency: -1,
    });

    this.particleEmitter.startFollow(this.spaceship, 0, 0, false);

    this.input.on("pointerdown", (pointer) => {
      const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
      shoot(this, worldPoint.x, worldPoint.y);
    });

    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update() {
    const { wasd, spaceship, particleEmitter } = this;
    const speedChange = 0.05;
    const maxSpeed = 5;
    const friction = 1.03;
    const minVelocity = 0.1;
    const particleAngle = 10;
    let yIsMoving = false;
    let xIsMoving = false;

    if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
      this.spaceship.currentWeaponIndex += 1;
      this.spaceship.bullet = this.physics.add.group({
        classType: this.spaceship.weapons[this.spaceship.currentWeaponIndex % this.spaceship.weapons.length],
        runChildUpdate: true,
      });
    }

    if (wasd.left.isDown) {
      spaceship.velocityX += -speedChange;
      spaceship.rotation = Math.PI * 1.5;
      xIsMoving = true;
    } else if (wasd.right.isDown) {
      spaceship.velocityX += speedChange;
      spaceship.rotation = Math.PI / 2;
      xIsMoving = true;
    }

    if (wasd.up.isDown) {
      spaceship.velocityY += -speedChange;
      yIsMoving = true;
      spaceship.rotation = 0;
      if (wasd.left.isDown) {
        spaceship.rotation = Math.PI * 1.7;
      } else if (wasd.right.isDown) {
        spaceship.rotation = Math.PI * 0.25;
      } else {
        spaceship.rotation = 0;
      }
    } else if (wasd.down.isDown) {
      spaceship.velocityY += speedChange;
      yIsMoving = true;
      if (wasd.left.isDown) {
        spaceship.rotation = Math.PI * 1.25;
      } else if (wasd.right.isDown) {
        spaceship.rotation = Math.PI * 0.75;
      } else {
        spaceship.rotation = Math.PI;
      }
    }

    // hit max speed. remove for fun
    if (spaceship.velocityX > maxSpeed) {
      spaceship.velocityX = maxSpeed;
    }
    if (spaceship.velocityX < -maxSpeed) {
      spaceship.velocityX = -maxSpeed;
    }
    if (spaceship.velocityY > maxSpeed) {
      spaceship.velocityY = maxSpeed;
    }
    if (spaceship.velocityY < -maxSpeed) {
      spaceship.velocityY = -maxSpeed;
    }

    spaceship.x += spaceship.velocityX;
    spaceship.y += spaceship.velocityY;

    if (yIsMoving || xIsMoving) {
      particleEmitter.ops.angle.loadConfig({
        angle: {
          min: ((spaceship.rotation + Math.PI / 2) * 180) / Math.PI - particleAngle,
          max: ((spaceship.rotation + Math.PI / 2) * 180) / Math.PI + particleAngle,
        },
      });
      particleEmitter.emitParticle(2);
    }

    // Stopping the ship with some cool friction
    if (!yIsMoving && spaceship.velocityY !== 0) {
      spaceship.velocityY /= friction;
      if (Math.abs(spaceship.velocityY) < minVelocity) {
        spaceship.velocityY = 0;
      }
    }
    if (!xIsMoving && spaceship.velocityX !== 0) {
      spaceship.velocityX /= friction;
      if (Math.abs(spaceship.velocityX) < minVelocity) {
        spaceship.velocityX = 0;
      }
    }
  }
}

export default GameScene;
