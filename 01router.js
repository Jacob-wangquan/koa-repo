var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

//配置路由
//ctx 上下文，包含了request 和 response
router.get('/', async (ctx) => {
    ctx.body = '首页';  //返回数据
}).get('/news', async (ctx) => {
    ctx.body = '新闻';
});
router.get('/newscontent',async (ctx,next)=>{
    let url =ctx.url;
    //从 request 中获取 GET 请求
    let request =ctx.request;
    let req_query = request.query;
    let req_querystring = request.querystring;
    //从上下文中直接获取
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;
    ctx.body={
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring
    }
});
router.get('/product/:aid',async (ctx)=>{
    console.log(ctx.params); //{ aid: '123' } //获取动态路由的数据
    ctx.body='这是商品页面';
});

//启动路由
app.use(router.routes())         
    .use(router.allowedMethods());      // 作用： 这是官方文档的推荐用法,我们可以看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有路由中间件最后调用.此时根据 ctx.status 设置 response 响应头

app.listen(3000);