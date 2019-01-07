import Router from 'koa-router'
import send from 'koa-send'
import { UAParser } from 'ua-parser-js'

const router = new Router

const KYASH_USER_ID = process.env.KYASH_USER_ID as string

router.get(['/', '/index.html'], async(ctx) => {
  const uastring = ctx.headers['user-agent'] as string | undefined
  if (uastring != null) {
    const ua = new UAParser(uastring)
    const deviceType = ua.getDevice().type
    if(deviceType && ['mobile', 'tablet'].includes(deviceType)) {
      ctx.redirect(`kyash://qr/u/${KYASH_USER_ID}`)
      return
    } 
  }
  await send(ctx, 'static/index.html')
})

router.get('/qrcode.png', async ctx => {
  await send(ctx, 'static/qrcode.png')
})

export default router