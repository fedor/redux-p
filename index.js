'use strict'
export default function(store) {
	return function(next) {
		return function(action) {
			if (
				!action.payload ||
				typeof action.payload !== 'object' ||
				typeof action.payload.then !== 'function'
			) {
				// not a Promise
				return next(action)
			}
			
			// Promise received
			next({ type: action.type + '_PENDING' })

			action.payload
				.then(function(result) {
					// Promise resolved
					store.dispatch({ type: action.type + '_FULFILLED', payload: result })
				})
				.catch(function(error) {
					// Promise rejected
					store.dispatch({ type: action.type + '_REJECTED', payload: error, error: true })
				})
		}
	}
}