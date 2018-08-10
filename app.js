var Koa = require('koa');
var Router = require('koa-router');
var views = require('koa-views');
var bodyParser = require('koa-bodyparser');

var app = new Koa();
var router = new Router();

app.use(bodyParser());

//配置模版引擎
app.use(views('views', {extension: 'ejs'}));

//配置路由
//ctx 上下文，包含了request 和 response
router.get('/', async (ctx) => {
    var title = '这是标题';
    await ctx.render('index', {
        title: title
    });
});
router.get('/news', async (ctx) => {
    ctx.body = '新闻';
})

//中间件 来配置公共信息
app.use( async (ctx, next) => {
    //在任意模版里都能使用
    ctx.state.username = 'jacob';

    await next();
})


router.post('/doAdd', async (ctx)=> {
    ctx.body = ctx.request.body;
})


//启动路由
app.use(router.routes())         
    .use(router.allowedMethods());      // 作用： 这是官方文档的推荐用法,我们可以看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有路由中间件最后调用.此时根据 ctx.status 设置 response 响应头

app.listen(3000);