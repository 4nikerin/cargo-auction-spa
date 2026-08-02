import { auctionTypeOptions } from '@/entities/auction';
import { Input } from '@/shared/ui/input';

import { auctionFilterStatusOptions } from '../../model/auction-filters';
import { AllFiltersCheckbox } from './AllFiltersCheckbox';
import { AllFiltersField } from './AllFiltersField';
import { AllFiltersMultiChoice } from './AllFiltersMultiChoice';
import { AuctionStatusCheckboxes } from './AuctionStatusCheckboxes';
import type { AllFiltersSectionProps } from './types';

export const BasicFiltersSection = ({
  draft,
  setField,
}: AllFiltersSectionProps) => {
  return (
    <section className="grid gap-4" aria-labelledby="basic-filters-title">
      <h3 id="basic-filters-title" className="text-lg font-semibold">
        Основное
      </h3>

      <AllFiltersField label="Номер груза">
        <Input
          value={draft.cargo}
          placeholder="AU-10482"
          onChange={(event) => setField('cargo', event.target.value)}
        />
      </AllFiltersField>
      <AllFiltersField label="Заказчик: название или ИНН">
        <Input
          value={draft.customer}
          placeholder="ООО «ФростЛайн» или 7701234567"
          onChange={(event) => setField('customer', event.target.value)}
        />
      </AllFiltersField>
      <AllFiltersField label="Перевозчик">
        <Input
          value={draft.contractor}
          placeholder="ООО «ТрансЛогистик»"
          onChange={(event) => setField('contractor', event.target.value)}
        />
      </AllFiltersField>
      <AllFiltersMultiChoice
        label="Ваш статус"
        value={draft.status}
        options={auctionFilterStatusOptions}
        onChange={(value) => setField('status', value)}
      />
      <AllFiltersMultiChoice
        label="Тип аукциона"
        value={draft.type}
        options={auctionTypeOptions}
        onChange={(value) => setField('type', value)}
      />
      <AuctionStatusCheckboxes
        value={draft.auctionStatuses}
        onChange={(value) => setField('auctionStatuses', value)}
      />

      <div className="grid gap-2">
        <AllFiltersCheckbox
          label="Можно сделать ставку"
          checked={draft.available}
          onChange={(checked) => setField('available', checked)}
        />
        <AllFiltersCheckbox
          label="Только избранные"
          checked={draft.favorite}
          onChange={(checked) => setField('favorite', checked)}
        />
        <AllFiltersCheckbox
          label="Я участвовал"
          checked={draft.participated}
          onChange={(checked) => setField('participated', checked)}
        />
      </div>
    </section>
  );
};
