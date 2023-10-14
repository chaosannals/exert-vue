import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of a SayJsDemoRequest. */
export interface ISayJsDemoRequest {

    /** SayJsDemoRequest content */
    content?: (string|null);
}

/** Represents a SayJsDemoRequest. */
export class SayJsDemoRequest implements ISayJsDemoRequest {

    /**
     * Constructs a new SayJsDemoRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISayJsDemoRequest);

    /** SayJsDemoRequest content. */
    public content: string;

    /**
     * Creates a new SayJsDemoRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SayJsDemoRequest instance
     */
    public static create(properties?: ISayJsDemoRequest): SayJsDemoRequest;

    /**
     * Encodes the specified SayJsDemoRequest message. Does not implicitly {@link SayJsDemoRequest.verify|verify} messages.
     * @param message SayJsDemoRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISayJsDemoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SayJsDemoRequest message, length delimited. Does not implicitly {@link SayJsDemoRequest.verify|verify} messages.
     * @param message SayJsDemoRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISayJsDemoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SayJsDemoRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SayJsDemoRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SayJsDemoRequest;

    /**
     * Decodes a SayJsDemoRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SayJsDemoRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SayJsDemoRequest;

    /**
     * Verifies a SayJsDemoRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SayJsDemoRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SayJsDemoRequest
     */
    public static fromObject(object: { [k: string]: any }): SayJsDemoRequest;

    /**
     * Creates a plain object from a SayJsDemoRequest message. Also converts values to other types if specified.
     * @param message SayJsDemoRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SayJsDemoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SayJsDemoRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for SayJsDemoRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a SayJsDemoReply. */
export interface ISayJsDemoReply {

    /** SayJsDemoReply code */
    code?: (number|null);

    /** SayJsDemoReply tip */
    tip?: (string|null);
}

/** Represents a SayJsDemoReply. */
export class SayJsDemoReply implements ISayJsDemoReply {

    /**
     * Constructs a new SayJsDemoReply.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISayJsDemoReply);

    /** SayJsDemoReply code. */
    public code: number;

    /** SayJsDemoReply tip. */
    public tip: string;

    /**
     * Creates a new SayJsDemoReply instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SayJsDemoReply instance
     */
    public static create(properties?: ISayJsDemoReply): SayJsDemoReply;

    /**
     * Encodes the specified SayJsDemoReply message. Does not implicitly {@link SayJsDemoReply.verify|verify} messages.
     * @param message SayJsDemoReply message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISayJsDemoReply, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SayJsDemoReply message, length delimited. Does not implicitly {@link SayJsDemoReply.verify|verify} messages.
     * @param message SayJsDemoReply message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISayJsDemoReply, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SayJsDemoReply message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SayJsDemoReply
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SayJsDemoReply;

    /**
     * Decodes a SayJsDemoReply message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SayJsDemoReply
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SayJsDemoReply;

    /**
     * Verifies a SayJsDemoReply message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SayJsDemoReply message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SayJsDemoReply
     */
    public static fromObject(object: { [k: string]: any }): SayJsDemoReply;

    /**
     * Creates a plain object from a SayJsDemoReply message. Also converts values to other types if specified.
     * @param message SayJsDemoReply
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SayJsDemoReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SayJsDemoReply to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for SayJsDemoReply
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
