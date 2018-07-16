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
          <Text margin="40px 0 0 0">
            Axel Hernández Ferrera{' '}
            <Link href="https://twitter.com/axelhzf" title="@axelhzf" />
          </Text>
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
          <Heading size={2}>
            Client side data fetching is a hard problem
          </Heading>
          <List>
            <ListItem>Caching</ListItem>
            <ListItem>Realtime</ListItem>
            <ListItem>Prefetching</ListItem>
            <ListItem>Optimistic UI</ListItem>
            <ListItem>Offline support</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading size={2}>Caching</Heading>
        </Slide>

        <Slide>
          <Tweet id="506010907021828096" />
        </Slide>

        <Slide>
          <Text>
            In a resource-oriented REST system, we can maintain a response cache
          </Text>
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
          /posts --- cached /posts/1 --- fetch the details of a post and the
          title is updated /post --- user goes back to the posts page but we
          have the data cached and we are displaying inconsistent information
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
          <Heading size={2}>GraphQL APIs have a strongly typed schema</Heading>
        </Slide>

        <Slide>
          <Heading size={2}>
            At this point we were convinced that we wanted to try graphql
          </Heading>
        </Slide>

        <Slide>
          <Heading size={2}>Building the backend</Heading>
        </Slide>

        <Slide>
          <Heading size={2}>Schema definition</Heading>
        </Slide>

        <Slide>
          <Text>
            The schema is a model of the data that can be fetched through the
            GraphQL server. It defines what queries clients are allowed to make,
            what types of data can be fetched from the server, and what the
            relationships between these types are
          </Text>
        </Slide>

        <Slide>
          <GqlCode>{`
type User {
  id: ID!
  name: String!
  posts: [Post!]!
}

type Comment {
  id: ID!
  author: User!
  body: String!
}

type Post {
  id: ID!
  author: User!
  body: String!
  comments: [Comment!]!
}
          `}</GqlCode>
        </Slide>

        <Slide>
          <GqlCode>{`
type Query {
  users: [User!]!
  userById(id: ID!): User
  posts: [Post!]!  
  postById(id: ID!): Post
}

schema {
  query: Query
}
          `}</GqlCode>
        </Slide>

        <Slide>
          <Image src="https://cdn-images-1.medium.com/max/800/1*ldZjwY1qE1LTdm8VqNqltQ.png" />
        </Slide>

        <Slide>
          <Heading size={2}>
            Three ways of represent your graphql schema
          </Heading>
          <List>
            <ListItem>GraphQL Schema Definition Language</ListItem>
            <ListItem>GraphQL introspection query result</ListItem>
            <ListItem>GraphQL.js GraphQLSchema object</ListItem>
            <Link href="https://blog.apollographql.com/three-ways-to-represent-your-graphql-schema-a41f4175100d" />
          </List>
        </Slide>

        <Slide>
          <Heading size={2}>Resolve function</Heading>
        </Slide>

        <Slide>
          <Text>
            Resolve functions are like little routers. They specify what code
            needs to be executed when a user query for a certain type or field.
          </Text>
        </Slide>

        <Slide>
          <JsCode>{`
  function resolver(obj, args, context, info) {

  }
          `}</JsCode>
        </Slide>

        <Slide>
          <Heading size={2}>Resolver arguments</Heading>
          <List>
            <ListItem>obj: The previous object</ListItem>
            <ListItem>
              args: The arguments provided to the field in the GraphQL query
            </ListItem>
            <ListItem>
              context: Contextual information like currently logged user or
              access to the database
            </ListItem>
            <ListItem>
              info: Holds field-specific information relevant to the current
              query
            </ListItem>
          </List>
        </Slide>

        <Slide>
          <JsCode>{`
postById(obj, args){
  return sql.raw('SELECT * FROM posts WHERE id = %s', args.id);
}
userById(obj, args){
  return redis.get('user:\${args.id}');
}
          `}</JsCode>
        </Slide>

        <Slide>
          <Heading size={2}>Asynchronous resolvers</Heading>
          <Text>
            During execution, GraphQL will wait for Promises to complete before
            continuing and will do so with optimal concurrency
          </Text>
        </Slide>

        <Slide>
          <Heading size={2}>Query execution</Heading>
          <List>
            <ListItem>Parse</ListItem>
            <ListItem>Validate</ListItem>
            <ListItem>Execute</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading size={2}>We start building our resolve functions</Heading>
            <JsCode>{`
const resolver = {
   Query: {
     posts: () => Posts.findAll()
     users: () => User.findAll()
   },
   Posts: {
     author: (post) => User.findById(post.authorId)
   },
   User: {
     posts: (user) => Post.find({ authorId: user.id})
   }
}
            `}</JsCode>
        </Slide>

        <Slide>
          <Heading size={2}>N+1 request to the DB</Heading>
        </Slide>

        <Slide>
          <Heading size={2}>Join monster</Heading>
          <Image src="https://raw.githubusercontent.com/stems/join-monster/master/docs/img/join_monster.png" />
        </Slide>

        <Slide>
          <GqlCode>{`
{
  user(id: 2) {
    fullName
    email
    posts {
      id
      body
      comments {
        body
        author { fullName }
      }
    }
  }
}
          `}</GqlCode>
        </Slide>

        <Slide>
          <SqlCode>{`
SELECT
  "user"."id" AS "id",
  "user"."email_address" AS "email_address",
  "posts"."id" AS "posts__id",
  "posts"."body" AS "posts__body",
  "user"."first_name" AS "first_name",
  "user"."last_name" AS "last_name"
FROM accounts AS "user"
LEFT JOIN posts AS "posts" ON "user".id = "posts".author_id
WHERE "user".id = 2;
          `}</SqlCode>
        </Slide>

        <Slide>
          <SqlCode>{`
-- then get the right comments for each post
SELECT
  "comments"."id" AS "id",
  "comments"."body" AS "body",
  "author"."id" AS "author__id",
  "author"."first_name" AS "author__first_name",
  "author"."last_name" AS "author__last_name",
  "comments"."post_id" AS "post_id"
FROM comments AS "comments"
LEFT JOIN accounts AS "author" ON "comments".author_id = "author".id
WHERE "comments".archived = FALSE AND "comments"."post_id" IN (2,8,11,12) -- the post IDs from the previous query
          `}</SqlCode>
        </Slide>

        <Slide>
          <Heading size={2}>DataLoader</Heading>
          <Text>
            DataLoader is a generic utility to be used as part of your
            application's data fetching layer to provide a simplified and
            consistent API over various remote data sources such as databases or
            web services via <strong>batching</strong> and{' '}
            <strong>caching</strong>.
          </Text>
        </Slide>

        <Slide>
          <JsCode>{`
var userLoader = new DataLoader(keys => sql.raw('select * from user where id in \${ids}'));

userLoader.load(1).then(user => console.log(user))
userLoader.load(2).then(user => console.log(user))

var userLoader = new DataLoader(...)
var promise1A = userLoader.load(1)
var promise1B = userLoader.load(1)
assert(promise1A === promise1B)
          `}</JsCode>
        </Slide>

        <Slide>
          <Heading size={2}>
            Caching per request. Create loaders per request and add them to the
            graphql context
          </Heading>
        </Slide>

        <Slide>
          <Heading size={2}>Type safety is pretty cool</Heading>
        </Slide>

        <Slide>
          <JsCode>{`
type Context = {
  user: User,
  loaders: Loaders
}

function usersResolver(obj, user: UserQueryArgs, context: Context, info: GraphQLInfo): User[] {

}
          `}</JsCode>
        </Slide>

        <Slide>
          <Heading size={2}>Tools for type definition generation</Heading>
          <List>
            <ListItem>
              <Link
                title="apollo-cli"
                href="https://github.com/apollographql/apollo-cli"
              />
            </ListItem>
            <ListItem>
              <Link
                title="graphql-code-generator"
                href="https://github.com/dotansimha/graphql-code-generator"
              />
            </ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading size={2}>Code generation</Heading>
          <List>
            <ListItem>GraphQL -> code</ListItem>
            <ListItem>ORM -> GraphQL</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading size={2}>Tracing</Heading>
          <List>
            <ListItem>
              <Link
                title="Apollo engine"
                href="https://www.apollographql.com/engine"
              />
            </ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading size={2}>Frontend</Heading>
        </Slide>

        <Slide>
          <Layout style={{alignItems: 'center'}}>
            <Image style={{maxWidth: '50%'}} src={require('./images/apollo-logo.png')} />
            <Image style={{maxWidth: '50%'}} src={require('./images/relay.svg')} />
          </Layout>
        </Slide>

        <Slide>
          <JsCode>
            {`
const query = gql\`
  query {
    posts {
      id
      title
    }
  }
\`;
const Posts = () => (
  <Query query={query}>
    {(loading, error, data) => {
      if (loading) return <div>Loading...</div>
      if (error) return <div>Error</div>
      return <ul>{data.posts.map(post =>
        <li>{post.title}</li>
      )}</ul>
    }}
  </Query>
)
            `}
          </JsCode>
        </Slide>

        <Slide>
          <JsCode>{`
<Mutation mutation={addToCart} variables={{id}}>
    {(addToCart, { loading }) => (
        <button disabled={loading} onClick={addToCart}>
            Add{loading && 'ing'} to cart
        </button>
    )}
</Mutation>
`}</JsCode>
        </Slide>

        <Slide>
          <Heading size={2}>End-to-end type-safety</Heading>
        </Slide>

        <Slide>
          <Heading size={2}>Fetch policy</Heading>
          <List>
            <ListItem>cache-first (default)</ListItem>
            <ListItem>cache-and-network</ListItem>
            <ListItem>network-only</ListItem>
            <ListItem>cache-only</ListItem>
            <ListItem>no-cache</ListItem>
          </List>
        </Slide>

        <Slide>
          <Image src={require('./images/apollo-client-bugs.png')} />
        </Slide>

        <Slide>
          <Heading size={2}>Create your own query components</Heading>
          <List>
            <ListItem>
              Avoid boilerplate of handle loading and error state
            </ListItem>
            <ListItem>User your own custom default values</ListItem>
            <ListItem>Patch fetch-policy issues</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading size={2}>Cache invalidation</Heading>
        </Slide>

        <Slide>
          <JsCode>{`
export default graphql(gql\`mutation { ... }\`, {
  options: {
    refetchQueries: [
      'CommentList',
      'PostList',
    ],
  },
})(MyComponent);
          `}</JsCode>
        </Slide>

        <Slide>
          <Heading size={2}>Cache invalidation is hard</Heading>
        </Slide>

        <Slide>
          <Quote textAlign="left">
            If you suck at providing REST API, you will suck at providing
            GraphQL API
            <Text textAlign="left" margin="40px 0">
              - Arnaud Lauret
            </Text>
          </Quote>
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

const SqlCode = ({ children }) => <CodePane lang="sql" source={children} />;

const Link = ({ href, title }) => (
  <a href={href} target="_blank">
    {title || href}
  </a>
);
