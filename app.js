const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

var app = new Koa()
var router = new Router()

//Body parser
app.use(bodyParser())

//Log
app.use(async (ctx, next) => {
	const start = new Date();
  	await next();
  	const ms = new Date() - start;
  	console.log(`-> ${ctx.method} ${ctx.url} - ${ms}ms`);
})

//Router
router.get('/', function (ctx, next) {
    ctx.body = `Hello ${ctx.request.query.name}!`;
})
router.post('/', function (ctx, next) {
    ctx.body  = {route: '/', query: ctx.request.query, body: ctx.request.body};
})
app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3000)
console.info("Koa server started, listening on port %s...", 3000)

