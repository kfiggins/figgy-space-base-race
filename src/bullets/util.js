export const shoot = (scene, targetX, targetY) => {
  const bullet = scene.player.bullets.get();
  if (bullet) {
    const pointer = scene.input.activePointer;
        const angle = Phaser.Math.Angle.Between(
          scene.player.turret.x, scene.player.turret.y,
            pointer.worldX, pointer.worldY
        );
        
        // Calculate the barrel end position
        const barrelLength = 25; // Adjust based on your sprite's size and scale
        const startX = scene.player.turret.x + Math.cos(angle) * barrelLength;
        const startY = scene.player.turret.y + Math.sin(angle) * barrelLength;
    bullet.fire(startX, startY, targetX, targetY);
  }
}

export const calculateAngle = (angle, diff) => {
  return {
    min: (((angle + Math.PI) * 180) / Math.PI) - diff,
    max: (((angle + Math.PI) * 180) / Math.PI) + diff,
  }
}