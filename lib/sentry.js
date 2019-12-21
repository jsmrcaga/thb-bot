const Sentry = require('@sentry/node');

let { SENTRY_ORGANIZATION, SENTRY_PROJECT, SENTRY_ENVIRONMENT } = process.env;


Sentry.init({
	dsn: `https://${SENTRY_ORGANIZATION}@sentry.io/${SENTRY_PROJECT}`,
	environment: SENTRY_ENVIRONMENT || 'prod',

});

module.exports = Sentry;
