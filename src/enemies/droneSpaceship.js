import BaseEnemySpaceship from './baseEnemySpaceship';

export default class DroneSpaceship extends BaseEnemySpaceship{
  constructor(scene, x, y) {
    super(scene, x, y, 'droneSpaceship');
    this.health = 400;
    this.setScale(0.2);
  }
}