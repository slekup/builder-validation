export interface ExportedValue<T> {
  type: string;
  min?: number;
  max?: number;
  options?: string[];
  test?: string;
  items?: T;
  properties?: T;
}

export type ExportedSchema = Record<string, ExportedValue<ExportedSchema>>;
