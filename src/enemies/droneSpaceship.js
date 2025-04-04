import BaseEnemySpaceship from './baseEnemySpaceship';

export default class DroneSpaceship extends BaseEnemySpaceship{
  constructor(scene, x, y) {
    const health = 400;
    super(scene, x, y, 'droneSpaceship', health);
    this.setScale(0.4);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    
    // Update health bar position to follow the spaceship
    this.healthBarBackground.x = this.x;
    this.healthBarBackground.y = this.y + this.height / 2 - 25;
    
    this.healthBar.x = this.x - this.healthBarWidth / 2;
    this.healthBar.y = this.y +this.height / 2 - 25;
  }
}