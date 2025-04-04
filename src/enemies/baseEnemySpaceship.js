export default class BaseEnemySpaceship extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setDepth(9);

    this.particleEmitter = scene.add.particles(0, 0, "spark", {
      speed: { min: 50, max: 350 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.2, end: 0, ease: "Power3" },
      blendMode: Phaser.BlendModes.ADD,
      lifespan: { min: 500, max: 1500 },
      gravityY: 0,
      frequency: -1,
    });
    this.particleEmitter.setDepth(1)
    this.particleEmitter.startFollow(this, 0, 0, false);

  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.particleEmitter.emitParticle(200)
      this.destroy();
    }
  }
}