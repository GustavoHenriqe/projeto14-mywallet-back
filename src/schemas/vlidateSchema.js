function validateSchema(schema, data) {
    const { error } = schema.validate(data, { abortEarly: false })

    const errorMessages = error?.details.map((detail) => detail.message)

    if ( error ) {
        return {
            passed: false,
            errors: errorMessages
        }

    } else {
        return {
            passed: true,
            errors: null
        }
    }
}

export function validateAuthSchema(req, res, next, schema, data, status) {
    const result = validateSchema(schema, data)

    if ( result.passed === false ) {
        return res.status(status).send({ errors: result.errors })
    }

    next()
}

export default validateAuthSchema