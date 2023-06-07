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
    this.getGuesses();
    
    
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
    this.passwordList = passwordList.embeddedPasswords
    this.displayLine(this.passwordList)
  }
  
  getGuesses(){
    this.guessPrompt = ['ENTER PASSWORD >']
    this.displayLine(this.guessPrompt)
    this.inp = createInput('')
    this.inp.position(this.location[0] + 175, this.location[1] - (this.textOffset * 1.75))
    this.enterPressed = this.checkEnter()
    
  }
  
  checkEnter(){
    keyPressed();{
      if(keyCode === ENTER){
        return true
      }
      else{
        return false
      }
    }
  }
    
  
}

class Passwords{
  constructor(){
    this.passwordsGenerated = []
    this.samplePasswords = []
    this.embeddedPasswords = []
  }
  generatePasswordList(){
    this.samplePasswords.push('PROVIDE', 'SETTING', 'CANTINA', 'CUTTING', 'HUNTERS', 'SURVIVE',  'HEARING', 'HUNTING', 'REALIZE', 'NOTHING', 'OVERLAP', 'FINDING', 'PUTTING', 'NURTURE', 'RELIEVE', 'DESTROY', 'HABITAT', 'ICEBERG', 'VACCINE', 'VACANCY', 'ABIDING', 'ABILITY');
    for(; this.passwordsGenerated.length < 13;){
      this.selection = random(this.samplePasswords);
      while(this.passwordsGenerated.includes(this.selection)){
        this.selection = random(this.samplePasswords)
      }
      this.passwordsGenerated.push(this.selection);
    
      this.embedSelection = this.embedPasswordList(this.selection, 20);
      this.embeddedPasswords.push(this.embedSelection)
      
    }
    this.embeddedPasswords.push('');
    var correctPassword = random(this.passwordsGenerated)
    console.log(correctPassword)
    

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
    return this.embeddedPassword

  }
  
}
