const express = require('express');
const route = express.Router();
const userController = require('../controllers/user.controller');
const authValidate = require('../validations/auth.validate');
const expressValidation = require('express-validation');


/**
 * @swagger
 * definition:
 *   ProbeResult:
 *     properties:
 *       device_id:
 *         type: string
 *       error_msg:
 *         type: object
 *       detail:
 *         type: object
 *       timestamp:
 *         type: string
 *   ProbeStatus:
 *     properties:
 *       status:
 *         type: string
 *   GenerateCommand:
 *     properties:
 *       device_id:
 *         type: string
 *   Probe:
 *     type: "object"
 *     properties:
 *       id:
 *         type: "string"
 *       name:
 *         type: "string"
 *       script_id:
 *         type: "string"
 *       script:
 *         $ref: "#/definitions/Script"
 *       devices:
 *         type: "array"
 *         items:
 *           type: "string"
 *       enabled:
 *         type: "boolean"
 *       status:
 *         type: "object"
 *       created_by:
 *         type: "string"
 *       created_at:
 *         type: "string"
 *       updated_at:
 *         type: "string"
 *       deleted_at:
 *         type: "string"
 *   Probes:
 *     type: "array"
 *     items:
 *       $ref: "#/definitions/Probe"
 *   PaginatedProbes:
 *     properties:
 *       pagination:
 *         $ref: "#/definitions/Pagination"
 *       probes:
 *         $ref: "#/definitions/Probes"
 *   ProbeCreate:
 *     type: "object"
 *     required:
 *       - name
 *       - script_id
 *       - devices
 *       - parameter
 *       - scheduling
 *     properties:
 *       name:
 *         type: "string"
 *       script_id:
 *         type: "string"
 *       devices:
 *         type: "array"
 *         items:
 *           type: "string"
 *       enabled:
 *         type: "boolean"
 *         default: true
 *       parameter:
 *         type: "object"
 *       scheduling:
 *         type: "object"
 *   ProbeUpdate:
 *     type: "object"
 *     required:
 *       - enabled
 *     properties:
 *       name:
 *         type: "string"
 *       script_id:
 *         type: "string"
 *       devices:
 *         type: "array"
 *         items:
 *           type: "string"
 *       enabled:
 *         type: "boolean"
 *         default: true
 *       parameter:
 *         type: "object"
 *       scheduling:
 *         type: "object"
 */

/**
 * @swagger
 * /probe:
 *  get:
 *    tags:
 *      - "probe"
 *    summary: "Get all probes"
 *    description: ""
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "header"
 *      name: "x-mystq-token"
 *      description: "Authentication token"
 *      required: true
 *      type: "string"
 *    - in: query
 *      name: offset
 *      type: number
 *      required: false
 *    - in: query
 *      name: limit
 *      type: number
 *      required: false
 *      description: 'limit the number of records'
 *    - in: query
 *      name: order_by
 *      type: string
 *      required: false
 *      description: 'order result by a key'
 *    - in: query
 *      name: sort_by
 *      type: number
 *      required: false
 *      description: 'sort order ASC/DESC'
 *    - in: query
 *      name: q
 *      type: string
 *      required: false
 *      description: 'Search query'
 *    responses:
 *      200:
 *        description: "successful operation"
 *        schema:
 *          $ref: "#/definitions/PaginatedProbes"
 *      400:
 *        description: "Bad request"
 *        schema:
 *          $ref: "#/definitions/Error"
 */
route.post('/register',expressValidation(authValidate.register), userController.register);
route.post('/verify-email',expressValidation(authValidate.verifyEmail),userController.verifyEmail);
route.post('/login',expressValidation(authValidate.login), userController.login);

module.exports=route;