const Sentry = require('@sentry/node');

// Ініціалізація Sentry
Sentry.init({
    dsn: 'https://<YOUR_SENTRY_DSN>', // Замініть на ваш Sentry DSN
    tracesSampleRate: 1.0, // Встановіть рівень вибірки трасування
});

module.exports = Sentry;
