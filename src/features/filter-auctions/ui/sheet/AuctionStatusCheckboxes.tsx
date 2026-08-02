import { auctionStatusOptions } from '../../model/auction-filters';
import { AllFiltersCheckbox } from './AllFiltersCheckbox';

interface AuctionStatusCheckboxesProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export const AuctionStatusCheckboxes = ({
  value,
  onChange,
}: AuctionStatusCheckboxesProps) => {
  const selected = new Set(value);

  const toggle = (status: number, checked: boolean) => {
    if (checked) selected.add(status);
    else selected.delete(status);

    onChange([...selected].sort((left, right) => left - right));
  };

  return (
    <fieldset className="grid gap-2">
      <legend className="mb-2 text-sm font-medium">Статус аукциона</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {auctionStatusOptions.map((option) => (
          <AllFiltersCheckbox
            key={option.value}
            label={option.label}
            checked={selected.has(option.value)}
            onChange={(checked) => toggle(option.value, checked)}
          />
        ))}
      </div>
    </fieldset>
  );
};
