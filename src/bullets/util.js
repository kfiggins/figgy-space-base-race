export const shoot = (scene, targetX, targetY) => {
  const bullet = scene.player.bullet.get();
  if (bullet) {
    bullet.fire(scene.player.x, scene.player.y, targetX, targetY);
  }
}

export const calculateAngle = (angle, diff) => {
  return {
    min: (((angle + Math.PI) * 180) / Math.PI) - diff,
    max: (((angle + Math.PI) * 180) / Math.PI) + diff,
  }
}