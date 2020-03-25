import React, { useState } from 'react';
import marked from 'marked';
import { Container, Row, Col, FormControl } from 'react-bootstrap';
import ContentEditable from 'react-contenteditable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressArrowsAlt, faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import './markdownPreviewer.scss';

marked.setOptions({
    breaks: true
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    return (
        `<a href="${href}" target="_blank">${text}</a>`
    );
}
const markdownDefault = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            markdown: markdownDefault,
            editorMaximized: false,
            previewMaximized: false,
            editorMinimized: false,
            previewMinimized: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.maximizeEditor = this.maximizeEditor.bind(this);
        this.maximizePreview = this.maximizePreview.bind(this);
        this.minimizeEditor = this.minimizeEditor.bind(this);
        this.minimizePreview = this.minimizePreview.bind(this);
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    handleChange(e) {
        this.setState({
            markdown: e.target.value
        });
    }

    maximizeEditor() {
        this.setState(state => ({
            editorMaximized: !state.editorMaximized,
            previewMaximized: !state.editorMaximized ? false : state.previewMaximized
        }));
        this.minimizePreview();
    }

    maximizePreview() {
        this.setState(state => ({
            previewMaximized: !state.previewMaximized,
            editorMaximized: !state.previewMaximized ? false : state.editorMaximized
        }));
        this.minimizeEditor();
    }

    minimizeEditor() {
        this.setState(state => ({
            editorMinimized: !state.editorMinimized
        }))
    }

    minimizePreview() {
        this.setState(state => ({
            previewMinimized: !state.previewMinimized
        }))
    }

    render() {
        return (
            <div>
                <Editor onChange={this.handleChange} markdown={this.state.markdown} maximize={this.maximizeEditor} maximized={this.state.editorMaximized} minimized={this.state.editorMinimized} />
                <Preview markdown={this.state.markdown} maximize={this.maximizePreview} maximized={this.state.previewMaximized} minimized={this.state.previewMinimized} />
            </div>
        );
    }
}

const Editor = (props) => {
    const classes = ['expandable','shadow-sm', 'rounded','border'];
    if(props.minimized) classes.push('minimized')
    else if(props.maximized) classes.push('maximized');
    return (
        <Container fluid={props.maximized} className={classes}>
            <Row className="toolbar bg-light border-bottom text-primary">
            <Col>Editor</Col>
                <Col className="maximize">
                    <FontAwesomeIcon icon={props.maximized ? faCompressArrowsAlt : faExpandArrowsAlt}
                        onClick={props.maximize}
                    />
                </Col>
            </Row>
            <Row><Col><FormControl as="textarea" id="editor" value={props.markdown} onChange={props.onChange} /></Col></Row>
        </Container>
    );
}

const Preview = (props) => {
    const classes = ['expandable','shadow', 'rounded','border'];
    if(props.minimized) classes.push('minimized')
    else if(props.maximized) classes.push('maximized');
    return (
        <Container fluid={props.maximized} className={classes}>
            <Row className="toolbar bg-light border-bottom text-primary">
                <Col>Preview</Col>
                <Col className="maximize">
                    <FontAwesomeIcon icon={props.maximized ? faCompressArrowsAlt : faExpandArrowsAlt}
                        onClick={props.maximize}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ContentEditable id="preview"
                        html={marked(props.markdown, { renderer: renderer })}
                        disabled={true}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default App;