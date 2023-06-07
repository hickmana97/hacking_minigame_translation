function setup() {
  createCanvas(600, 500);
  background('black');
  textFont('Courier New');
  textSize(17);
  stroke(2, 216, 24);
  strokeWeight(1);
  fill(2, 216, 24);
  passwordList = new Passwords();
  game = new Game();
}

function draw(){
  noLoop()
  game.play();
}

class Game{

  constructor(){
    this.attemptsLeft = 4;
    this.location = [10, 20];
    this.textOffset = textSize() * 1.25;
    

  }
  
  play(){
    this.displayHeader();
    this.displayPasswordList();
    
    
  } 
  
  displayHeader(){
    this.header = ['DEBUG MODE', this.attemptsLeft + ' ATTEMPTS LEFT', ''];
    this.displayLine(this.header);
  }
  
  displayLine(string){
    for(let item of string){
      text(item, this.location[0], this.location[1]);
      this.location[1] = this.location[1] + this.textOffset;
    }
    redraw()

  }
  
  displayPasswordList(){
    this.passwordList = passwordList.generatePasswordList()
    this.passwordList = passwordList.passwordsGenerated
    this.displayLine(this.passwordList)
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
      this.selection = random(this.samplePasswords);
      while(this.passwordsGenerated.includes(this.selection)){
        this.selection = random(this.samplePasswords)
      }
      /*if(this.passwordsGenerated.includes(this.selection)){
        this.selection = random(this.samplePasswords);
      }*/
      this.embedSelection = this.embedPasswordList(this.selection, 20);
      this.passwordsGenerated.push(this.embedSelection);
      
    }
    this.passwordsGenerated.push('');

  }
  
  embedPasswordList(word, size){
    this.filler = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=', '~', '[', ']', '{', '}'];
    this.embedding = [];
    this.wordLength = word.length;
    this.splitIndex = floor(random(0, size - this.wordLength));
    for(let i = 0; i < this.splitIndex + 1; i++){
      this.embedding.push(random(this.filler));
    }
    
    this.embedding = this.embedding.concat(word);
    
    for(let i = this.wordLength + this.splitIndex; i < size - 1; i++){
      this.embedding.push(random(this.filler));
    }
  
    this.embeddedPassword = this.embedding.join('');
    console.log(this.embeddedPassword);
    console.log(this.embeddedPassword.length);

  }
  
}
