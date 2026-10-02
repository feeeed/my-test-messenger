export function getApiCredentials() {
  const idInstance = localStorage.getItem('idInstance');
  const apiTokenInstance = localStorage.getItem('apiTokenInstance');

  if (!idInstance || !apiTokenInstance) {
    throw new Error('Отсутствуют учетные данные');
  }

  return { idInstance, apiTokenInstance };
}