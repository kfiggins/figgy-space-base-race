export default class GuardSpaceship extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'guardSpaceship');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(0.4);
    this.setDepth(9);
    this.setCollideWorldBounds(true);

    this.particleEmitter = scene.add.particles(0, 0, "spark", {
          x: { min: -5, max: 5 },
          y: { min: -5, max: 5 },
          speed: { min: 50, max: 200 },
          angle: { min: 0, max: 360 },
          scale: { start: 0.1, end: 0, ease: "Power3" },
          blendMode: Phaser.BlendModes.ADD,
          lifespan: { min: 500, max: 1000 },
          gravityY: 0,
          frequency: -1,
        });
        this.particleEmitter.setDepth(1)
        this.particleEmitter.startFollow(this, 0, 0, false);
  }

  update() {
    this.particleEmitter.emitParticle(2);
  }
}