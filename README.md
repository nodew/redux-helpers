# redux-helpers

## Usage

```javascript
// module.js
import { createTypes, createAsyncAction, createAsyncReducer } from 'redux-helpers';

const types = createTypes(3)

const initState = {}

const reducer = createAsyncReducer(types, initState)

export const fetchData = createAsyncAction(types, (data) => {
  return fetch(someUrl, data)
});

---------------------------------------------------

import { fetchData } from './module'
dispatch(fetchData(...data))

```

