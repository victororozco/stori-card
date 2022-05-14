/**
 * Use in handlers
 * @param {Object} err { message, errorCode, errorDetail, statusCode }
 * @param {Object} others
 * @returns Express response
 */
export const handleError = ({
  message,
  errorCode,
  errorDetail,
  statusCode = 400
}) => {
  const data = {
    status: statusCode,
    response: {
      message: (message && typeof message !== 'object' && message !== null) ? message : 'Error al procesar su consulta, valide la información e intente de nuevo.',
      messageWithCode: (message && typeof message !== 'object' && message !== null) ? `${errorCode || ''} ${message}` : `${errorCode || ''} Error al procesar su consulta, valide la información e intente de nuevo.`,
      errorDetail: errorDetail,
      errorCode: errorCode,
      type: 'error'
    }
  }

  return data
}

/**
 * Use only on routes
 * @param {Object} err { status, errorDetail, message }
 * @param {Object} others
 * @param {Express response method} res
 * @returns Express response
 */
export const handleErrorWithResponse = (err = {}, others, res) => {
  console.error('handleErrorWithResponse: ', JSON.stringify(err))

  const {
    message,
    errorDetail,
    status,
    messageWithCode
  } = err

  return res.status(status || 500).json({
    error: {
      message: message || 'Error al procesar su consulta, valide la información e intente de nuevo.',
      errorDetail,
      messageWithCode
    },
    ...others
  })
}