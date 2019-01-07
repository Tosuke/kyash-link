const PORT = parseInt(process.env.PORT || '8080', 10)

import Koa from 'koa'
import router from './routes'

const app = new Koa()
app.use(router.routes())

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

