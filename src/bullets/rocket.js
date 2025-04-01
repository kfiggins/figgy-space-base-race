export default class Rocket extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'rocket');
    this.setScale(0.03)
    this.setDepth(1)
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.particleEmitterRocket = scene.add.particles(0, 0, "spark", {
      x: { min: -2, max: 2 },
      y: { min: -2, max: 2 },
      speed: { min: 50, max: 100 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.08, end: 0, ease: "Power3" },
      blendMode: Phaser.BlendModes.ADD,
      lifespan: { min: 100, max: 500 },
      gravityY: 0,
      frequency: -1,
    });

    this.particleEmitterRocket.setDepth(0)
    this.particleEmitterRocket.startFollow(this, 0, 0, false);
  }

  fire(x, y, targetX, targetY) {
    this.setPosition(x, y);

    // Calculate direction vector
    const angle = Phaser.Math.Angle.Between(x, y, targetX, targetY);
    const speed = 400;
    this.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

    this.setRotation(angle + Math.PI);

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
    this.particleEmitterRocket.emitParticle(2);
  }
}