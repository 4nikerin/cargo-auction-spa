import { Input } from '@/shared/ui/input';

interface AllFiltersRangeProps {
  label: string;
  from: string;
  to: string;
  type?: 'number' | 'datetime-local';
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}

export const AllFiltersRange = ({
  label,
  from,
  to,
  type = 'number',
  onFromChange,
  onToChange,
}: AllFiltersRangeProps) => {
  return (
    <fieldset className="grid gap-2">
      <legend className="text-sm font-medium">{label}</legend>
      <div className="grid grid-cols-2 gap-3">
        <Input
          type={type}
          value={from}
          min={type === 'number' ? 0 : undefined}
          placeholder="От"
          aria-label={`${label}: от`}
          onChange={(event) => onFromChange(event.target.value)}
        />
        <Input
          type={type}
          value={to}
          min={type === 'number' ? 0 : undefined}
          placeholder="До"
          aria-label={`${label}: до`}
          onChange={(event) => onToChange(event.target.value)}
        />
      </div>
    </fieldset>
  );
};
