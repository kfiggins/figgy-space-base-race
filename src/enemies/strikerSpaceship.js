import BaseEnemySpaceship from './baseEnemySpaceship';

export default class StrikerSpaceship extends BaseEnemySpaceship {
  constructor(scene, x, y) {
    const health = 500;
    super(scene, x, y, 'strikerSpaceship', health);
    this.setScale(.5);
    this.body.setSize(
      this.width * 0.50,
      this.height * 0.30
    );
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    
    // Update health bar position to follow the spaceship
    this.healthBarBackground.x = this.x;
    this.healthBarBackground.y = this.y + this.height / 2 - 18;
    
    this.healthBar.x = this.x - this.healthBarWidth / 2;
    this.healthBar.y = this.y +this.height / 2 - 18;
  }
}