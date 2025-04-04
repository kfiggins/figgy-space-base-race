import BaseEnemySpaceship from './baseEnemySpaceship';

export default class GuardSpaceship extends BaseEnemySpaceship {
  constructor(scene, x, y) {
    super(scene, x, y, 'guardSpaceship');
    this.health = 600;
    this.setScale(0.4);
  }
}