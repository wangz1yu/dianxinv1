interface AnalyticsEventPayload {
  [key: string]: string | number | boolean | null | undefined;
}

const STORAGE_KEY = 'dx_analytics_events';
const UTM_STORAGE_KEY = 'dx_utm_params';

export function captureAttribution() {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const utm = {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || '',
    landing_page: window.location.pathname,
    referrer: document.referrer || 'direct',
    captured_at: new Date().toISOString(),
  };

  if (Object.values(utm).some(Boolean)) {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
  }
}

export function getAttribution() {
  if (typeof window === 'undefined') return {};
  const raw = localStorage.getItem(UTM_STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function trackEvent(event: string, payload: AnalyticsEventPayload = {}) {
  if (typeof window === 'undefined') return;
  const eventRecord = {
    event,
    path: window.location.pathname,
    ts: new Date().toISOString(),
    ...getAttribution(),
    ...payload,
  };

  const raw = localStorage.getItem(STORAGE_KEY);
  const logs = raw ? JSON.parse(raw) : [];
  logs.push(eventRecord);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs.slice(-200)));

  // For future integration with analytics providers.
  if (import.meta.env.DEV) {
    console.log('[analytics]', eventRecord);
  }
}
