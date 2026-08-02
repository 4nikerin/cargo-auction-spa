import { AllFiltersCheckbox } from './AllFiltersCheckbox';

interface AllFiltersMultiChoiceProps<Value extends string> {
  label: string;
  value: Value[];
  options: ReadonlyArray<{ value: Value; label: string }>;
  onChange: (value: Value[]) => void;
}

export const AllFiltersMultiChoice = <Value extends string>({
  label,
  value,
  options,
  onChange,
}: AllFiltersMultiChoiceProps<Value>) => {
  const toggle = (optionValue: Value, checked: boolean) => {
    const selectedValues = new Set(value);

    if (checked) selectedValues.add(optionValue);
    else selectedValues.delete(optionValue);

    onChange(
      options
        .filter((option) => selectedValues.has(option.value))
        .map((option) => option.value),
    );
  };

  return (
    <fieldset className="grid gap-2">
      <legend className="mb-2 text-sm font-medium">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <AllFiltersCheckbox
            key={option.value}
            label={option.label}
            checked={value.includes(option.value)}
            onChange={(checked) => toggle(option.value, checked)}
          />
        ))}
      </div>
    </fieldset>
  );
};
