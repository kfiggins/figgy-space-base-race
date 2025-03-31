// src/scenes/GameScene.js
import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    // Assets specific to this scene could be loaded here if needed
  }

  create() {
    this.spaceship = this.add.image(400, 300, "spaceship");
    this.spaceship.setScale(0.2);
    this.spaceship.setDepth(1);

    this.particleEmitter = this.add.particles(0, 0, "spark", {
      x: { min: -5, max: 5 },
      y: { min: -5, max: 5 },
      speed: { min: 50, max: 200 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.1, end: 0, ease: "Power3" },
      blendMode: Phaser.BlendModes.ADD,
      lifespan: { min: 500, max: 1500 },
      gravityY: 0,
      frequency: -1,
      quantity: 2,
    });

    this.particleEmitter.startFollow(this.spaceship, 0, 0, false);

    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update() {
    const { wasd, spaceship, particleEmitter } = this;

    let velocityX = 0;
    let velocityY = 0;
    let isMoving = false;

    if (wasd.left.isDown) {
      velocityX = -5;
      spaceship.rotation = Math.PI * 1.5;
      isMoving = true;
    } else if (wasd.right.isDown) {
      velocityX = 5;
      spaceship.rotation = Math.PI / 2;
      isMoving = true;
    }

    if (wasd.up.isDown) {
      velocityY = -5;
      isMoving = true;
      spaceship.rotation = 0;
      if (wasd.left.isDown) {
        spaceship.rotation = Math.PI * 1.7;
      } else if (wasd.right.isDown) {
        spaceship.rotation = Math.PI * 0.25;
      } else {
        spaceship.rotation = 0;
      }
    } else if (wasd.down.isDown) {
      velocityY = 5;
      isMoving = true;
      if (wasd.left.isDown) {
        spaceship.rotation = Math.PI * 1.25;
      } else if (wasd.right.isDown) {
        spaceship.rotation = Math.PI * 0.75;
      } else {
        spaceship.rotation = Math.PI;
      }
    }

    spaceship.x += velocityX;
    spaceship.y += velocityY;

    if (isMoving) {
      particleEmitter.emitParticle(2);
    }
  }
}

export default GameScene;
