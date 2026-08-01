export async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MSW !== 'true') {
    return;
  }

  const { worker } = await import('@/shared/api/mocks/browser');

  await worker.start({
    onUnhandledRequest: 'error',
  });
}
