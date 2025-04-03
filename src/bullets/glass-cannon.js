import { calculateAngle } from "./util";

export default class GlassCannon extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'glassCannon');
    this.setScale(0.02)
    this.setDepth(1)
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.particleEmitter = scene.add.particles(0, 0, "blue-spark", {
      speed: { min: 0, max: 1 },
      scale: { start: 0.1, end: 0, ease: "Power3" },
      blendMode: Phaser.BlendModes.ADD,
      lifespan: 750,
      gravityY: 0,
      frequency: -1,
    });

    this.particleEmitter.setDepth(0)
    this.particleEmitter.startFollow(this, 0, 0, false);
  }

  fire(x, y, targetX, targetY) {
    this.setPosition(x, y);

    // Calculate direction vector
    const angle = Phaser.Math.Angle.Between(x, y, targetX, targetY);
    const speed = 1000;
    this.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

    this.setRotation(angle + Math.PI);

    this.setActive(true);
    this.setVisible(true);

    this.particleEmitter.ops.angle.loadConfig({
      angle: calculateAngle(angle, 0),
    });


    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.setActive(false);
        this.setVisible(false);
      }
    });
  }

  update() {
    this.particleEmitter.emitParticle(1);
  }
}