import { calculateAngle } from "./util";

export default class Rocket extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'rocket');
    this.setScale(0.3)
    this.setDepth(1)
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.particleEmitter = scene.add.particles(0, 0, "spark", {
      speed: { min: 50, max: 100 },
      scale: { start: 0.08, end: 0, ease: "Power3" },
      blendMode: Phaser.BlendModes.ADD,
      lifespan: { min: 100, max: 500 },
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
    const speed = 350;
    this.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

    this.setRotation(angle + Math.PI/2);

    this.setActive(true);
    this.setVisible(true);

    this.particleEmitter.ops.angle.loadConfig({
      angle: calculateAngle(angle, 30),
    });


    this.scene.time.addEvent({
      delay: 2500,
      callback: () => {
        this.setActive(false);
        this.setVisible(false);
      }
    });
  }

  update() {
    this.particleEmitter.emitParticle(2);
  }
}