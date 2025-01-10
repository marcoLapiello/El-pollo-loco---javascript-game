class IntervalManager {
  constructor() {
    this.intervals = []; // Memorizza gli ID degli intervalli
    
  }

  // Crea un intervallo e lo memorizza
  setInterval(callback, delay) {
    const id = setInterval(callback, delay);
    this.intervals.push(id);
    return id;
  }

  // Cancella un intervallo specifico
  clearInterval(id) {
    clearInterval(id);
    this.intervals = this.intervals.filter((intervalId) => intervalId !== id);
  }

  // Cancella tutti gli intervalli
  clearAllIntervals() {
    this.intervals.forEach((id) => clearInterval(id));
    this.intervals = [];
  }

  // logIntervals() {
  //   setInterval(() => {
  //     console.log(this.intervals);
  //   }, 3000);
    
  // }
}

export const intervalManager = new IntervalManager();
export { IntervalManager };
