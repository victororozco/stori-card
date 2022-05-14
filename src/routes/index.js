'use strict'

import yaml from 'yamljs'
import swaggerUi from 'swagger-ui-express'
import routesV1 from './v1.routes'

const createRoutes = (app) => {
  const appRoutesv1 = routesV1(app)

  const openapi = yaml.load('docs/openapi.yml')

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi))

  app.use('/api', appRoutesv1)

}

export default createRoutes