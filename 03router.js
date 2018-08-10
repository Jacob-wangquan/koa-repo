var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

//配置路由
//ctx 上下文，包含了request 和 response
router.get('/', async (ctx) => {
    ctx.body = '首页';  //返回数据
});
//匹配到news路由后继续向下匹配
router.get('/news', async (ctx, next) => {
    console.log('news');
    await next();
});
router.get('/news', async (ctx) => {
    ctx.body = '新闻';
});

app.use( async (ctx, next) => {
    console.log('这是中间件01');
    next();
    if(ctx.status==404){
        ctx.status = 404;
        ctx.body="这是一个 404 页面";
    }else{
        console.log(ctx.url);
    }
});

//启动路由
app.use(router.routes())         
    .use(router.allowedMethods());      // 作用： 这是官方文档的推荐用法,我们可以看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有路由中间件最后调用.此时根据 ctx.status 设置 response 响应头

app.listen(3000);