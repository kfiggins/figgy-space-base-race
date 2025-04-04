import BaseEnemySpaceship from './baseEnemySpaceship';

export default class StrikerSpaceship extends BaseEnemySpaceship {
  constructor(scene, x, y) {
    super(scene, x, y, 'strikerSpaceship');
    this.health = 500;
    this.setScale(0.5);
  }
}