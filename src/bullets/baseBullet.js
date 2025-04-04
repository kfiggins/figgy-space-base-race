export default class BaseBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(1);
    this.setCollideWorldBounds(true);

    this.hitParticleEmitter = scene.add.particles(0, 0, "blue-spark", {
      speed: { min: 10, max: 75 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.1, end: 0, ease: "Power3" },
      blendMode: Phaser.BlendModes.ADD,
      lifespan: { min: 200, max: 600 },
      gravityY: 0,
      frequency: -1,
    });
    this.hitParticleEmitter.setDepth(1)
    this.hitParticleEmitter.startFollow(this, 0, 0, false);

  }

  hit() {
    this.hitParticleEmitter.emitParticle(200)
    this.destroy();
  }

}