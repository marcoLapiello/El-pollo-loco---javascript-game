/**
 * Draws the game elements on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {Object} world - The world object containing all elements to draw.
 */
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

/**
 * Adds an array of objects to the map.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {Array} objects - The array of objects to add.
 */
function addObjectToMap(ctx, objects) {
  objects.forEach((object) => {
    addToMap(ctx, object);
  });
}

/**
 * Adds a drawable object to the map.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {Object} drawableObject - The object to draw.
 */
function addToMap(ctx, drawableObject) {
  ctx.save();
  if (drawableObject.facingLeft) {
    drawObjectFacingLeft(ctx, drawableObject);
  } else {
    ctx.drawImage(drawableObject.img, drawableObject.x, drawableObject.y, drawableObject.width, drawableObject.height);
  }
  ctx.restore();
}

/**
 * Draws an object facing left on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {Object} drawableObject - The object to draw.
 */
function drawObjectFacingLeft(ctx, drawableObject) {
  ctx.translate(drawableObject.x + drawableObject.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(drawableObject.img, 0, drawableObject.y, drawableObject.width, drawableObject.height);
}
