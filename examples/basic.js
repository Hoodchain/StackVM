const StackVM = require('../src/index')
const vm = new StackVM()

const prog = [3, 4, 0x40000001, 0x40000000]
vm.loadProgram(prog);
vm.run();
return 0;