import app from './src/config/express'
import {
  port,
  env,
} from './src/config'

app.listen(port, () => console.log(`Server listening at port ${port} (${env})`));