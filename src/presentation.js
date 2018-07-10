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
import TweetEmbed from 'react-tweet-embed'
import createTheme from './theme/index';
import 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-graphql';
import './style.css';

const theme = createTheme();

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck theme={theme} progress="bar" transition={[]} transitionDuration={0}>
        <Slide>
            <Image
                margin="40px auto 0 auto"
                height={200}
                src={require('./images/gql-logo.svg')}
            />
          <Heading size={2}>
            <S type="bold" textColor="pink">
              GraphQL
            </S> discovering the best practices
          </Heading>
          <Text margin="40px 0 0 0">
            Axel Hernández Ferrera (@axelhzf)
          </Text>
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
            <TweetEmbed id="1011928066816462848" />
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
