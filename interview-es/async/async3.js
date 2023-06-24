async function fn1() {
    console.log('1')
    await fn2()
    console.log('2')
}
async function fn2() {
    console.log('3')
}
console.log('4')
setTimeout(() => {
    console.log('5')
}, 0)
fn1()
new Promise((resolve) => {
    console.log('6')
    resolve()
}).then(() => {
    console.log('7')
})
console.log('8')
