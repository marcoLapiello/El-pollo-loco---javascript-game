import { Level } from '../models/level.class.js';
import { Chicken } from '../models/chicken.class.js';
import { Clouds } from '../models/cloud.class.js';
import { Background } from '../models/background.class.js';
import { Endboss } from '../models/endboss.class.js';
import { Chick } from '../models/chick.class.js';

export const level1 = new Level(
  [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chick,
    new Chick,
    new Chick,
    new Chick,
    new Chick,
    new Chick,
    new Chick,
    new Chick,
    new Chick,
    new Chick,
    new Endboss(),
  ],
  [ new Clouds(),
    new Clouds(),
    new Clouds(),
    new Clouds(),
    new Clouds(),
    new Clouds(),
  ],
  [
    new Background("Grafics/img/5_background/layers/air.png", -719, 0),
    new Background("Grafics/img/5_background/layers/3_third_layer/2.png", -719, 0),
    new Background("Grafics/img/5_background/layers/2_second_layer/2.png", -719, 0),
    new Background("Grafics/img/5_background/layers/1_first_layer/2.png", -719, 0),

    new Background("Grafics/img/5_background/layers/air.png", 0, 0),
    new Background("Grafics/img/5_background/layers/3_third_layer/1.png", 0, 0),
    new Background("Grafics/img/5_background/layers/2_second_layer/1.png", 0, 0),
    new Background("Grafics/img/5_background/layers/1_first_layer/1.png", 0, 0),

    new Background("Grafics/img/5_background/layers/air.png", 719, 0),
    new Background("Grafics/img/5_background/layers/3_third_layer/2.png", 719, 0),
    new Background("Grafics/img/5_background/layers/2_second_layer/2.png", 719, 0),
    new Background("Grafics/img/5_background/layers/1_first_layer/2.png", 719, 0),

    new Background("Grafics/img/5_background/layers/air.png", 719 * 2, 0),
    new Background("Grafics/img/5_background/layers/3_third_layer/1.png", 719 * 2, 0),
    new Background("Grafics/img/5_background/layers/2_second_layer/1.png", 719 * 2, 0),
    new Background("Grafics/img/5_background/layers/1_first_layer/1.png", 719 * 2, 0),

    new Background("Grafics/img/5_background/layers/air.png", 719 * 3, 0),
    new Background("Grafics/img/5_background/layers/3_third_layer/2.png", 719 * 3, 0),
    new Background("Grafics/img/5_background/layers/2_second_layer/2.png", 719 * 3, 0),
    new Background("Grafics/img/5_background/layers/1_first_layer/2.png", 719 * 3, 0),
  
    new Background("Grafics/img/5_background/layers/air.png", 719 * 4, 0),
    new Background("Grafics/img/5_background/layers/3_third_layer/1.png", 719 * 4, 0),
    new Background("Grafics/img/5_background/layers/2_second_layer/1.png", 719 * 4, 0),
    new Background("Grafics/img/5_background/layers/1_first_layer/1.png", 719 * 4, 0),
  ]
);

