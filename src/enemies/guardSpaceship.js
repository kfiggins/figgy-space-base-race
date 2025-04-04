import BaseEnemySpaceship from './baseEnemySpaceship';

export default class GuardSpaceship extends BaseEnemySpaceship {
  constructor(scene, x, y) {
    const health = 600
    super(scene, x, y, 'guardSpaceship', health);
    this.health = 600;
    this.setScale(0.4);
  }


  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    
    // Update health bar position to follow the spaceship
    this.healthBarBackground.x = this.x;
    this.healthBarBackground.y = this.y + this.height / 2 - 40;
    
    this.healthBar.x = this.x - this.healthBarWidth / 2;
    this.healthBar.y = this.y +this.height / 2 - 40;
  }
}