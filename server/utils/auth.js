const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

let i = 0 //using this as a counter to reduce console.logging of token status

module.exports = {
    //Custom error message when authentication fails (resolvers)
    AuthenticationError: new GraphQLError('Could not authenticate user.', {
        extensions: {
            code: 'UNAUTHENTICATED',
            http: {
                status: 403,
            }
        },
    }),
    //Server validation of token with requests from client
    authMiddleware: function ({req}) {
        
        i++ // add 1 to i
        
        // allows token to be received by server via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // if header, then split out "Bearer"
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        
        if (!token) {
            
            if (i % 10 === 0) {
                console.log (`\x1b[33m ┌────────────────┐ \x1b[0m\x1b[31m┌──────────────┐ \x1b[0m`);
                console.log (`\x1b[33m │ authMiddleware │ \x1b[0m\x1b[31m│ Token Absent │ \x1b[0m`); 
                console.log (`\x1b[33m └────────────────┘ \x1b[0m\x1b[31m└──────────────┘ \x1b[0m`); 
            }

            return req
        }

        // verify token and obtain user data
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;   
            
            if (i % 10 === 0) {
                console.log (`\x1b[33m ┌────────────────┐ \x1b[0m\x1b[32m┌────────────────┐ \x1b[0m`);
                console.log (`\x1b[33m │ authMiddleware │ \x1b[0m\x1b[32m│ Token Verified │ \x1b[0m`); 
                console.log (`\x1b[33m └────────────────┘ \x1b[0m\x1b[32m└────────────────┘ \x1b[0m`); 
            }
            // console.log ("server auth.js: data", data)

        } catch {

            if (i % 10 === 0) {
                console.log (`\x1b[33m ┌────────────────┐ \x1b[0m\x1b[31m┌───────────────┐ \x1b[0m`);
                console.log (`\x1b[33m │ authMiddleware │ \x1b[0m\x1b[31m│ Token Invalid │ \x1b[0m`); 
                console.log (`\x1b[33m └────────────────┘ \x1b[0m\x1b[31m└───────────────┘ \x1b[0m`); 
                res.redirect('/unauthorised')
            }
        }
        // return the request object so it can be passed to the resolver as `context`
        return req;
    },

    //Create JWT - called by "createUser" and "login" resolvers
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};
