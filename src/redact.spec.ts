import { redact } from './index';

describe('redact', () => {

    test('should return the data if no keys are passed', () => {
        const data = { email: 'hello@test.com' };
        const result = redact(data, {
            list: [],
        });

        expect(result).toEqual(data);
    });

    test('should redact a simple object if keys exist in the provided list', () => {
        const data = {
            email: 'hello@test.com',
            password: '123456',
            dontReactMe: '123456',
        }
        const result = redact(data, {
            list: ['email', 'password']
        });

        expect(result).toEqual({
            email: '[REACTED]',
            password: '[REACTED]',
            dontReactMe: '123456',
        });
    })

    test('should allow you to set your own redact string', () => {
        const data = {
            email: 'hello@test.com',
            password: '123456',
            dontReactMe: '123456',
        }
        const result = redact(data, {
            list: ['email', 'password'],
            redactString: '[CANT-SEE-ME]'
        });

        expect(result).toEqual({
            email: '[CANT-SEE-ME]',
            password: '[CANT-SEE-ME]',
            dontReactMe: '123456',
        });
    });

    test('should redact nested objects', () => {
        const data = {
            deep: {
                email: {
                    email: ''
                },
                password: {
                    password: '123456'
                },
            }
        };
        const result = redact(data, {
            list: ['email', 'password']
        });

        expect(result).toEqual({
            deep: {
                email: {
                    email: '[REACTED]'
                },
                password: {
                    password: '[REACTED]'
                },
            }
        });
    })

    test('should redact arrays', () => {
        const data = [
            {
                email: 'hello@email.com',
                password: '123456',
                deep: [
                    {
                        email: 'hello@email.com'
                    },
                    {
                        password: '123456'
                    }
                ]
            },
            {
                email: 'test@email.com',
            }
        ];
        const result = redact(data, {
            list: ['email', 'password']
        });

        expect(result).toEqual([
            {
                email: '[REACTED]',
                password: '[REACTED]',
                deep: [
                    {
                        email: '[REACTED]'
                    },
                    {
                        password: '[REACTED]'
                    }
                ]
            },
            {
                email: '[REACTED]'
            }
        ]);

    });

    test('should redact maps', () => {
        const m = new Map()
        m.set('email', 'test@email.com');
        const data = {
            myMap: m
        };
        const result = redact(data, {
            list: ['email']
        });
        expect(result).toEqual({
            myMap: {
                email: '[REACTED]'
            }
        });
    });

    test('should redact sets', () => {
        const s = new Set([
            {
                email: 'hello@test.com'
            },
            {
                email: 'another@test.com'
            }
        ])
        const data = {
            mySet: s
        };
        const result = redact(data, {
            list: ['email']
        });
        expect(result).toEqual({
            mySet: [
                {
                    email: '[REACTED]'
                },
                {
                    email: '[REACTED]'
                }
            ]
        });
    });


    test('should redact dates', () => {
        const data = {
            date: new Date()
        };
        const result = redact(data, {
            list: ['date']
        });
        expect(result).toEqual({
            date: '[REACTED]'
        });
    });

    test('should redact Regex', () => {
        const data = {
            email: new RegExp('/test/g')
        };
        const result = redact(data, {
            list: ['email']
        });
        expect(result).toEqual({
            email: '[REACTED]'
        });
    });

    test('should redact classes', () => {
        class TestClass {
            email = 'test@email.com';
        }
        const data = {
            myClass: new TestClass()
        };
        const result = redact(data, {
            list: ['email']
        });
        expect(result).toEqual({
            myClass: {
                email: '[REACTED]'
            }
        });
    });

});