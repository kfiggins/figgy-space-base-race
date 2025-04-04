import BaseEnemySpaceship from './baseEnemySpaceship';

export default class GruntSpaceship extends BaseEnemySpaceship {
  constructor(scene, x, y) {
    super(scene, x, y, 'gruntSpaceship');
    this.health = 200;
    this.setScale(1);
  }

}