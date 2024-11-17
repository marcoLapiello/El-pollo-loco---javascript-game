class StatusBars extends DrawableObjects {
  // ctx;
 
  // maxHealth = 100;
  // currentHealth;
  world;
  percentage;
  // imgArray;
  healthBarImages = [
    "Grafics/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "Grafics/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "Grafics/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "Grafics/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "Grafics/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "Grafics/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];
  bottlesBarImages = [
    "Grafics/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "Grafics/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "Grafics/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "Grafics/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "Grafics/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "Grafics/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png"
  ];
  coinsBarImages = [
    "Grafics/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "Grafics/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "Grafics/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "Grafics/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "Grafics/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "Grafics/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  constructor(type, y, percentage) {
    super();
    this.x = 20;
    this.y = y;
    this.width = 180;
    this.height = 50;
    this.percentage = percentage;
    this.loadImages(this.healthBarImages);
    this.loadImages(this.bottlesBarImages);
    this.loadImages(this.coinsBarImages);
    this.setStatusBars(type, this.percentage);
    
    console.log();
    
  }

  setStatusBars(type, percentage) {
    if (type === "HEALTH") {
      this.imgArray = this.healthBarImages;
      this.percentage = percentage;
      this.setPercentage(this.percentage, this.imgArray);
    } else if (type === "BOTTLES") {
      this.imgArray = this.bottlesBarImages;
      this.percentage = percentage;
      this.setPercentage(this.percentage, this.imgArray);
    } else if (type === "COINS") {
      this.imgArray = this.coinsBarImages;
      this.percentage = percentage;
      this.setPercentage(this.percentage, this.imgArray);
    }
    
  }

  setPercentage(percentage, imgArray) {
    this.percentage = percentage;
    this.imgArray = imgArray;
    let path = this.imgArray[this.findImgIndex()];
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
