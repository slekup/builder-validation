//  Disable the no-param-reassign rule as it is needed to assign default values to undefined parameters.
/* eslint-disable no-param-reassign */

import { ExportedSchema, ExportedValue } from '@typings/exports';
import { ISchema } from '@typings/schema';
import {
  testEmail,
  testIpv4Address,
  testPassword,
  testPath,
  testPhoneNumber,
  testUrl,
  testUsername,
} from '@utils/tests';
import {
  ArrayValue,
  BooleanValue,
  IntegerValue,
  NumberValue,
  ObjectValue,
  StringValue,
} from './value';
import { ArrayValueOptions } from './value/ArrayValue';
import { BooleanValueOptions } from './value/BooleanValue';
import { IntegerValueOptions } from './value/IntegerValue';
import { NumberValueOptions } from './value/NumberValue';
import { ObjectValueOptions } from './value/ObjectValue';
import { StringValueOptions } from './value/StringValue';

type ValueBuilders =
  | ArrayValue
  | StringValue
  | NumberValue
  | IntegerValue
  | BooleanValue
  | ObjectValue<ValueBuilders>;

export type BuildersSchema = Record<string, ValueBuilders>;

/**
 * The Schema class, used to create schemas, which are used to validate data.
 */
export default class Schema {
  public schema: BuildersSchema;

  /**
   * Creates a new instance of the Schema class.
   */
  public constructor() {
    this.schema = {};
  }

  /**
   * Adds a array value to the schema.
   * @param options The options of the array value.
   * @returns The current Schema instance.
   */
  public addArray(options: ArrayValueOptions): this {
    const value = new ArrayValue(options);
    this.schema[value.name] = value;
    return this;
  }

  /**
   * Adds a string value to the schema.
   * @param options The options of the string value.
   * @returns The current Schema instance.
   */
  public addString(options: StringValueOptions): this {
    const value = new StringValue(options);
    this.schema[value.name] = value;
    return this;
  }

  /**
   * Adds a number value to the schema.
   * @param options The options of the number value.
   * @returns The current Schema instance.
   */
  public addNumber(options: NumberValueOptions): this {
    const value = new NumberValue(options);
    this.schema[value.name] = value;
    return this;
  }

  /**
   * Adds a integer value to the schema.
   * @param options The options of the integer value.
   * @returns The current Schema instance.
   */
  public addInteger(options: IntegerValueOptions): this {
    const value = new IntegerValue(options);
    this.schema[value.name] = value;
    return this;
  }

  /**
   * Adds a boolean value to the schema.
   * @param options The options of the boolean value.
   * @returns The current Schema instance.
   */
  public addBoolean(options: BooleanValueOptions): this {
    const value = new BooleanValue(options);
    this.schema[value.name] = value;
    return this;
  }

  /**
   * Adds a object value to the schema.
   * @param options The options of the object value.
   * @returns The current Schema instance.
   */
  public addObject(options: ObjectValueOptions<ValueBuilders>): this {
    const value = new ObjectValue<ValueBuilders>(options);
    this.schema[value.name] = value;
    return this;
  }

  /**
   * Validate an object against a schema.
   * @param data The object data to validate.
   * @param schema The schema to validate against.
   * @param properties Whether to validate the schema properties or not.
   * @returns A string if the validation fails, false otherwise.
   */
  public async validateBase<T = 'schema'>(
    data: Record<string, unknown>,
    schema:
      | (T extends 'schema' ? BuildersSchema : never)
      | (T extends 'properties' ? ISchema : never),
    properties?: boolean
  ): Promise<string | boolean> {
    // Check if the data is an object
    if (typeof data !== 'object') return 'The data provided must be an object.';

    const schemaFields = properties
      ? Object.entries(schema as ISchema)
      : Object.entries(schema as BuildersSchema);

    for (const [key, value] of schemaFields) {
      // Check if all required fields have been provided.
      // If the field has a default value as the required value is not provided, set the field to the default value.
      if (value.required) {
        if (!data[key] && value.defaultValue) {
          data[key] = value.defaultValue;
          break;
        } else if (!data[key]) {
          return `The field "${value.name ?? key}" has not been provided.`;
        }
      }

      // For non required fields, if the value is not provided, set the field to the default value if it exists.
      if (!data[key] && value.defaultValue) {
        data[key] = value.defaultValue;
        return false;
      } else if (!data[key]) {
        return false;
      }
    }

    // Check if all provided fields are the correct type
    for (const [key, value] of schemaFields) {
      // eslint-disable-next-line valid-typeof
      if (typeof data[key] !== value.type)
        return `The field "${value.name ?? key}" must be of type ${
          value.type
        }.`;
    }

    // Check if all provided fields are valid
    for (const [key, value] of schemaFields) {
      // Number validation
      if (value.type === 'number') {
        // If both min and max are provided, check if the schema value is within the range
        if (
          value.min &&
          value.max &&
          typeof data[key] === 'number' &&
          ((data[key] as number) < value.min ||
            (data[key] as number) > value.max)
        )
          return `The field "${value.name ?? key}" must be between ${
            value.min
          } and ${value.max}.`;

        // Check if the schema value is above the minimum required value
        if (
          value.min &&
          typeof data[key] === 'number' &&
          (data[key] as number) < value.min
        )
          return `The field "${value.name ?? key}" must be at least ${
            value.min
          }.`;

        // Check if the schema value is below the maximum required value
        if (
          value.max &&
          typeof data[key] === 'number' &&
          (data[key] as number) > value.max
        )
          return `The field "${value.name ?? key}" must be less than ${
            value.max
          }.`;
      }

      // Integer validation
      if (value.type === 'integer') {
        // If both min and max are provided, check if the schema value is within the range
        if (
          value.min &&
          value.max &&
          typeof data[key] === 'number' &&
          ((data[key] as number) < value.min ||
            (data[key] as number) > value.max)
        )
          return `The field "${value.name ?? key}" must be between ${
            value.min
          } and ${value.max}.`;

        // Check if the schema value is above the minimum required value
        if (
          value.min &&
          typeof data[key] === 'number' &&
          (data[key] as number) < value.min
        )
          return `The field "${value.name ?? key}" must be at least ${
            value.min
          }.`;

        // Check if the schema value is below the maximum required value
        if (
          value.max &&
          typeof data[key] === 'number' &&
          (data[key] as number) > value.max
        )
          return `The field "${value.name ?? key}" must be less than ${
            value.max
          }.`;

        // Check if the schema value is an integer
        if (
          typeof data[key] !== 'number' ||
          !Number.isInteger(data[key] as number)
        )
          return `The field "${value.name ?? key}" must be an integer.`;
      }

      // String validation
      if (value.type === 'string') {
        const req = value;
        const testVal = data[key] as string;

        // Check if the schema value is included in the schema options
        if (
          value.options &&
          value.options.length > 0 &&
          !value.options.includes(data[key] as string)
        )
          return `The field "${value.name ?? key}" is not a valid option.`;

        // If both min and max are provided, check if the schema value is within the range
        if (
          value.min &&
          value.max &&
          (testVal.length < value.min || testVal.length > value.max)
        )
          return `The field "${value.name ?? key}" must be between ${
            value.min
          } and ${value.max} characters.`;

        // Check if the schema value has the minimum required length
        if (value.min && testVal.length < value.min)
          return `The field "${value.name ?? key}" must be at least ${
            value.min
          } characters.`;

        // Check if the schema value has the maximum required length
        if (value.max && testVal.length > value.max)
          return `The field "${value.name ?? key}" must be less than ${
            value.max
          } characters.`;

        // Test if email is valid
        if (req.test === 'email' && !testEmail(testVal))
          return `The field "${
            value.name ?? key
          }" must be a valid email address.`;

        // Test if username is valid
        if (req.test === 'username' && !testUsername(testVal))
          return `The field "${value.name ?? key}" must be a valid username.`;

        // Test if password is valid
        if (req.test === 'passwordStrength' && !testPassword(testVal))
          return `The field "${
            value.name ?? key
          }" is too weak to be a valid password.`;

        // Test if phone number is valid
        if (req.test === 'phoneNumber' && !testPhoneNumber(testVal))
          return `The field "${
            value.name ?? key
          }" must be a valid phone number.`;

        // Test if IPv4 address is valid
        if (req.test === 'ipAddress' && !testIpv4Address(testVal))
          return `The field "${
            value.name ?? key
          }" must be a valid IPv4 address.`;

        // Test if a url is valid
        if (req.test === 'url' && !testUrl(testVal))
          return `The field "${
            value.name ?? key
          }" must be a valid IPv4 address.`;

        // Test if a path is valid
        if (req.test === 'path' && !testPath(testVal))
          return `The field "${value.name ?? key}" must be a valid path.`;

        // Test if the schema value is a string
        if (typeof data[key] !== 'string')
          return `The field "${value.name ?? key}" must be a string.`;
      }

      // Check if the schema value passes all checks
      if (value.checks)
        for (const check of value.checks) {
          const passedCheck = await check[0](key);
          if (!passedCheck) return `${check[1]}.`;
        }

      // Boolean validation
      if (value.type === 'boolean') {
        // Check if the schema value is a boolean
        if (typeof data[key] !== 'boolean')
          return `The field "${value.name ?? key}" must be a boolean.`;
      }

      // Object validation
      if (value.type === 'object') {
        // Check if the schema value is an object
        if (typeof data[key] !== 'object')
          return `The field "${value.name ?? key}" must be an object.`;
        // Check if the schema value has the correct properties
        if (value.properties && Object.keys(value.properties).length > 0) {
          const result = await this.validateBase<'properties'>(
            data[key] as Record<string, unknown>,
            value.properties as ISchema,
            true
          );
          if (result) return result;
        }
      }

      // Array validation
      if (value.type === 'array') {
        // Check if the schema value is an array
        if (!Array.isArray(data[key]))
          return `The field "${value.name ?? key}" must be an array.`;

        // Check if the schema value has the correct items
        if (value.items && typeof value.items === 'object') {
          for (const item of data[key] as unknown[]) {
            const result = await this.validateBase<'items'>(
              item as Record<string, unknown>,
              value.items as never,
              true
            );
            if (result) return result;
          }
        }
      }
    }

    return false;
  }

  /**
   * Run the validation function, and if the response object is provided, send a response if the validation fails.
   * @param data The object data to validate.
   * @returns A JSON response meaning it's invalid, or null if it's valid.
   */
  public async validate(data: Record<string, unknown>): Promise<null | string> {
    const result = await this.validateBase(data, this.schema);
    if (typeof result !== 'string') return null;
    return result;
  }

  /**
   * Export the schema as a JSON object.
   * @returns The exported schema as a JSON object.
   */
  public export(): ExportedSchema {
    const exportSchema: Record<string, ExportedValue<ExportedSchema>> = {};

    Object.entries(this.schema).forEach(([key, value]) => {
      const exportedValue = value.export() as ExportedValue<ExportedSchema>;
      exportSchema[key] = exportedValue;
    });

    return exportSchema;
  }
}
