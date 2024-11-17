class StatusBars extends DrawableObjects {
  // ctx;
 
  // maxHealth = 100;
  // currentHealth;
  percentage;
  healthBarImages = [
    "Grafics/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "Grafics/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "Grafics/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "Grafics/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "Grafics/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "Grafics/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  constructor() {
    super();
    this.x = 20;
    this.y = 0;
    this.width = 200;
    this.height = 60
    this.loadImages(this.healthBarImages);
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.healthBarImages[this.findImgIndex()];
    this.img = this.imageCache[path];
  }

  findImgIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }

  // constructor(ctx, currentHealth) {
  //   super();
  //   this.ctx = ctx;
  //   this.currentHealth = currentHealth;
  //   this.loadImages(this.healthBarImages);
  // }

  // drawHealthBar() {
  //   let healthIndex;

  //   if (this.currentHealth >= 80) {
  //     healthIndex = 5;
  //   } else if (this.currentHealth >= 60) {
  //     healthIndex = 4;
  //   } else if (this.currentHealth >= 40) {
  //     healthIndex = 3;
  //   } else if (this.currentHealth >= 20) {
  //     healthIndex = 2;
  //   } else if (this.currentHealth > 0) {
  //     healthIndex = 1;
  //   } else {
  //     healthIndex = 0;
  //   }
  //   // Obtain the image from the imageCache
  //   const healthImagePath = this.healthBarImages[healthIndex];
  //   const healthImage = this.imageCache[healthImagePath];

  //   // Make sure that the image gets completely loaded
  //   if (healthImage && healthImage.complete) {
  //     this.ctx.drawImage(healthImage, this.x, this.y, this.width, this.height);
  //   }
  // }

  // update(currentHealth) {
  //   this.currentHealth = currentHealth;
  //   this.drawHealthBar();
  // }
}
