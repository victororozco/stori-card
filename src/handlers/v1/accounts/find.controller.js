'use strict'

import {
  Accounts
} from "../../../classes"
import mongoProvider from "../../../providers/mongo.provider"
import {
  handleError
} from "../../../utils/handle-error.utils"

const findController = (query) => new Promise(async (resolve, reject) => {
  try {

    const provider = await new mongoProvider().getClient()
    const accounts = new Accounts(provider)

    const data = await accounts.find(query)

    return resolve({
      status: 200,
      response: {
        data
      }
    })

  } catch (err) {
    console.error('src.handlers.v1.account.find.error', err)
    return reject(handleError({
      message: "Error obtaining account list",
      errorCode: "ACF001",
      errorDetail: err.message,
      statusCode: 500,
    }))
  }
})

export default findController