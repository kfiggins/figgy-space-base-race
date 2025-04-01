export const shoot = (scene, targetX, targetY) => {
  const bullet = scene.spaceship.bullet.get();
  if (bullet) {
    bullet.fire(scene.spaceship.x, scene.spaceship.y, targetX, targetY);
  }
}

export const calculateAngle = (angle, diff) => {
  return {
    min: (((angle + Math.PI) * 180) / Math.PI) - diff,
    max: (((angle + Math.PI) * 180) / Math.PI) + diff,
  }
}