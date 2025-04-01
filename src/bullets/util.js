export const shoot = (scene, targetX, targetY) => {
  const bullet = scene.spaceship.bullet.get();
  if (bullet) {
    bullet.fire(scene.spaceship.x, scene.spaceship.y, targetX, targetY);
  }
}