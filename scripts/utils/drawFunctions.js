export function draw(ctx, world) {
  ctx.clearRect(0, 0, world.canvas.width, world.canvas.height);
  ctx.translate(world.camera_x, 0);
  addObjectToMap(ctx, world.level.background);
  addObjectToMap(ctx, world.level.clouds);
  addObjectToMap(ctx, world.collectibleManager.bottlesOnTheGround);
  addObjectToMap(ctx, world.collectibleManager.coinsAroundTheWorld);
  addObjectToMap(ctx, world.level.enemies);
  addObjectToMap(ctx, world.bottles);
  addToMap(ctx, world.character);
  addToMap(ctx, world.bossBar);
  ctx.translate(-world.camera_x, 0);
  addToMap(ctx, world.healthBar);
  addToMap(ctx, world.bottlesBar);
  addToMap(ctx, world.coinsBar);
}

function addObjectToMap(ctx, objects) {
  objects.forEach((object) => {
    addToMap(ctx, object);
  });
}

function addToMap(ctx, drawableObject) {
  ctx.save();
  if (drawableObject.facingLeft) {
    drawObjectFacingLeft(ctx, drawableObject);
  } else {
    ctx.drawImage(drawableObject.img, drawableObject.x, drawableObject.y, drawableObject.width, drawableObject.height);
  }
  ctx.restore();
}

function drawObjectFacingLeft(ctx, drawableObject) {
  ctx.translate(drawableObject.x + drawableObject.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(drawableObject.img, 0, drawableObject.y, drawableObject.width, drawableObject.height);
}
