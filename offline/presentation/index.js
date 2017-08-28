// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Heading as OriginalHeading,
  ListItem,
  List as OriginalList,
  Link,
  Quote,
  Slide,
  Text,
  Image,
  Layout,
  Fit,
  Fill,
  S,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableItem,
  TableHeaderItem as OriginalTableHeaderItem,
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
  castle: require('../assets/castle.jpg'),
  car: require('../assets/car.jpg'),
  noloader: require('../assets/noloader.gif'),
  withloader: require('../assets/withloader.gif'),
  waiting: require('../assets/waiting.jpg'),
  tooMuchLoader: require('../assets/tooMuchLoader.gif'),

  emptyState: require('../assets/empty-state.png'),
  expectedState: require('../assets/expected-state.png'),
  loadingState: require('../assets/loading-state.png'),

  reduxPersist: require('../assets/redux-persist.svg'),

  spinnerUi: require('../assets/spinner-ui.png'),
  failureSuccess: require('../assets/failure-success-man.png'),
  optimisticUi: require('../assets/optimistic-ui.png'),

  cat: require('../assets/cat.jpg'),
  error: require('../assets/error.jpg'),

  offline: require('../assets/ready-offline.jpg'),

  result: require('../assets/result.gif'),
  waitResponse: require('../assets/wait-response.gif'),
  waitResponseOffline: require('../assets/wait-response-offline.gif'),
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
    <OriginalList {...props} />
  </div>
);

const Heading = props => (
  <OriginalHeading size={4} textColor="secondary" caps padding={'20px 0'} {...props} />
);

const TableHeaderItem = props => (
  <OriginalTableHeaderItem size={6} textColor="white" padding={20} {...props} />
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['slide', 'fade']}
        transitionDuration={500}
        theme={theme}
        progress="bar"
        controls={false}
      >
        <Slide bgColor="primary">
          <Text margin="10px 0 0" textColor="tertiary" size={2} fit bold>
            My react-native application
          </Text>
          <OriginalHeading size={1} fit textColor="secondary" lineHeight={1}>
            works Offline
          </OriginalHeading>
        </Slide>

        <Slide bgColor="primary">
          <Text margin="10px 0 0" textColor="tertiary" size={2} fit bold>
            To work offline, my app need to be
          </Text>
          <OriginalHeading size={1} fit textColor="secondary" lineHeight={1}>
            Solid and Fast
          </OriginalHeading>
        </Slide>

        <Slide bgImage={images.castle}>
          <OriginalHeading textColor="white" fit>
            A Solid Application
          </OriginalHeading>
          <OriginalHeading textColor="white" fit>
            works whatever the circonstancies
          </OriginalHeading>
          <Text margin="10px 0 0" textColor="white" size={4}>
            Event without network
          </Text>
        </Slide>

        <Slide bgImage={images.car}>
          <OriginalHeading textColor="white" fit>
            A Fast application
          </OriginalHeading>
          <OriginalHeading textColor="white" fit>
            don't make user wait
          </OriginalHeading>
          <Text margin="10px 0 0" textColor="white" size={4}>
            Even during a request
          </Text>
        </Slide>

        <Slide>
          <Heading textColor="secondary">Reading</Heading>
          <Heading textColor="secondary">Writing</Heading>
        </Slide>

        <Slide>
          <Heading textColor="secondary">Reading</Heading>
        </Slide>

        <Slide align="center flex-start">
          <Heading>Once upon a time</Heading>
          <Layout>
            <Fit>
              <Image src={images.noloader} />
            </Fit>
            <Fill style={{ display: 'flex', alignItems: 'center' }}>
              <Appear><Text size={1} textColor="quartenary">Ouch !</Text></Appear>
            </Fill>
          </Layout>
        </Slide>

        <Slide bgImage={images.waiting}>
          <Text size={4} textColor="white">
            A new Standard
          </Text>
          <Heading textColor="white">
            Loader pour chaque temps d’attente
          </Heading>
        </Slide>

        <Slide>
          <Layout>
            <Fit style={{ display: 'flex', alignItems: 'center' }}>
              <Image src={images.withloader} />
            </Fit>
            <Fill style={{ display: 'flex', alignItems: 'center' }}>
              <Appear><Text size={1} textColor="quartenary">Better !</Text></Appear>
            </Fill>
          </Layout>
        </Slide>

        <Slide>
          <Heading>Defensive Design</Heading>
          <Layout>
            <Fit>
              <div style={{ padding: 20 }}>
                <Text fit caps textColor="white" size={6}>Expected State</Text>
                <Image src={images.expectedState} width={300} />
              </div>
            </Fit>
            <Fit>
              <div style={{ padding: 20 }}>
                <Text fit caps textColor="white" size={6}>Loading State</Text>
                <Image src={images.loadingState} width={300} />
              </div>
            </Fit>
            <Appear>
              <Fit>
                <div style={{ padding: 20 }}>
                  <Text fit caps textColor="white" size={6}>Empty State</Text>
                  <Image src={images.emptyState} width={300} />
                </div>
              </Fit>
            </Appear>
          </Layout>
        </Slide>

        <Slide bgColor="tertiary">
          <Heading size={4} textColor="white" caps>
            Tip #1
          </Heading>
          <Heading size={4} textColor="secondary" caps>
            On each page which display data, I design and implement the 3 states
          </Heading>
        </Slide>

        <CodeSlide
          lang="js"
          code={require('raw-loader!../assets/states.js.example')}
          ranges={[
            { loc: [2, 3] },
            { loc: [4, 7], note: 'Loading State' },
            { loc: [8, 11], note: 'Empty State' },
            { loc: [12, 17], note: 'Expected State' },
          ]}
        />

        <Slide textColor="secondary">
          <Image src={images.tooMuchLoader} />
        </Slide>

        <Slide bgImage={images.waiting}>
          <Text size={4} textColor="white">
            Back to the standard
          </Text>
          <Heading textColor="white">
            <S textColor="quartenary" type="underline">Loader</S>
            {' '}
            pour chaque
            {' '}
            <S textColor="quartenary" type="underline">temps d’attente</S>
          </Heading>
          <Appear>
            <Text size={5} textColor="white">
              Not on each API call
            </Text>
          </Appear>
        </Slide>
        <Slide>
          <Heading size={4}>
            Goal : Never have to wait
          </Heading>
        </Slide>
        <Slide>
          <Heading size={4}>
            We don't want
          </Heading>
          <List textColor="white" padding={20}>
            <ListItem style={{ fontSize: 30 }}>
              Waiting state
            </ListItem>
            <ListItem style={{ fontSize: 30 }}>
              Errors
            </ListItem>
            <ListItem style={{ fontSize: 30 }}>
              Empty screen
            </ListItem>
          </List>
        </Slide>
        <Slide bgColor="tertiary">
          <Heading size={4} textColor="white" caps>
            Tip #2
          </Heading>
          <Heading size={4} textColor="secondary" caps>
            If I have data, I display it
          </Heading>
        </Slide>
        <CodeSlide
          lang="js"
          code={require('raw-loader!../assets/statesRework.js.example')}
          ranges={[
            { loc: [4, 7], note: 'Loading State' },
            { loc: [8, 11], note: 'Empty State' },
            { loc: [12, 17], note: 'Expected State' },
            { loc: [2, 3] },
          ]}
        />
        <Slide>
          <Heading>Result</Heading>
          <Image src={images.result} width={300} />
        </Slide>
        <Slide bgColor="tertiary">
          <Heading size={4} textColor="white" caps>
            Tip #3
          </Heading>
          <Heading size={4} textColor="secondary" caps>
            I keep all the data I download
          </Heading>
        </Slide>
        <Slide>
          <Heading fit>
            Keep the data on app close
          </Heading>
          <Layout>
            <Fill
              style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}
            >
              <Text textColor="white">redux-presist</Text>
              <Text textColor="white" size={5} fit>Save the redux state in Async Storage</Text>
            </Fill>
            <Appear>
              <Fill>
                <Image src={images.reduxPersist} fit />
              </Fill>
            </Appear>
          </Layout>
        </Slide>
        <Slide textColor="white">
          <Heading>
            Fixing redux-persist issues
          </Heading>
          Sizing issue (max 5Mb on android)
          <List>
            <ListItem style={{ fontSize: 28 }}>
              <Link
                textColor="tertiary"
                href="https://github.com/rt2zz/redux-persist-transform-compress"
              >
                redux-persist-transform-compress
              </Link>
            </ListItem>
            <ListItem style={{ fontSize: 28 }}>
              <Link
                textColor="tertiary"
                href="https://github.com/edy/redux-persist-transform-filter"
              >
                redux-persist-transform-filter
              </Link>
            </ListItem>
          </List>

          Update issues
          <List>
            <ListItem style={{ fontSize: 28 }}>
              Always merge with the initial state
            </ListItem>
            <ListItem style={{ fontSize: 28 }}>
              <Link textColor="tertiary" href="https://github.com/wildlifela/redux-persist-migrate">
                redux-persist-migrate
              </Link>
            </ListItem>
          </List>
        </Slide>

        <Slide>
          <Layout>
            <Fill
              style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}
            >
              <CodePane
                lang="js"
                source={`
  {
    tvshows: {
      mainList: [
        { id 8, name='Game of thrones' },
        { id 3, name='Doctor Who' },
        { id 12, name='Walking Dead' },
      ],
    },
  }
            `}
              />
            </Fill>
            <Appear>
              <Fill style={{ display: 'flex', alignItems: 'center' }}>
                <List textColor="white" padding={20}>
                  <ListItem style={{ fontSize: 30 }}>
                    Loose data
                  </ListItem>
                  <ListItem style={{ fontSize: 30 }}>
                    Potential duplication
                  </ListItem>
                </List>
              </Fill>
            </Appear>
          </Layout>
        </Slide>
        <Slide>
          <Heading>
            Normalized State
          </Heading>
          <CodePane
            lang="js"
            source={`
  {
    tvshows: {
      mainList: [8, 3, 12],
      selected: 3,
      favorites: [8, 3],
      entities: {
        3: { id 3, name='Doctor Who' },
        8: { id 8, name='Game of thrones' },
        12: { id 12, name='Walking Dead' },
      }
    },
  }
            `}
          />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} textColor="tertiary" caps>
            Now you have an app which you can use offline
          </Heading>
        </Slide>

        <Slide>
          <Heading textColor="secondary">Writing</Heading>
        </Slide>

        <Slide>
          <Heading size={6} textColor="secondary" padding={30} caps>
            Send data to API = spinner
          </Heading>
          <Image src={images.spinnerUi} width={300} />
          <List textColor="white" padding={20}>
            <ListItem style={{ fontSize: 30 }}>
              To be sure everything is OK
            </ListItem>
            <ListItem style={{ fontSize: 30 }}>
              As indicator of saving state
            </ListItem>
            <ListItem style={{ fontSize: 30 }}>
              If no network, you are stuck
            </ListItem>
          </List>
        </Slide>

        <Slide bgColor="tertiary">
          <Heading size={4} textColor="secondary" caps>
            This is Pessimistic design
          </Heading>
        </Slide>

        <Slide>
          <Heading size={6} textColor="secondary" padding={30} caps>
            Most of the time, everything is OK!
          </Heading>
          <Layout>
            <Fill>
              <Image src={images.failureSuccess} height={300} />
            </Fill>
            <Fill>
              <Appear>
                <Image src={images.optimisticUi} height={300} />
              </Appear>
            </Fill>
          </Layout>
        </Slide>

        <Slide bgImage={images.cat}>
          <Heading textColor="white" fit>
            This is optimistic UI
          </Heading>
        </Slide>

        <Slide>
          <Heading size={6} textColor="secondary" caps>
            Strategy 1 : Imediate change
          </Heading>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderItem>Good Network</TableHeaderItem>
                <TableHeaderItem>Bad network</TableHeaderItem>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableItem>
                  <Image src={require('../assets/rollback-good.gif')} />
                </TableItem>
                <TableItem>
                  <Image src={require('../assets/rollback-bad.gif')} />
                </TableItem>
              </TableRow>
            </TableBody>
          </Table>

        </Slide>

        <Slide>
          <Heading size={6} textColor="secondary" caps>
            Strategy 2 : Activity Indicator
          </Heading>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderItem>Good Network</TableHeaderItem>
                <TableHeaderItem>Bad network</TableHeaderItem>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableItem>
                  <Image src={require('../assets/waiting-good.gif')} />
                </TableItem>
                <TableItem>
                  <Image src={require('../assets/waiting-bad.gif')} />
                </TableItem>
              </TableRow>
              <Appear>
                <TableRow>
                  <TableItem>
                    <Image src={require('../assets/calendar-good.gif')} width={300} />
                  </TableItem>
                  <TableItem>
                    <Image src={require('../assets/calendar-bad.gif')} width={300} />
                  </TableItem>
                </TableRow>
              </Appear>
            </TableBody>
          </Table>
        </Slide>

        <Slide>
          <Heading size={6} textColor="secondary" caps>
            Strategy 3 : Wait the response
          </Heading>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderItem>Good Network</TableHeaderItem>
                <TableHeaderItem>Offline</TableHeaderItem>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableItem>
                  <Image src={images.waitResponse} width={300} />
                </TableItem>
                <TableItem>
                  <Image src={images.waitResponseOffline} width={300} />
                </TableItem>
              </TableRow>
            </TableBody>
          </Table>
        </Slide>

        <Slide bgImage={images.error}>
          <Heading textColor="white" fit>
            What about the errors?
          </Heading>
        </Slide>

        <Slide>
          <Heading textColor="secondary" size={4} caps>
            You must have 2 possible errors :
          </Heading>
          <List textColor="white" padding={20}>
            <ListItem style={{ fontSize: 30 }}>
              Bad or inexistent network
            </ListItem>
            <ListItem style={{ fontSize: 30 }}>
              Backend down
            </ListItem>
          </List>
          <Appear>
            <Text size={5} textColor="quartenary">
              If not, you can't use optimistic design
            </Text>
          </Appear>
        </Slide>

        <Slide bgColor="tertiary">
          <Heading size={4} textColor="white" caps>
            Tip #4
          </Heading>
          <Heading size={4} textColor="secondary" caps>
            Anticipate errors and use front-end validation
          </Heading>
        </Slide>

        <Slide>
          <Heading size={6}>
            The minimum
          </Heading>
          <Image src={require('../assets/no-connection.jpg')} width={300} />
        </Slide>

        <Slide>
          <Heading size={6} textColor="secondary" caps>
            Strategy 1 : Rollback
          </Heading>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderItem>Good Network</TableHeaderItem>
                <TableHeaderItem>Offline</TableHeaderItem>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableItem>
                  <Image src={require('../assets/rollback-good.gif')} />
                </TableItem>
                <TableItem>
                  <Image src={require('../assets/rollback-offline.gif')} />
                </TableItem>
              </TableRow>
            </TableBody>
          </Table>

        </Slide>

        <Slide>
          <Heading size={6}>
            Strategy 2 : A global error
          </Heading>
          <Image src={require('../assets/global-error.jpg')} width={300} />
        </Slide>

        <Slide>
          <Heading size={6}>
            Strategy 3 : Causal error
          </Heading>
          <Image src={require('../assets/contextful-error.png')} width={300} />
          <br />
          <Image src={require('../assets/message-icon.png')} />
        </Slide>

        <Slide>
          <Heading fit>
            Strategy 4 : No error but never give up
          </Heading>
          <Layout>
            <Fill>
              <Image src={require('../assets/waiting-tweet.png')} width={300} />
            </Fill>
            <Fill>
              <Image src={require('../assets/facebook-discardable.jpg')} width={300} />
            </Fill>
          </Layout>
        </Slide>

        <Slide>
          <Heading>
            redux-offline
          </Heading>
          <List textColor="white" padding={20}>
            <ListItem style={{ fontSize: 30 }}>Built for optimistic design</ListItem>
            <ListItem style={{ fontSize: 30 }}>Come with redux-persist</ListItem>
            <ListItem style={{ fontSize: 30 }}>Handle the retry strategy</ListItem>
            <ListItem style={{ fontSize: 30 }}>Allow to access on the network status</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading>
            The default retry strategy
          </Heading>
          <Text textColor="white">Stack all your action</Text>

          <Text textColor="white">Retry after</Text>
          <List textColor="white" padding={20}>
            <ListItem style={{ fontSize: 30 }}>1 second</ListItem>
            <ListItem style={{ fontSize: 30 }}>5 second</ListItem>
            <ListItem style={{ fontSize: 30 }}>15 second</ListItem>
            <ListItem style={{ fontSize: 30 }}>30 second</ListItem>
            <ListItem style={{ fontSize: 30 }}>...</ListItem>
            <ListItem style={{ fontSize: 30 }}>1 hour</ListItem>
          </List>
        </Slide>

        <Slide>
          <CodePane lang="js" source={require('raw-loader!../assets/redux-offline.js.example')} />
        </Slide>

        <Slide bgImage={images.offline}>
          <Heading textColor="white">
            Now your are ready to build offline app
          </Heading>
        </Slide>

      </Deck>
    );
  }
}
