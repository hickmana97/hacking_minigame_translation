function setup() {
  createCanvas(600, 500);
  background('black');
  textFont('Courier New');
  textSize(20);
  stroke(2, 216, 24);
  strokeWeight(1);
  fill(2, 216, 24);
  passwordList = new Passwords();
  game = new Game();
}

function draw(){
  game.play();
}

class Game{

  constructor(){
    this.attemptsLeft = 4;
    this.location = [10, 20];
    this.textOffset = textSize() * 1.25;
    this.passwordList = passwordList.generatePasswordList()
    this.passwordList = passwordList.passwordsGenerated

  }
  
  play(){
    this.displayHeader();
    console.log(this.passwordList)
    
  } 
  
  displayHeader(){
    this.header = ['DEBUG MODE', this.attemptsLeft + ' ATTEMPTS LEFT', ''];
    this.displayLine(this.header);
  }
  
  displayLine(string){
    loop();
    for(let item of string){
      text(item, this.location[0], this.location[1]);
      this.location[1] = this.location[1] + this.textOffset;
    }
    this.location[1] = this.location[1] + this.textOffset;
    noLoop();
  }
  
}

class Passwords{
  constructor(){
    this.passwordsGenerated = []
    this.samplePasswords = []
  }
  generatePasswordList(){
    this.samplePasswords.push('PROVIDE', 'SETTING', 'CANTINA', 'CUTTING', 'HUNTERS', 'SURVIVE',  'HEARING', 'HUNTING', 'REALIZE', 'NOTHING', 'OVERLAP', 'FINDING', 'PUTTING', 'NURTURE', 'RELIEVE', 'DESTROY', 'HABITAT', 'ICEBERG', 'VACCINE', 'VACANCY', 'ABIDING', 'ABILITY');
    for(; this.passwordsGenerated.length < 13;){
      let selection = random(this.samplePasswords);
      if(this.passwordsGenerated.includes(selection)){
        let selection = random(this.samplePasswords);
      }
      else{
      this.passwordsGenerated.push(selection)
      }
    }
    this.passwordsGenerated.push('')

  }
  
}
