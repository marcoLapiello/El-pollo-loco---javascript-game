class Endboss extends MovableObject {
  height = 350;
  width = 300;
  y = 125;
  offsetX = 40;
  offsetY = 100;
  widthCorrection = 60;
  heightCorrection = 110;
  isWalking = false;
  isAttacking = false;
  attackSpeedX = 1;
  startWalkingDistanceX = 720;
  startAttackingDistanceX = 180;
  

  IMAGES_ALERT = [
    "Grafics/img/4_enemie_boss_chicken/2_alert/G5.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G6.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G7.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G8.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G9.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G10.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G11.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_WALKING = [
    "Grafics/img/4_enemie_boss_chicken/1_walk/G1.png",
    "Grafics/img/4_enemie_boss_chicken/1_walk/G2.png",
    "Grafics/img/4_enemie_boss_chicken/1_walk/G3.png",
    "Grafics/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ATTACKING = [
    "Grafics/img/4_enemie_boss_chicken/3_attack/G13.png",
    "Grafics/img/4_enemie_boss_chicken/3_attack/G14.png",
    "Grafics/img/4_enemie_boss_chicken/3_attack/G15.png",
    "Grafics/img/4_enemie_boss_chicken/3_attack/G16.png",
    "Grafics/img/4_enemie_boss_chicken/3_attack/G17.png",
    "Grafics/img/4_enemie_boss_chicken/3_attack/G18.png",
    "Grafics/img/4_enemie_boss_chicken/3_attack/G19.png",
    "Grafics/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_HURT = [
    "Grafics/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "Grafics/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "Grafics/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "Grafics/img/4_enemie_boss_chicken/5_dead/G24.png",
    "Grafics/img/4_enemie_boss_chicken/5_dead/G25.png",
    "Grafics/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];


  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACKING);
    this.x = 2500;
    this.speedX = 0.7;
    this.animate();
    
    
  }

  switchWalkingAttacking(bool1, bool2){
    this.isWalking = bool1;
    this.isAttacking = bool2;
  }

  animate() {
    setInterval(() => {
      if (this.isWalking && !this.isDead()) {
        this.moveLeft();
      } else if (this.isAttacking && !this.isDead()) {
        this.x -= this.attackSpeedX;
      }
      
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isWalking && !this.isAttacking && !this.isDead()) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isAttacking && !this.isDead()) {
        this.playAnimation(this.IMAGES_ATTACKING);
        this.x -= 5;
      } else if (this.getsHurt()) {
        this.playAnimation(this.IMAGES_HURT)
      } else if (this.isWalking && !this.isAttacking) {
        this.playAnimation(this.IMAGES_WALKING);
      }
      
    }, 100);
  }
}
