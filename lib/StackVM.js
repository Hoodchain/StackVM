class StackVM {
  constructor () {
    this.theStack = []
    this.pc = 100
    this.sp = 0
    this.typ = 0
    this.dat = 0
    this.running = 1
  }
  getType (instruction) {
    let type = 0xc0000000
    type = (type & instruction) >> 30;
    return type
  }
  getData(instruction) {
    let data = 0x3fffffff;
    data = data & instruction;
    return data;
  }
  fetch () {
    this.pc++;
  }
  decode() {
    this.typ = this.getType(this.theStack[this.pc]);
    this.dat = this.getData(this.theStack[this.pc]);
  }
  execute() {
    if (this.typ === 0 || this.typ === 2) {
      this.sp++;
      this.theStack[this.sp] = this.dat;
    } else {
      this.doPrimitive();
    }
  }
  doPrimitive() {
    switch (this.dat) {
      case 0: // halt
        // std::cout << "halt" << std::endl;
        console.log('halt')
        this.running = 0;
        break;
      case 1: // add
        // std::cout << "add " << theStack[this.sp - 1] << " " << theStack[this.sp] << std::endl;
        console.log(`add ${this.theStack[this.sp - 1]} ${this.theStack[this.sp]}`)
        this.theStack[this.sp - 1] = this.theStack[this.sp - 1] + this.theStack[this.sp];
        this.sp--;
        break;
    }
  }
  run() {
    this.pc -= 1;
    while (this.running === 1) {
      this.fetch();
      this.decode();
      this.execute();
      // std::cout << "tos: " << this.theStack[this.sp] << std::endl;
      console.log(`tos: ${this.theStack[this.sp]}`)
    }
  }
  loadProgram(prog) {
    for (let i = 0; i < prog.length; i++) {
      this.theStack[this.pc + i] = prog[i];
    }	
  }
}

module.exports = StackVM
