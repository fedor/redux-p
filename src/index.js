'use strict'
module.exports = (store) => (next) => (action) => {
	if (
		!action.payload ||
		typeof action.payload !== 'object' ||
		typeof action.payload.then !== 'function'
	) {
		// not a Promise
		return next(action)
	}

	// Promise received
	next({ type: `${action.type}_PENDING` })

	action.payload
		.then(payload => store.dispatch({ type: `${action.type}_FULFILLED`, payload }))
		.catch(payload => store.dispatch({ type: `${action.type}_REJECTED`, payload, error: true }))
}