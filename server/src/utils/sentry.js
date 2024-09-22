const Sentry = require('@sentry/node');

// Ініціалізація Sentry
Sentry.init({
    dsn: "https://c45344120fe5d69ab6e5ce5c43808a73@o4507995552874496.ingest.de.sentry.io/4507995590557776", // Замініть на ваш Sentry DSN
    tracesSampleRate: 1.0, // Встановіть рівень вибірки трасування
});

module.exports = Sentry;
