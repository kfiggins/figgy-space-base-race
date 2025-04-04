import BaseEnemySpaceship from './baseEnemySpaceship';

export default class GruntSpaceship extends BaseEnemySpaceship {
  constructor(scene, x, y) {
    const health = 200
    super(scene, x, y, 'gruntSpaceship', health);
    this.setScale(.3);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    
    // Update health bar position to follow the spaceship
    this.healthBarBackground.x = this.x;
    this.healthBarBackground.y = this.y + this.height / 2 - 30;
    
    this.healthBar.x = this.x - this.healthBarWidth / 2;
    this.healthBar.y = this.y +this.height / 2 - 30;
  }

}