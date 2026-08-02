interface AllFiltersCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const AllFiltersCheckbox = ({
  label,
  checked,
  onChange,
}: AllFiltersCheckboxProps) => {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm font-medium">
      <input
        className="size-4 accent-primary"
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      {label}
    </label>
  );
};
