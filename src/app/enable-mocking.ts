export const enableMocking = async () => {
  if (import.meta.env.VITE_ENABLE_MSW !== 'true') {
    return;
  }

  // Отложенный импорт не загружает браузерный MSW при обычном запуске приложения.
  const { worker } = await import('@/shared/api/mocks/browser');

  await worker.start({
    onUnhandledRequest: 'error',
  });
};
