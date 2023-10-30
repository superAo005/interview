const add = require('./4.js');
test('1+2应该等于3',()=>{
    expect(add(1,2)).toBe(3);
});