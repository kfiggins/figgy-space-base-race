export function handleBulletHitEnemy(bullet, enemy) {
  bullet.hit();
  enemy.takeDamage(100);
}