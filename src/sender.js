const eip = require('eip');
const processes = require('./processes');

(async () => {
	// route
	const route = new eip.Route('default', { route: { retryLimit: 5, retryDelay: 10000 }, isErrorRoute: false }, []);

	// processes / filters
	await route.process(processes.loadPersons);
	await route.process(processes.getGender);
	await route.process(processes.loadMailTemplate);
	await route.process(processes.handleQueue);

	// event injection
	await route.inject();
})();
