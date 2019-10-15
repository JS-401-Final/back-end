'use strict';
/**
 * @module
 */

/**
 * Middleware to handle 500 responses if the server experiences an error.
 * @param err - Error
 * @param req - Request object
 * @param res - Response object
 * @param next - Calls the next middleware function
 */
module.exports = (err, req, res, next) => {
    let error = { error: err };
    res.statusCode = 500;
    res.statusMessage = 'Server Error';
    res.setHeader('Content-Type', 'application/json');
    res.write( JSON.stringify(error) );
    res.end();
};
