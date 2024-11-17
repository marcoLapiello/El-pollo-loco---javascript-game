class StatusBars extends MovableObject {
  ctx;
  x = 20;
  y = 10;
  width = 200;
  height = 50;
  maxHealth = 100;
  currentHealth;
  healthBarImages = [
    "Grafics/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "Grafics/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "Grafics/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "Grafics/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "Grafics/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "Grafics/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  constructor(ctx, currentHealth) {
    super();
    this.ctx = ctx;
    this.currentHealth = currentHealth;
    this.loadImages(this.healthBarImages);
  }

  drawHealthBar() {
    let healthIndex;

    if (this.currentHealth >= 80) {
      healthIndex = 5;
    } else if (this.currentHealth >= 60) {
      healthIndex = 4;
    } else if (this.currentHealth >= 40) {
      healthIndex = 3;
    } else if (this.currentHealth >= 20) {
      healthIndex = 2;
    } else if (this.currentHealth > 0) {
      healthIndex = 1;
    } else {
      healthIndex = 0;
    }
    // Obtain the image from the imageCache
    const healthImagePath = this.healthBarImages[healthIndex];
    const healthImage = this.imageCache[healthImagePath];

    // Make sure that the image gets completely loaded
    if (healthImage && healthImage.complete) {
      this.ctx.drawImage(healthImage, this.x, this.y, this.width, this.height);
    }
  }

  update(currentHealth) {
    this.currentHealth = currentHealth;
    this.drawHealthBar();
  }
}
