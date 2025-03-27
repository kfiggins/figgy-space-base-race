import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#1d1d1d",
  scene: {
    preload,
    create,
    update,
  },
};

function preload() {
  this.load.image("spaceship", "/test/spaceship.png");
  this.load.image("spark", "/test/spark.png");
}

function create() {
  this.spaceship = this.add.image(400, 300, "spaceship");
  this.spaceship.setScale(0.2);
  this.spaceship.setDepth(1);

  this.particleEmitter = this.add.particles(0, 0, 'spark', {
    x: { min: -5, max: 5 },  // Spread particles slightly around the ship
    y: { min: -5, max: 5 },
    speed: { min: 50, max: 200 },  // Increased speed variation
    angle: { min: 0, max: 360 },   // Particles emit in all directions
    scale: { start: 0.1, end: 0, ease: 'Power3' },  // Smoother scale transition
    blendMode: Phaser.BlendModes.ADD,
    lifespan: { min: 500, max: 1500 },  // Varied lifespan
    gravityY: 0,
    frequency: -1,  // Emit immediately when active
    quantity: 2,    // Number of particles per emission
  });

  this.particleEmitter.startFollow(this.spaceship, 0, 0, false);

  this.wasd = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });
}

function update() {
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
      spaceship.rotation = Math.PI * 1.70;
    } else if (wasd.right.isDown) {
      spaceship.rotation = Math.PI * .25;
    } else {
      spaceship.rotation = 0;
    }
  } else if (wasd.down.isDown) {
    velocityY = 5;
    isMoving = true;
    if (wasd.left.isDown) {
      spaceship.rotation = Math.PI * 1.25;
    } else if (wasd.right.isDown) {
      spaceship.rotation = Math.PI * .75;
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

new Phaser.Game(config);
