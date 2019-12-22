const Sentry = require('@sentry/node');

let { SENTRY_ORGANIZATION, SENTRY_PROJECT, SENTRY_ENVIRONMENT } = process.env;

const dsn = `https://${SENTRY_ORGANIZATION}@sentry.io/${SENTRY_PROJECT}`;

console.log(`[Sentry] DSN ${dsn}`);
Sentry.init({
	dsn,
	environment: SENTRY_ENVIRONMENT || 'prod'
});

module.exports = Sentry;
