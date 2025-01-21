export function getImprintTemplate() {
  return /*html*/ `
      <h2 class="imprintTitle">IMPRINT</h2>
  
      <p>
        <span class= "imprintText">Marco Lapiello</span>
        <span class= "imprintText">Hohenaustra&szlig;e 4</span>
        <span class= "imprintText">77815 Bühl, Deutschland</span>
      </p>
  
      <h3 class= "imprintTitle small">Contact</h3>
      <p>
        <span class= "imprintText">Phone:</span>
        <span class= "imprintText">+49 (0) 174 65 02 529</span>
      </p>
      <p>
        <span class= "imprintText">E-Mail:</span>
        <span class= "imprintText">hello@marco-lapiello-developer.com</span>
      </p>
  
      <p class= "imprintTitle small">Source: <a class= "imprintText" href="https://www.e-recht24.de">e-recht24.de</a></p>
  
    `;
}

export function getDescriptionTemplate() {
  return /*html*/ `
      <h2 id="descriptionTitle">WHAT´S GOING ON??</h2>
              <span id="descriptionText" class="gameDescription">
                A horde of angry chickens, led by their alpha rooster, is advancing toward your ranch with the aim of pillaging it. Block their path and
                defeat their boss with blasts of spicy salsa!
              </span>
    `;
}

export function getControlsTemplate() {
  return /*html*/ `
      <h3>CONTROLS</h3>
              <div class="instructions">
                <div class="instructions">
                  <div class="singleInstruction">
                    <img class="arrow" src="./Grafics/arrow_left_orange.png" alt="" />
                    <span>move left</span>
                  </div>
                  <div class="separator"></div>
                  <div class="singleInstruction reverse">
                    <img class="arrow" src="./Grafics/arrow_right_orange.png" alt="" />
                    <span>move right</span>
                  </div>
                </div>
  
                <div class="instructions">
                  <div class="singleInstruction">
                    <span class="btnName">Space</span>
                    <span>jump</span>
                  </div>
                  <div class="separator"></div>
                  <div class="singleInstruction reverse">
                    <span class="btnName">B</span>
                    <span>throw bottle</span>
                  </div>
                </div>
              </div>
    `;
}
