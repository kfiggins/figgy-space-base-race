export default class BaseEnemySpaceship extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, maxHealth = 100) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setDepth(9);

    // Create the health bar container
    this.healthBarWidth = 40; // Width of health bar
    this.healthBarHeight = 5; // Height of health bar
    
    // Create background bar (red)
    this.healthBarBackground = scene.add.rectangle(
      x, 
      y + this.height / 2 - 10, // Position above the spaceship
      this.healthBarWidth,
      this.healthBarHeight,
      0xff0000 // Red color
    );
    
    this.healthBarBackground.setDepth(2);

    // Create foreground bar (green)
    this.healthBar = scene.add.rectangle(
      x - this.healthBarWidth / 2, // Left-align with background
      y +this.height / 2 - 10,
      this.healthBarWidth,
      this.healthBarHeight,
      0x00ff00 // Green color
    );

    this.healthBar.setDepth(2);
    
    // Set origin for the background
    this.healthBarBackground.setOrigin(0.5, 0.5);
    // Set origin for the health bar (left aligned)
    this.healthBar.setOrigin(0, 0.5);

    this.explosion = scene.add.particles(0, 0, "spark", {
      speed: { min: 50, max: 350 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.2, end: 0, ease: "Power3" },
      blendMode: Phaser.BlendModes.ADD,
      lifespan: { min: 500, max: 1500 },
      gravityY: 0,
      frequency: -1,
    });
    this.explosion.setDepth(1);
    this.explosion.startFollow(this, 0, 0, false);
    this.body.setSize(
      this.width * 0.2,  // 80% of the texture width
      this.height * 0.2  // 80% of the texture height
    );
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    
    // Update health bar position to follow the spaceship
    this.healthBarBackground.x = this.x;
    this.healthBarBackground.y = this.y + this.height / 2 - 10;
    
    this.healthBar.x = this.x - this.healthBarWidth / 2;
    this.healthBar.y = this.y +this.height / 2 - 10;
  }

  takeDamage(amount) {
    this.health -= amount;
    
    // Update health bar width based on current health percentage
    const healthPercent = Math.max(0, this.health / this.maxHealth);
    this.healthBar.width = this.healthBarWidth * healthPercent;
    
    if (this.health <= 0) {
      this.explosion.emitParticle(200);
      // Make sure to hide or destroy the health bars when the ship is destroyed
      this.healthBarBackground.destroy();
      this.healthBar.destroy();
      this.destroy();
    }
  }
  
  // Method to hide/show the health bar
  setHealthBarVisible(visible) {
    this.healthBar.setVisible(visible);
    this.healthBarBackground.setVisible(visible);
  }
}