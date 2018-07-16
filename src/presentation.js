// @ts-check
// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Image,
  CodePane,
  Layout,
  Fit,
  Fill,
  S
} from 'spectacle';
import createTheme from './theme/index';
import 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-graphql';
import './style.css';
import { Tweet } from './components/Tweet';
import { colors } from './theme/colors';

const theme = createTheme();

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck theme={theme} progress="bar" transition={[]} transitionDuration={0}>
        <Slide>
          <Heading size={2}>
            My journey into{' '}
            <S type="bold" textColor={colors.blue.base}>
              GraphQL
            </S>
          </Heading>
          <Text margin="40px 0 0 0">Axel Hernández Ferrera <Link href="https://twitter.com/axelhzf" title="@axelhzf"/></Text>
        </Slide>

        <Slide>
          <Heading size={2}>Agenda?</Heading>
          <List>
            <ListItem>What is GraphQL</ListItem>
            <ListItem>Why GraphQL?</ListItem>
            <ListItem>Backend</ListItem>
            <ListItem>Frontend</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading size={2}>What is GraphQL?</Heading>
          <List>
            <ListItem>GraphQL is a query language for building APIs</ListItem>
            <ListItem>It provides an alternative to REST</ListItem>
            <ListItem>
              It allows clients to define the structure of the data required.
              They can get many resources in a single request.
            </ListItem>
            <ListItem>Programming language agnostic</ListItem>
          </List>
        </Slide>

        <Slide>
          <Tweet id="1011928066816462848" />
        </Slide>

        <Slide>
          <Heading size={2}>First reaction</Heading>
          <List>
            <ListItem>Frontend developers: ❤️</ListItem>
            <ListItem>Backend developers: 🙀</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading size={2}>GraphQL vs REST?</Heading>
          <List>
            <ListItem>Fetch data more efficiently</ListItem>
            <ListItem>Avoid custom endpoints</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading size={2}>N+1 Requests</Heading>
        </Slide>

        <Slide>
          <JsCode>{`
let posts = await rest.get('/posts');
posts = await Promise.all(posts.map(post => {
  const comments =
    await rest.get(\`/posts/\${post.id}/comments\`);
  post.comments = comments;
  return post;
}
          `}</JsCode>
        </Slide>

        <Slide>
          <GqlCode>{`
{
  posts {
    id
    title
    comments {
      count
    }
  }
}
          `}</GqlCode>
        </Slide>

        <Slide>
          <List>
            <ListItem>All data is fetched in a single round trip.</ListItem>
            <ListItem>
              The client and server are decoupled: the client specifies the data
              needed instead of relying on the server endpoint to return the
              correct data.
            </ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading size={2}>Client caching</Heading>
        </Slide>

        <Slide>
          <Tweet id="506010907021828096"/>
        </Slide>

        <Slide>
          <Text>In a resource-oriented REST system, we can maintain a response cache</Text>
          <JsCode>{`
var cache = new Map();
rest.get = uri => {
  if (!cache.has(uri)) {
    cache.set(uri, fetch(uri));
  }
  return cache.get(uri);
};
          `}</JsCode>
        </Slide>

        <Slide>
          <Heading>Cache Consistency</Heading>

          /posts    --- cached
          /posts/1  --- fetch the details of a post and the title is updated
          /post     --- user goes back to the posts page but we have the data cached and we are displaying inconsistent information
        </Slide>

        <Slide>
          <Heading size={2}>normalizr</Heading>
        </Slide>

        <Slide>
          <JsonCode>{`
{
  "id": "123",
  "author": {
    "id": "1",
    "name": "Paul"
  },
  "title": "My awesome blog post",
  "comments": [
    {
      "id": "324",
      "commenter": {
        "id": "2",
        "name": "Nicole"
      }
    }
  ]
}
          `}</JsonCode>
        </Slide>

        <Slide>
          <JsCode>{`
import { normalize, schema } from 'normalizr';

const user = new schema.Entity('users');
const comment = new schema.Entity('comments', {
  commenter: user
});
const article = new schema.Entity('articles', {
  author: user,
  comments: [comment]
});

const normalizedData = normalize(originalData, article);
          `}</JsCode>
        </Slide>

        <Slide>
          <JsonCode>{`
{
  result: "123",
  entities: {
    "articles": {
      "123": {
        id: "123",
        author: "1",
        title: "My awesome blog post",
        comments: [ "324" ]
      }
    },
    "users": {
      "1": { "id": "1", "name": "Paul" },
      "2": { "id": "2", "name": "Nicole" }
    },
    "comments": {
      "324": { id: "324", "commenter": "2" }
    }
  }
}
          `}</JsonCode>
        </Slide>

        <Slide>
          <Heading>Questions?</Heading>
          <Heading size={5} margin="40px 0 0 0">
            @axelhzf
          </Heading>
        </Slide>
      </Deck>
    );
  }
}

const JsCode = ({ children, ...other }) => (
  <CodePane lang="javascript" source={children} {...other} />
);

const GqlCode = ({ children }) => <CodePane lang="graphql" source={children} />;

const JsonCode = ({ children }) => <CodePane lang="json" source={children} />;

const Link = ({ href, title }) => (
  <a href={href} target="_blank">
    {title || href}
  </a>
);
