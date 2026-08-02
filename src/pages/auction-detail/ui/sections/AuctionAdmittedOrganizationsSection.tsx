import { Building2 } from 'lucide-react';

import type { AuctionDetail } from '@/entities/auction';

import { AuctionDetailField } from '../AuctionDetailField';
import { AuctionDetailSection } from '../AuctionDetailSection';

interface AuctionAdmittedOrganizationsSectionProps {
  detail: AuctionDetail;
}

export const AuctionAdmittedOrganizationsSection = ({
  detail,
}: AuctionAdmittedOrganizationsSectionProps) => {
  const organizations = detail.admitted_organizations;

  return (
    <AuctionDetailSection title="Допущенные организации" icon={<Building2 />}>
      {organizations.length ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {organizations.map((organization, index) => (
            <li
              key={
                organization.id ?? `${organization.inn ?? 'company'}-${index}`
              }
              className="rounded-xl border bg-muted/30 p-4"
            >
              <dl className="grid gap-4 sm:grid-cols-2">
                <AuctionDetailField
                  label="Организация"
                  value={
                    organization.name ?? organization.full_name ?? 'Не указана'
                  }
                />
                <AuctionDetailField
                  label="ИНН"
                  value={organization.inn ?? 'Не указан'}
                />
              </dl>
              {organization.is_main ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  Основная организация
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">
          Допущенные организации не указаны.
        </p>
      )}
    </AuctionDetailSection>
  );
};
