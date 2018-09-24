import { createStore } from 'redux'
import mainApp from 'stores/reducers'
const store = createStore(mainApp);

export default store;
