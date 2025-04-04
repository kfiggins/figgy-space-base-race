export default class Plasma extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'plasma');
    this.setScale(0.03)
    this.setDepth(1)
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  fire(x, y, targetX, targetY) {
    this.setPosition(x, y);

    // Calculate direction vector
    const angle = Phaser.Math.Angle.Between(x, y, targetX, targetY);
    const speed = 600;
    this.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

    this.setRotation(angle + Math.PI/2);

    this.setActive(true);
    this.setVisible(true);


    this.scene.time.addEvent({
      delay: 2000,
      callback: () => {
        this.setActive(false);
        this.setVisible(false);
      }
    });
  }

  update() {
  }
}