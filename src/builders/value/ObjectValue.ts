import BaseValue, { BaseValueOptions } from '@builders/base/BaseValue';
import { IObjectValue } from '@typings/schema';

export type ObjectValueOptions<T> = BaseValueOptions & {
  properties: T;
};

/**
 * The ObjectValue class, used to create object values.
 */
export default class ObjectValue<T>
  extends BaseValue
  implements IObjectValue<T>
{
  public type = 'object' as const;
  public properties: T;

  /**
   * Creates an instance of the ObjectValue class.
   * @param options The options for the ObjectValue class.
   */
  public constructor(options: ObjectValueOptions<T>) {
    super(options);
    this.properties = options.properties;
  }

  /**
   * Exports the ObjectValue class properties.
   * @returns The ObjectValue class properties.
   */
  public export(): unknown {
    return {
      type: this.type,
      name: this.name,
      description: this.description,
      required: this.required,
      structure: this.structure,
    };
  }
}
