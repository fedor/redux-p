**redux-p** redux middleware accepts action type in `action.type` and Promise in `action.payload`.  
- Dispatches action with `action.type + '_PENDING'` type as Promise is received
- ... `action.type + '_FULFILLED'` type as Promise is resolved (result set to `action.payload`)
- ... `action.type + '_REJECTED'` type as Promise is rejected (error set to `action.payload`)

**redux-p** was made to replace [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware) basic interface for react-native, since redux-promise-middleware throws an error on Promise reject (this complicates development and requires [special handling](https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/guides/rejected-promises.md) for react-native code).  

## Install
```
npm install redux-p --save
```

## Use
```js
import { applyMiddleware, createStore } from 'redux'
import promise from 'redux-p'

const middleware = applyMiddleware(promise)

const store = createStore(
	(state={}, action) => {
		switch (action.type) {
			case 'GITHUB_STATUS_PENDING':
				console.log('Pending')
				return { pending: true }

			case 'GITHUB_STATUS_FULFILLED':
				console.log('GitHub Status:', action.payload)
				return { pending: false, error: false, payload: action.payload }

			case 'GITHUB_STATUS_REJECTED':
				console.error('Error:', action.payload)
				return { pending: false, error: true, payload: action.payload }

			default:
				return state
		}
	},
	middleware
)

store.dispatch({
	type: 'GITHUB_STATUS',
	payload: fetch('https://github.com/status')
})
```