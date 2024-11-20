class StatusBars extends DrawableObjects {
  world;
  percentage;
  
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
  bossBarImages = [
    "Grafics/img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "Grafics/img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "Grafics/img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "Grafics/img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "Grafics/img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "Grafics/img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  constructor(type, y, percentage, world) {
    super();
    this.x = 20;
    this.y = y;
    this.width = 180;
    this.height = 50;
    this.percentage = percentage;
    this.world = world;
    this.loadImages(this.healthBarImages);
    this.loadImages(this.bottlesBarImages);
    this.loadImages(this.coinsBarImages);
    this.loadImages(this.bossBarImages);
    this.setStatusBars(type, this.percentage);
  }

  updateBossBar(endboss) {
    if (endboss) {
      this.x = endboss.x + endboss.width / 2 - this.width / 2; // Centrato sul boss
      this.y = endboss.y - 20; // Posizionato sopra il boss
    }
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
    } else if (type === "BOSS") {
      this.imgArray = this.bossBarImages;
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
}
