import { Building2, Mail, Phone, UserRound } from 'lucide-react';

import type { AuctionDetail } from '@/entities/auction';

import { AuctionDetailField } from '../AuctionDetailField';
import { AuctionDetailSection } from '../AuctionDetailSection';

interface AuctionOrganizerSectionProps {
  detail: AuctionDetail;
}

export const AuctionOrganizerSection = ({
  detail: { contacts, organizer },
}: AuctionOrganizerSectionProps) => {
  return (
    <AuctionDetailSection title="Организатор" icon={<Building2 />}>
      <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AuctionDetailField
          label="Организация"
          value={organizer.organization_name ?? 'Не указана'}
        />
        <AuctionDetailField
          label="ИНН"
          value={organizer.organization_inn ?? 'Не указан'}
        />
        <AuctionDetailField
          label="КПП"
          value={organizer.organization_kpp ?? 'Не указан'}
        />
      </dl>

      <div className="mt-6 border-t pt-6">
        <h3 className="font-medium">Контакты</h3>

        {contacts.length ? (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {contacts.map((contact, index) => (
              <div
                key={contact.uid ?? `${contact.email ?? 'contact'}-${index}`}
                className="rounded-xl border bg-muted/30 p-4"
              >
                <p className="flex items-center gap-2 font-medium">
                  <UserRound className="size-4 text-muted-foreground" />
                  {contact.name ?? 'Контактное лицо'}
                </p>
                {contact.phone || contact.work_phone ? (
                  <p className="mt-2 flex items-center gap-2 text-sm">
                    <Phone className="size-4 text-muted-foreground" />
                    {contact.phone ?? contact.work_phone}
                  </p>
                ) : null}
                {contact.email ? (
                  <p className="mt-2 flex items-center gap-2 text-sm">
                    <Mail className="size-4 text-muted-foreground" />
                    {contact.email}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            Контакты не указаны.
          </p>
        )}
      </div>
    </AuctionDetailSection>
  );
};
