let regex=/hello/;
console.log(regex.test('hello'));
let regex2=/ab{2,5}c/g;
const str='abc abbc abbbc abbbbc abbbbbc abbbbbbc'
console.log(str.match(regex2));