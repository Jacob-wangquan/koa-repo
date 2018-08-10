
function getData(){
    return 'shuju';
}

console.log(getData());

//获取async 异步方法里的数据
// 第一种  async 返回的是promise对象
async function getData2(){
    return 'shuju2';
}

console.log(getData2());  //Promise { 'shuju2' }

var p = getData2();
p.then((data) => {
    console.log(data);   //shuju2
})

//第二种  await必须要用在异步方法里
async function getData3(){
    return 'shuju3';
}
async function test() {
    var d = await getData3();
    console.log(d);
}

test();  // shuju3

// await 阻塞的功能：将异步改成了同步
async function getData4(){
    console.log(2);
}
async function test2() {
    console.log(1);
    var d = await getData4();
    console.log(3);
}

test2(); //1 2 3