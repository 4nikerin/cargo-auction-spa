import { HttpResponse, http } from 'msw';

import type { components } from '@/shared/api/generated/schema';

import {
  getMockAuction,
  getMockBets,
  listMockAuctions,
  setMockBet,
} from './store';

type AuctionListRequest = components['schemas']['AuctionListRequest'];
type SetBetRequest = components['schemas']['SetBetRequest'];
type ValidationError = components['schemas']['ValidationError'];
type ValidationProblem = components['schemas']['ValidationProblem'];

const apiUrl = import.meta.env.VITE_API_URL.replace(/\/$/, '');

/** Формирует типизированную ошибку для запросов к отсутствующему аукциону. */
function notFoundResponse() {
  return HttpResponse.json(
    {
      code: 'resource_not_found',
      title: 'Не найдено',
      message: 'Аукцион не найден.',
    },
    { status: 404 },
  );
}

/** Формирует единый ответ 422 с ошибками конкретных полей запроса. */
function validationResponse(errors: ValidationError[]) {
  const problem = {
    code: 'validation_failed',
    title: 'Ошибка валидации',
    message: 'Запрос содержит некорректные данные.',
    errors,
  } satisfies ValidationProblem;

  return HttpResponse.json(problem, { status: 422 });
}

/** Реализация HTTP-эндпоинтов OpenAPI для MSW. */
export const handlers = [
  // Читает фильтры из POST body и возвращает отфильтрованную страницу аукционов.
  http.post(`${apiUrl}/auctions/list`, async ({ request }) => {
    try {
      const body = (await request.json()) as AuctionListRequest;

      return HttpResponse.json(listMockAuctions(body));
    } catch {
      return validationResponse([
        {
          field: 'body',
          message: 'Тело запроса должно содержать корректный JSON.',
          code: 'invalid_json',
        },
      ]);
    }
  }),

  // Возвращает детальные данные либо контрактный ответ 404.
  http.get(`${apiUrl}/auctions/:auctionUuid`, ({ params }) => {
    const auction = getMockAuction(String(params.auctionUuid));

    return auction ? HttpResponse.json(auction) : notFoundResponse();
  }),

  // Преобразует query-параметр API `all` во внутренний флаг `showAll`.
  http.get(`${apiUrl}/auctions/:auctionUuid/bets`, ({ params, request }) => {
    const auctionUuid = String(params.auctionUuid);

    if (!getMockAuction(auctionUuid)) {
      return notFoundResponse();
    }

    const showAll = new URL(request.url).searchParams.get('all') === 'true';

    return HttpResponse.json(getMockBets(auctionUuid, showAll));
  }),

  // Валидирует body и делегирует изменение моковых данных store.
  http.post(
    `${apiUrl}/auctions/:auctionUuid/bets`,
    async ({ params, request }) => {
      let body: SetBetRequest;

      try {
        body = (await request.json()) as SetBetRequest;
      } catch {
        return validationResponse([
          {
            field: 'price',
            message: 'Поле price обязательно.',
            code: 'required',
          },
        ]);
      }

      const result = setMockBet(String(params.auctionUuid), body);

      if (result.status === 'not-found') {
        return notFoundResponse();
      }

      if (result.status === 'validation-error') {
        return validationResponse(result.errors);
      }

      return new HttpResponse(null, { status: 200 });
    },
  ),
];
