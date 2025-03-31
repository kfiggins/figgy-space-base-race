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
    this.spaceship.speed = 0;
    this.spaceship.velocityX = 0;
    this.spaceship.velocityY = 0;
    this.spaceship.maxSpeed = 0;

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
    const { wasd, spaceship, particleEmitter, sys } = this;
    const { width: gameWidth, height: gameHight } = sys.game.canvas;
    const speedChange = 0.05
    const maxSpeed = 5;
    const friction = 1.03;
    const minVelocity = 0.1;
    let yIsMoving = false;
    let xIsMoving = false;

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
      spaceship.velocityX = maxSpeed
    }
    if (spaceship.velocityX < -maxSpeed) {
      spaceship.velocityX = -maxSpeed
    }
    if (spaceship.velocityY > maxSpeed) {
      spaceship.velocityY = maxSpeed
    }
    if (spaceship.velocityY < -maxSpeed) {
      spaceship.velocityY = -maxSpeed
    }

    spaceship.x += spaceship.velocityX;
    spaceship.y += spaceship.velocityY;

    // Can remove when we have a way to move through map
    if (spaceship.x > gameWidth) {
      spaceship.x = 0
    }
    if (spaceship.x < 0) {
      spaceship.x = gameWidth
    }
    if (spaceship.y > gameHight) {
      spaceship.y = 0
    }
    if (spaceship.y < 0) {
      spaceship.y = gameHight
    }

    if (yIsMoving || xIsMoving) {
      particleEmitter.ops.angle.loadConfig({
        angle: {
          min: ((spaceship.rotation + Math.PI / 2) * 180) / Math.PI - 15,
          max: ((spaceship.rotation + Math.PI / 2) * 180) / Math.PI + 15,
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
