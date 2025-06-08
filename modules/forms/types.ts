export enum FormFieldType {
  Text = "Text",
  Select = "Select",
}

interface BaseFormField {
  title: string;
  type: FormFieldType;
  defaultValue?: unknown;
}

export interface TextFormField extends BaseFormField {
  type: FormFieldType.Text;
  defaultValue?: string;
}

export interface SelectFormFieldOption<V> {
  label: string;
  value: V;
}

export interface SelectFormField<
  V = unknown,
  O extends SelectFormFieldOption<V> = SelectFormFieldOption<V>,
> extends BaseFormField {
  type: FormFieldType.Select;
  options: O[];
  defaultValue?: V;
}

export type FormField = TextFormField | SelectFormField;

export type FormFields = Record<string, FormField>;

type FieldValueType<T extends FormField> = T extends TextFormField
  ? string
  : T extends SelectFormField<infer V>
    ? V
    : never;

export type FormValues<T extends FormFields> = {
  [K in keyof T]: FieldValueType<T[K]>;
};
