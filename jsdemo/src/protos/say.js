/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const SayJsDemoRequest = $root.SayJsDemoRequest = (() => {

    /**
     * Properties of a SayJsDemoRequest.
     * @exports ISayJsDemoRequest
     * @interface ISayJsDemoRequest
     * @property {string|null} [content] SayJsDemoRequest content
     */

    /**
     * Constructs a new SayJsDemoRequest.
     * @exports SayJsDemoRequest
     * @classdesc Represents a SayJsDemoRequest.
     * @implements ISayJsDemoRequest
     * @constructor
     * @param {ISayJsDemoRequest=} [properties] Properties to set
     */
    function SayJsDemoRequest(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SayJsDemoRequest content.
     * @member {string} content
     * @memberof SayJsDemoRequest
     * @instance
     */
    SayJsDemoRequest.prototype.content = "";

    /**
     * Creates a new SayJsDemoRequest instance using the specified properties.
     * @function create
     * @memberof SayJsDemoRequest
     * @static
     * @param {ISayJsDemoRequest=} [properties] Properties to set
     * @returns {SayJsDemoRequest} SayJsDemoRequest instance
     */
    SayJsDemoRequest.create = function create(properties) {
        return new SayJsDemoRequest(properties);
    };

    /**
     * Encodes the specified SayJsDemoRequest message. Does not implicitly {@link SayJsDemoRequest.verify|verify} messages.
     * @function encode
     * @memberof SayJsDemoRequest
     * @static
     * @param {ISayJsDemoRequest} message SayJsDemoRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SayJsDemoRequest.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.content != null && Object.hasOwnProperty.call(message, "content"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.content);
        return writer;
    };

    /**
     * Encodes the specified SayJsDemoRequest message, length delimited. Does not implicitly {@link SayJsDemoRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SayJsDemoRequest
     * @static
     * @param {ISayJsDemoRequest} message SayJsDemoRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SayJsDemoRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SayJsDemoRequest message from the specified reader or buffer.
     * @function decode
     * @memberof SayJsDemoRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SayJsDemoRequest} SayJsDemoRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SayJsDemoRequest.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SayJsDemoRequest();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.content = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SayJsDemoRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SayJsDemoRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SayJsDemoRequest} SayJsDemoRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SayJsDemoRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SayJsDemoRequest message.
     * @function verify
     * @memberof SayJsDemoRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SayJsDemoRequest.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.content != null && message.hasOwnProperty("content"))
            if (!$util.isString(message.content))
                return "content: string expected";
        return null;
    };

    /**
     * Creates a SayJsDemoRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SayJsDemoRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SayJsDemoRequest} SayJsDemoRequest
     */
    SayJsDemoRequest.fromObject = function fromObject(object) {
        if (object instanceof $root.SayJsDemoRequest)
            return object;
        let message = new $root.SayJsDemoRequest();
        if (object.content != null)
            message.content = String(object.content);
        return message;
    };

    /**
     * Creates a plain object from a SayJsDemoRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SayJsDemoRequest
     * @static
     * @param {SayJsDemoRequest} message SayJsDemoRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SayJsDemoRequest.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.content = "";
        if (message.content != null && message.hasOwnProperty("content"))
            object.content = message.content;
        return object;
    };

    /**
     * Converts this SayJsDemoRequest to JSON.
     * @function toJSON
     * @memberof SayJsDemoRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SayJsDemoRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for SayJsDemoRequest
     * @function getTypeUrl
     * @memberof SayJsDemoRequest
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    SayJsDemoRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/SayJsDemoRequest";
    };

    return SayJsDemoRequest;
})();

export const SayJsDemoReply = $root.SayJsDemoReply = (() => {

    /**
     * Properties of a SayJsDemoReply.
     * @exports ISayJsDemoReply
     * @interface ISayJsDemoReply
     * @property {number|null} [code] SayJsDemoReply code
     * @property {string|null} [tip] SayJsDemoReply tip
     */

    /**
     * Constructs a new SayJsDemoReply.
     * @exports SayJsDemoReply
     * @classdesc Represents a SayJsDemoReply.
     * @implements ISayJsDemoReply
     * @constructor
     * @param {ISayJsDemoReply=} [properties] Properties to set
     */
    function SayJsDemoReply(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SayJsDemoReply code.
     * @member {number} code
     * @memberof SayJsDemoReply
     * @instance
     */
    SayJsDemoReply.prototype.code = 0;

    /**
     * SayJsDemoReply tip.
     * @member {string} tip
     * @memberof SayJsDemoReply
     * @instance
     */
    SayJsDemoReply.prototype.tip = "";

    /**
     * Creates a new SayJsDemoReply instance using the specified properties.
     * @function create
     * @memberof SayJsDemoReply
     * @static
     * @param {ISayJsDemoReply=} [properties] Properties to set
     * @returns {SayJsDemoReply} SayJsDemoReply instance
     */
    SayJsDemoReply.create = function create(properties) {
        return new SayJsDemoReply(properties);
    };

    /**
     * Encodes the specified SayJsDemoReply message. Does not implicitly {@link SayJsDemoReply.verify|verify} messages.
     * @function encode
     * @memberof SayJsDemoReply
     * @static
     * @param {ISayJsDemoReply} message SayJsDemoReply message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SayJsDemoReply.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.code != null && Object.hasOwnProperty.call(message, "code"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
        if (message.tip != null && Object.hasOwnProperty.call(message, "tip"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.tip);
        return writer;
    };

    /**
     * Encodes the specified SayJsDemoReply message, length delimited. Does not implicitly {@link SayJsDemoReply.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SayJsDemoReply
     * @static
     * @param {ISayJsDemoReply} message SayJsDemoReply message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SayJsDemoReply.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SayJsDemoReply message from the specified reader or buffer.
     * @function decode
     * @memberof SayJsDemoReply
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SayJsDemoReply} SayJsDemoReply
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SayJsDemoReply.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SayJsDemoReply();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.code = reader.int32();
                    break;
                }
            case 2: {
                    message.tip = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SayJsDemoReply message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SayJsDemoReply
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SayJsDemoReply} SayJsDemoReply
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SayJsDemoReply.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SayJsDemoReply message.
     * @function verify
     * @memberof SayJsDemoReply
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SayJsDemoReply.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.code != null && message.hasOwnProperty("code"))
            if (!$util.isInteger(message.code))
                return "code: integer expected";
        if (message.tip != null && message.hasOwnProperty("tip"))
            if (!$util.isString(message.tip))
                return "tip: string expected";
        return null;
    };

    /**
     * Creates a SayJsDemoReply message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SayJsDemoReply
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SayJsDemoReply} SayJsDemoReply
     */
    SayJsDemoReply.fromObject = function fromObject(object) {
        if (object instanceof $root.SayJsDemoReply)
            return object;
        let message = new $root.SayJsDemoReply();
        if (object.code != null)
            message.code = object.code | 0;
        if (object.tip != null)
            message.tip = String(object.tip);
        return message;
    };

    /**
     * Creates a plain object from a SayJsDemoReply message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SayJsDemoReply
     * @static
     * @param {SayJsDemoReply} message SayJsDemoReply
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SayJsDemoReply.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.code = 0;
            object.tip = "";
        }
        if (message.code != null && message.hasOwnProperty("code"))
            object.code = message.code;
        if (message.tip != null && message.hasOwnProperty("tip"))
            object.tip = message.tip;
        return object;
    };

    /**
     * Converts this SayJsDemoReply to JSON.
     * @function toJSON
     * @memberof SayJsDemoReply
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SayJsDemoReply.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for SayJsDemoReply
     * @function getTypeUrl
     * @memberof SayJsDemoReply
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    SayJsDemoReply.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/SayJsDemoReply";
    };

    return SayJsDemoReply;
})();

export { $root as default };
