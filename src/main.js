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
  // Load your assets here
}

function create() {
  this.add.text(200, 300, "Hello Phaser!", {
    font: "32px Arial",
    fill: "#ffffff",
  });
}

function update() {
  // Game loop logic here
}

new Phaser.Game(config);
