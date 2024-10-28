export const testObject = {
    sensitiveDataJsonAsString: '{ "email": "hello@test.com", "password": "123456", "dontRedactMe": "123456" }',
    sensitiveDataObjectAsString: '{ email: "hello@test.com", password: "123456", dontRedactMe: "123456" }',
    sensitiveDataObject: {
        email: 'hello@test.com',
        password: '123456',
        dontRedactMe: '123456',
    },
    sensitiveDataArray: [
        {
            email: 'hello@test.com',
            password: '123456',
            dontRedactMe: '123456',
        }
    ],
    deepSensitiveDataObject: {
        email: {
            email: 'hello@test.com',
            password: '123456',
            dontRedactMe: '123456',
        }
    },
    DeepSensitiveDataArray: [
        {
            deep: [
                {
                    email: 'hello@test.com',
                    dontRedactMe: '123456',
                },
                {
                    password: '123456',
                    dontRedactMe: '123456',
                }
            ]
        }
    ],
    sensitiveDataArrayAsString: '[{ "email": "hello@test.com", "dontReactMe": "123456" }]',
    sensitiveDataObjectWithStringObjects: {
        email: '{ "email": "hello@test.com" }',
        password: '{ "password": "password" }',
        dontRedactMe: '{ "dontRedactMe": "123456" }',
    },
    email: true,
}

export const expectedTestObject = {
    sensitiveDataJsonAsString: '{ "email": "[REACTED]", "password": "[REACTED]", "dontRedactMe": "123456" }',
    sensitiveDataObjectAsString: '{ email: "[REACTED]", password: "[REACTED]", dontRedactMe: "123456" }',
    sensitiveDataObject: {
        email: '[REACTED]',
        password: '[REACTED]',
        dontRedactMe: '123456',
    },
    sensitiveDataArray: [
        {
            email: '[REACTED]',
            password: '[REACTED]',
            dontRedactMe: '123456',
        }
    ],
    deepSensitiveDataObject: {
        email: {
            email: '[REACTED]',
            password: '[REACTED]',
            dontRedactMe: '123456',
        }
    },
    DeepSensitiveDataArray: [
        {
            deep: [
                {
                    email: '[REACTED]',
                    dontRedactMe: '123456',
                },
                {
                    password: '[REACTED]',
                    dontRedactMe: '123456',
                }
            ]
        }
    ],
    sensitiveDataArrayAsString: '[{ "email": "[REACTED]", "dontReactMe": "123456" }]',
    sensitiveDataObjectWithStringObjects: {
        email: '{ "email": "[REACTED]" }',
        password: '{ "password": "[REACTED]" }',
        dontRedactMe: '{ "dontRedactMe": "123456" }',
    },
    email: '[REACTED]',
}

export const blackList = [
    'email',
    'password',
]