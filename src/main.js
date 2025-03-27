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
}

function create() {
  this.spaceship = this.add.image(400, 300, "spaceship");
  this.spaceship.setScale(0.1);

  this.wasd = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });
}

function update() {
  const { wasd, spaceship } = this;

  if (wasd.left.isDown) {
    spaceship.x -= 5;
  } else if (wasd.right.isDown) {
    spaceship.x += 5;
  }

  if (wasd.up.isDown) {
    spaceship.y -= 5;
  } else if (wasd.down.isDown) {
    spaceship.y += 5;
  }
}

new Phaser.Game(config);
