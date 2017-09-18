// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  Appear,
  CodePane as OriginalCodePane,
  Deck,
  Heading as OriginalHeading,
  ListItem as OriginalListItem,
  List as OriginalList,
  Link,
  Slide,
  Text,
  Image,
  Layout,
  Fit,
  Fill,
} from 'spectacle';

// Import image preloader util
import preloader from 'spectacle/lib/utils/preloader';
import CodeSlide from 'spectacle-code-slide';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

// Require CSS
require('normalize.css');
require('spectacle/lib/themes/default/index.css');

const images = {
  chooz: require('../assets/chooz.jpg'),
  tripica: require('../assets/tripica.jpg'),
  duck: require('../assets/duck.png'),
  tests: require('../assets/tests.png'),
  redux: require('../assets/redux.png'),
};

preloader(images);

const theme = createTheme(
  {
    primary: '#37474f',
    secondary: '#ffcc25',
    tertiary: '#2a7ffc',
    quartenary: '#ff2b2a',
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica',
  }
);

const List = props => (
  <div style={{ justifyContent: 'center', width: '100%', display: 'flex' }}>
    <OriginalList textColor="white" padding="5px 40px" {...props} />
  </div>
);

const SubList = props => <OriginalList textColor="white" padding="5px 40px" {...props} />;

const Heading = props => <OriginalHeading size={5} textColor="secondary" caps padding={'0 0 20px 0'} {...props} />;

const TableHeaderItem = props => <OriginalTableHeaderItem size={6} textColor="white" padding={20} {...props} />;
const ListItem = props => <OriginalListItem style={{ fontSize: 30 }} {...props} />;
const CodePane = props => <OriginalCodePane textSize={20} {...props} />;

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={['slide', 'fade']} transitionDuration={500} theme={theme} progress="bar" controls={false}>
        <Slide maxHeight={1024} bgColor="primary">
          <OriginalHeading size={1} fit textColor="secondary" lineHeight={1}>
            Retrospective et avenir
          </OriginalHeading>
          <Text margin="10px 0 0" textColor="tertiary" size={2} fit bold>
            de redux chez BAM
          </Text>
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>Les débuts de Redux et react-native</Heading>
          <Layout>
            <Fill>
              <Image src={images.chooz} width={300} />
            </Fill>
            <Fill>
              <Appear>
                <Image src={images.tripica} width={300} />
              </Appear>
            </Fill>
          </Layout>
        </Slide>

        <Slide maxHeight={1024} bgColor="secondary">
          <Image width={600} src={images.redux} />
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>Le Format d'une action</Heading>
          <CodePane
            lang="js"
            source={`
type Action = {|
  type: string,
  payload?: any,
  meta?: any,
  error?: boolean
|};
            `}
          />
          <Link href="https://github.com/acdlite/flux-standard-action" textColor="quartenary">
            https://github.com/acdlite/flux-standard-action
          </Link>
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>Reducer</Heading>
          <CodePane
            lang="js"
            source={`
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_LIST':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_LIST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        list: action.payload.widgets,
      };
    default:
      return state;
  }
}
            `}
          />
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>Reducer as hashmap</Heading>
          <CodePane
            lang="js"
            source={`
import { createReducer } from 'reduxsauce'

function getListReducer(state = initialState, action) {
  return { ...state, isLoading: true };
}

function getListSuccessReducer(state = initialState, action) {
  return {
    ...state,
    isLoading: false,
    list: action.payload.widgets,
  };
}
const reducer = createReducer(initialState, {
  GET_LIST: getListReducer,
  GET_LIST_SUCCESS: getListSuccessReducer,
});
            `}
          />
          <Link href="https://github.com/infinitered/reduxsauce" textColor="quartenary">
            https://github.com/infinitered/reduxsauce
          </Link>
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>Architecture</Heading>
          <List>
            <ListItem>
              src/
              <SubList>
                <ListItem>
                  components/
                  <SubList>
                    <ListItem>
                      common/
                      <SubList>
                        <ListItem textColor="gray">Picker.js</ListItem>
                      </SubList>
                    </ListItem>
                    <ListItem textColor="gray">
                      dashboard/
                      <SubList>
                        <ListItem textColor="gray">PhoneLinePicker.js</ListItem>
                      </SubList>
                    </ListItem>
                  </SubList>
                </ListItem>
                <ListItem>
                  actions/
                  <SubList>
                    <ListItem textColor="gray">PhoneLines.js</ListItem>
                  </SubList>
                </ListItem>
                <ListItem>
                  lib/
                  <SubList>
                    <ListItem>constants.js</ListItem>
                  </SubList>
                </ListItem>
                <ListItem>
                  reducers/
                  <SubList>
                    <ListItem textColor="gray">PhoneLines.js</ListItem>
                  </SubList>
                </ListItem>
                <ListItem>
                  scenes/
                  <SubList>
                    <ListItem textColor="gray">
                      Dashboard/
                      <SubList>
                        <ListItem textColor="gray">index.js</ListItem>
                      </SubList>
                    </ListItem>
                  </SubList>
                </ListItem>
              </SubList>
            </ListItem>
          </List>
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>Redux-ducks</Heading>
          <List>
            <ListItem>
              src/
              <SubList>
                <ListItem>
                  components/
                  <SubList>
                    <ListItem textColor="gray">Picker.js</ListItem>
                  </SubList>
                </ListItem>
                <ListItem>lib/</ListItem>
                <ListItem>
                  modules/
                  <SubList>
                    <ListItem textColor="gray">PhoneLines.js</ListItem>
                  </SubList>
                </ListItem>
                <ListItem>
                  scenes/
                  <SubList>
                    <ListItem textColor="gray">
                      Dashboard/
                      <SubList>
                        <ListItem textColor="gray">
                          components/
                          <SubList>
                            <ListItem textColor="gray">PhoneLinePicker.js</ListItem>
                          </SubList>
                        </ListItem>
                        <ListItem textColor="gray">index.js</ListItem>
                      </SubList>
                    </ListItem>
                  </SubList>
                </ListItem>
              </SubList>
            </ListItem>
          </List>
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>Redux-ducks specs</Heading>
          <Layout>
            <Fit>
              <Image src={images.duck} width={300} />
            </Fit>
            <Fill>
              <Text textColor="white" textAlign="left" textSize={30} padding={20}>
                MUST export default a function called reducer()<br />
                <br />
                MUST export its action creators as functions<br />
                <br />
                MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE<br />
                <br />
                MAY export its action types as UPPER_SNAKE_CASE, if an external reducer needs to listen for them, or if
                it is a published reusable library
              </Text>
            </Fill>
          </Layout>
        </Slide>

        <CodeSlide
          lang="js"
          code={require('raw-loader!../code/duck.js.example')}
          ranges={[
            { loc: [1, 3], note: 'Action types' },
            { loc: [4, 14], note: 'Reducer' },
            { loc: [15, 24], note: 'Action Creator' },
            { loc: [25, 40], note: 'Side Effects' },
          ]}
        />

        <Slide maxHeight={1024}>
          <Heading>Les sélecteurs</Heading>
          <CodePane
            lang="js"
            source={`
export const widgetSelector = (state) => state.widgets.list;
            `}
          />
          <List>
            <ListItem>Avantage : Facilite le refactoring</ListItem>
            <ListItem>incovénient : Dépend de la forme du reducer principal</ListItem>
          </List>
          <CodePane
            lang="js"
            source={`
export const REDUCER_NAME = 'widgets';
export const widgetSelector = (state) => state[REDUCER_NAME].list;
            `}
          />
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>Les tests</Heading>
          <Layout>
            <Fit>
              <Image src={images.tests} width={300} />
            </Fit>
            <Fill>
              <Heading size={7} textColor="tertiary">
                Tests unitaires
              </Heading>
              <Text textSize={30} textColor="secondary">
                Test L'API du module
              </Text>
              <List>
                <ListItem>Aider au développement</ListItem>
                <ListItem>Améliorer l'architecture</ListItem>
                <ListItem>Documentation</ListItem>
                <ListItem>Éviter quelques régressions</ListItem>
              </List>
              <Heading size={7} textColor="tertiary">
                Tests d'intégrations
              </Heading>
              <Text textSize={30} textColor="secondary">
                Test plusieurs modules ensembles
              </Text>
              <List>
                <ListItem>Éviter les régressions</ListItem>
                <ListItem>Documentation</ListItem>
              </List>
            </Fill>
          </Layout>
        </Slide>

        <CodeSlide
          lang="js"
          code={require('raw-loader!../code/dummyTests.js.example')}
          ranges={[
            { loc: [3, 15], note: 'Actions' },
            { loc: [16, 25], note: 'Reducer' },
            { loc: [26, 40], note: 'Selecteur' },
          ]}
        />

        <Slide maxHeight={1024}>
          <Heading>Les tests</Heading>
          <Layout>
            <Fit>
              <Image src={images.tests} width={300} />
            </Fit>
            <Fill>
              <Heading size={7} textColor="tertiary">
                Tests unitaires
              </Heading>
              <Text textSize={30} textColor="secondary">
                Test L'API du module
              </Text>
              <List>
                <ListItem>Aider au développement</ListItem>
                <ListItem>Améliorer l'architecture</ListItem>
                <ListItem>Documentation</ListItem>
                <ListItem>Éviter quelques régressions</ListItem>
              </List>
              <Heading size={7} textColor="tertiary">
                Tests d'intégrations
              </Heading>
              <Text textSize={30} textColor="secondary">
                Test plusieurs modules ensembles
              </Text>
              <List>
                <ListItem>Éviter les régressions</ListItem>
                <ListItem>Documentation</ListItem>
              </List>
            </Fill>
          </Layout>
        </Slide>

        <CodeSlide lang="js" code={require('raw-loader!../code/inteTests.js.example')} ranges={[{ loc: [0, 20] }]} />

        <CodeSlide
          lang="js"
          code={require('raw-loader!../code/unitTests.js.example')}
          ranges={[
            { loc: [1, 7], note: 'Init' },
            { loc: [8, 15], note: 'Actions' },
            { loc: [16, 20], note: 'Reducer' },
            { loc: [21, 32], note: 'Selecteur' },
          ]}
        />

        <Slide maxHeight={1024}>
          <Heading>Les Sagas</Heading>

          <Text textColor="tertiary">Gère les sides effects et l'asynchrone</Text>
        </Slide>

        <CodeSlide
          lang="js"
          code={require('raw-loader!../code/saga.js.example')}
          ranges={[{ loc: [35, 55] }, { loc: [27, 35] }]}
        />

        <Slide maxHeight={1024}>
          <Heading>Les tests de sagas</Heading>
          <Layout>
            <Fit>
              <Image src={images.tests} width={300} />
            </Fit>
            <Fill>
              <Heading size={7} textColor="tertiary">
                Tests unitaires
              </Heading>
              <Text textSize={30} textColor="secondary">
                Test L'API du module
              </Text>
              <List>
                <ListItem>Aider au développement</ListItem>
                <ListItem>Améliorer l'architecture</ListItem>
                <ListItem>Documentation</ListItem>
                <ListItem>Éviter quelques régressions</ListItem>
              </List>
              <Heading size={7} textColor="tertiary">
                Tests d'intégrations
              </Heading>
              <Text textSize={30} textColor="secondary">
                Test plusieurs modules ensembles
              </Text>
              <List>
                <ListItem>Éviter les régressions</ListItem>
                <ListItem>Documentation</ListItem>
              </List>
            </Fill>
          </Layout>
        </Slide>

        <CodeSlide
          lang="js"
          code={require('raw-loader!../code/dummyTestSaga.js.example')}
          ranges={[{ loc: [0, 14] }, { loc: [14, 40] }, { loc: [41, 80] }, { loc: [81, 130] }]}
        />

        <CodeSlide
          lang="js"
          code={require('raw-loader!../code/sagaTestPlan.js.example')}
          ranges={[
            { loc: [0, 2], note: 'https://github.com/jfairbank/redux-saga-test-plan' },
            { loc: [2, 6], note: 'Init' },
            { loc: [7, 17], note: 'Test' },
            { loc: [32, 53] },
            { loc: [54, 67] },
          ]}
        />

        <CodeSlide
          lang="js"
          code={require('raw-loader!../code/sagaTestPlanInte.js.example')}
          ranges={[
            { loc: [2, 7], note: 'Init' },
            { loc: [7, 9], note: 'On fournit un reducer' },
            { loc: [10, 11], note: 'On mock les calls' },
            { loc: [12, 17], note: 'On check le résultat' },
          ]}
        />

        <Slide maxHeight={1024}>
          <Heading>Typage flow</Heading>
          <Text textColor="tertiary">Flow est un static type checker</Text>
          <Text textColor="white">Il n'exécute pas le code</Text>
        </Slide>

        <CodeSlide
          lang="js"
          code={require('raw-loader!../code/flow.js.example')}
          ranges={[
            { loc: [5, 9], note: 'Notre entité' },
            { loc: [10, 14], note: 'Le state' },
            { loc: [55, 59], note: "Qu'on utilise dans le reducer" },
            { loc: [82, 84], note: 'Mais pas dans le selecteur' },
            { loc: [2, 5], note: 'Le global State' },
            { loc: [15, 20], note: 'Le global State' },
            { loc: [20, 22], note: "Plus d'action type" },
            { loc: [47, 55], note: 'Mais des strings' },
            { loc: [22, 38], note: 'Et un typage fort' },
            { loc: [65, 72], note: 'Qui permet le Type Refinement' },
            { loc: [94, 97], note: 'Attention ici !' },
          ]}
        />

        <Slide maxHeight={1024}>
          <Heading>Normalisation</Heading>
          <CodePane
            lang="js"
            source={`
  {
    widgets: {
      mainList: [8, 3, 12],
      currentWidget: 8,
      entities: {
        3: { id: 3, name: 'Widget 1' },
        8: { id: 8, name: 'Widget 2' },
        12: { id: 12, name: 'Widget 12' },
      }
    },
  }
            `}
          />
        </Slide>

        <CodeSlide
          lang="js"
          code={require('raw-loader!../code/normalization.js.example')}
          ranges={[
            { loc: [3, 4], note: 'On import normalizr' },
            { loc: [125, 128], note: "Qu'on utilise dans la saga" },
            { loc: [117, 120], note: 'Le shema' },
            { loc: [53, 61], note: 'Le typage du résultat' },
            { loc: [29, 42], note: "Le typage de l'action" },
            { loc: [62, 73], note: "L'action" },
            { loc: [89, 95], note: 'Le reducer' },
            { loc: [105, 115], note: 'Les sélecteurs' },
          ]}
        />

        <Slide maxHeight={1024}>
          <Heading>Il faut voir le state comme une base de donnée</Heading>
          <Text textColor="white">Les sélecteurs vont se complexifier</Text>
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>Ramda - Le lowdash de la programmation fonctionnelle</Heading>
          <CodePane
            lang="js"
            source={`
R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7

const add = R.curry((a, b) => a + b);
add(1)(5) // 6
add(2, 3) // 5

R.map(widget => widget.name, widgets);

let count = 0;
const factorial = R.memoize(n => {
  count += 1;
  return R.product(R.range(1, n + 1));
});
factorial(5); //=> 120
factorial(5); //=> 120
factorial(5); //=> 120
count; //=> 1
            `}
          />
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>Notre sélecteur</Heading>
          <CodePane
            lang="js"
            source={`
  // prettier-ignore
  const widgetsByIdsSelector = (state, ids) => R.compose(
    R.filter((entity: ?E): boolean => !!entity),
    R.map(id => widgetByIdSelector(state, id)),
    R.values
  )(ids);
            `}
          />
        </Slide>

        <CodeSlide
          lang="js"
          code={require('raw-loader!../code/search.js.example')}
          ranges={[
            { loc: [1, 160], title: 'Ultra fast search' },
            { loc: [45, 65], note: 'Actions' },
            { loc: [10, 21], note: 'State' },
            { loc: [145, 152], note: 'Sélecteur' },
            { loc: [134, 145], note: 'Recherche locale' },
            { loc: [152, 160], note: 'Fast search' },
          ]}
        />

        <Slide maxHeight={1024}>
          <Heading>Reselect</Heading>
          <CodePane
            lang="js"
            source={`
export const searchResultSelector = createSelector{
  [apiSearchResultSelector, localSearchSelector],
  (apiSearchRedults, localSearchResults) => (
    apiSearchRedults && localSearchResults
  ),
);

const getVisibleTodos = createSelector(
  [ getVisibilityFilter, getTodos ],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case 'SHOW_COMPLETED':
        return todos.filter(todo => todo.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(todo => !todo.completed)
      default:
        return todos
    }
  }
)
            `}
          />
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>immutable.js</Heading>
          <CodePane
            lang="js"
            source={`
var map1 = Immutable.Map({a:1, b:2, c:3});
var map2 = map1.set('b', 50);
map1.get('b'); // 2
map2.get('b'); // 50

var nested = Immutable.fromJS({a:{b:{c:[3,4,5]}}});
var nested2 = nested.mergeDeep({a:{b:{d:6}}});

nested2.getIn(['a', 'b', 'd']); // 6
var neasted3 = nested2.setIn(['a', 'b', 'd'], 8);

// instead of
var neasted3 = {
  ...nested2,
  a: {
    ...nested2.a,
    b: {
      ...nested2.a.b,
      d: 8,
    },
  },
};
            `}
          />
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>seamless-immutable</Heading>
          <CodePane
            lang="js"
            source={`
var array = Immutable(["totally", "immutable", {
  hammer: "Can’t Touch This"
}]);

array[1] = "I'm going to mutate you!"
array[1] // "immutable"

array[2].hammer = "hm, surely I can mutate this nested object..."
array[2].hammer // "Can’t Touch This"

array.sort(); // throw error
var array2 = Immutable.setIn(array, [2, 'hammer'], "Norwegian Ridgeback");
            `}
          />
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>Hey les gars, pourquoi on ne met jamais rien</Heading>
          <CodePane
            lang="js"
            source={`
export default function reducer(state: State = {}, action: Action): State {
  // <----------- ICI
  switch (action.type) {
    case 'GET_LIST':
      return { ...state, isLoading: true };
    case 'GET_LIST_SUCCESS':
      return {
        ...state,
        mainList: action.payload,
        entities: action.meta.entities.widgets,
      };
    // ...
    default:
      // <-------------- ET ICI !
      return state;
  }
}
            `}
          />
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>Par exemple</Heading>
          <CodePane
            lang="js"
            source={`
export default function reducer(oldState: State = {}, action: Action): State {
  let state = oldState;
  const entities = R.path(['meta', 'entities', 'widget'], action);
  if (entities) {
    state =  R.mergeDeepRight(state, { entities });
  }

  switch (action.type) { /* ... */ }
}

// modules/pane.js
const panes = [
  { id: 1, widgets: [{ id: 1, name: 'widget 2' }, { id: 5, name: '' }] },
  { id: 2, widgets: [{ id: 9, name: 'widget 9' }] },
];

const paneSchema = new schema.Values( new schema.Entity('pane', {
  widgets: new schema.Values(new schema.Entity('widget', {}));
}));
const normalizedRes = normalize(customers, customerSchema);
yield put(fetchPanesSuccess(normalizedRes));
            `}
          />
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>Loading Reducer</Heading>
          <CodePane
            lang="js"
            source={`
export default function reducer(state: State = {}, action: Action): State {
  const addLoader = R.path(['meta', 'addLoader'], action);
  if (addLoader) {
    return {
      ...state,
      [addLoader]: true,
    };
  }

  // idem with removeLoader

  return state;
}

const isLoadingSelector = (state, name) => state.loader[name];


export function getList(): Action {
  return {
    type: 'GET_WIDGET_LIST'
    meta: { addLoader: 'widget_list' },
  };
}

            `}
          />
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>Revenons sur notre module</Heading>
          <CodePane
            lang="js"
            source={`
  {
    widgets: {
      isLoading:false,
      mainList: [8, 3, 12],
      currentWidget: 8,
      editWidget: {
        modalOpen: false,
        serverErrors: {
          name: 'Too short',
        },
      },
      newWidget: {
        name: 'New widg',
        pos: 3,
      },
      entities: {
        3: { id: 3, name: 'Widget 1' },
        8: { id: 8, name: 'Widget 2' },
        12: { id: 12, name: 'Widget 12' },
      },
    },
  }
            `}
          />
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>Et les sagas</Heading>
          <CodePane
            lang="js"
            source={`
function *getListSaga() {
  try {
    const widgets = yield call(get, '/widget');
    yield put(getListSuccess(widgets));

    yield put(NavigationAction.navigate({ routeName: 'nextPage' });
  } catch(error) {
    yield put(getListFailure(error));
    yield put(openFailureModale());
  }
}
            `}
          />
        </Slide>

        <Slide maxHeight={1024} maxWidth={1400}>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, padding: 5 }}>
              <Text textSize={40} textColor="tertiary">
                modules/model/widgets.js
              </Text>
              <CodePane
                lang="js"
                source={`
  {
    widgetsModel: {
      entities: {
        3: { id: 3, name: 'Widget 1' },
        8: { id; 8, name: 'Widget 2' },
        12: { id; 12, name: 'Widget 12' },
      },
      unsaved: {
        8: { id: 8, name: 'Widget 8' },
      },
      creating: {
        'tempID1': { id: 'tempID1' },
      },
      meta: {
        3: {
          lastUpdate: 123412341,
          status: 'fetched',
          errors: [],
        },
      },
    },
  }
            `}
              />
            </div>
            <div style={{ flex: 1, padding: 5 }}>
              <Text textSize={40} textColor="tertiary">
                modules/editWidget.js
              </Text>
              <CodePane
                lang="js"
                source={`
  {
    editWidget: {
        widget: 8,
        modalOpen: false,
        isLoading: false,
    },
  }
            `}
              />
            </div>
          </div>
        </Slide>

        <Slide maxHeight={1024} maxWidth={1400}>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, padding: 5 }}>
              <CodePane
                lang="js"
                source={`
function *getListSaga() { // modules/model/widgets.js
  try {
    const widgets = yield call(get, '/widget');
    yield put(getListSuccess(widgets));
  } catch(error) {
    yield put(getListFailure(error));
  }
}

function *confirmPressSaga() { // modules/myPage.js
  yield put(getList());
  const finished = yield race({
    success: take('FETCH_LIST_SUCCESS'),
    error: take('FETCH_LIST_ERROR'),
  });
  if (finished.error) {
    yield put(openFailureModale());
    return;
  }
  yield put(NavigationAction.navigate({
    routeName: 'nextPage'
  });
}
            `}
              />
            </div>
            <div style={{ flex: 1, padding: 5 }}>
              <CodePane
                lang="js"
                source={`
function *getListSaga() { // modules/model/widgets.js
  yield put(startFetchList());
  try {
    const widgets = yield call(get, '/widget');
    yield put(getListSuccess(widgets));
    return null;
  } catch(error) {
    yield put(getListFailure(error));
    return error;
  }
}

function *confirmPressSaga() { // modules/myPage.js
  const error = yield call(getListSaga);
  if (error) {
    yield put(openFailureModale());
  }
  yield put(NavigationAction.navigate({
    routeName: 'nextPage'
  });
}
            `}
              />
            </div>
          </div>
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>Du coup, pourquoi ne pas passer de ça :</Heading>
          <List>
            <ListItem>
              src/
              <SubList>
                <ListItem textColor="gray">
                  components/
                  <SubList>
                    <ListItem textColor="gray">Picker.js</ListItem>
                  </SubList>
                </ListItem>
                <ListItem textColor="gray">lib/</ListItem>
                <ListItem>
                  modules/
                  <SubList>
                    <ListItem textColor="gray">
                      Model/
                      <SubList>
                        <ListItem textColor="gray">PhoneLines.js</ListItem>
                      </SubList>
                    </ListItem>
                    <ListItem>Dashboard.js</ListItem>
                  </SubList>
                </ListItem>
                <ListItem>
                  scenes/
                  <SubList>
                    <ListItem>
                      Dashboard/
                      <SubList>
                        <ListItem>
                          components/
                          <SubList>
                            <ListItem textColor="gray">PhoneLinePicker.js</ListItem>
                          </SubList>
                        </ListItem>
                        <ListItem>index.js</ListItem>
                      </SubList>
                    </ListItem>
                  </SubList>
                </ListItem>
              </SubList>
            </ListItem>
          </List>
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>à ça :</Heading>
          <List>
            <ListItem>
              src/
              <SubList>
                <ListItem textColor="gray">
                  components/
                  <SubList>
                    <ListItem textColor="gray">Picker.js</ListItem>
                  </SubList>
                </ListItem>
                <ListItem textColor="gray">lib/</ListItem>
                <ListItem>
                  modules/
                  <SubList>
                    <ListItem textColor="gray">
                      Model/
                      <SubList>
                        <ListItem textColor="gray">PhoneLines.js</ListItem>
                      </SubList>
                    </ListItem>
                    <ListItem>
                      Dashboard/
                      <SubList>
                        <ListItem>store.js</ListItem>
                        <ListItem>
                          components/
                          <SubList>
                            <ListItem textColor="gray">PhoneLinePicker.js</ListItem>
                          </SubList>
                        </ListItem>
                        <ListItem>index.js</ListItem>
                      </SubList>
                    </ListItem>
                  </SubList>
                </ListItem>
              </SubList>
            </ListItem>
          </List>
        </Slide>

        <Slide maxHeight={1024}>
          <Heading>redux-model-crud</Heading>
        </Slide>
      </Deck>
    );
  }
}
