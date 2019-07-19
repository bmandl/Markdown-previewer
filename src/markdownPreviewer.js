import React from 'react';
import marked from 'marked';
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
            previewMaximized: false 
        }

        this.handleChange = this.handleChange.bind(this);
        this.maximizeEditor = this.maximizeEditor.bind(this);
        this.maximizePreview = this.maximizePreview.bind(this);
    }

    setTextAreaHeight = () => {
        document.getElementById('editor').style.height = this.getDivHeight().toString() + 'px';
    }

    componentDidMount() {
        this.setTextAreaHeight();
    }

    componentDidUpdate() {
        this.setTextAreaHeight();
    }

    handleChange(e) {
        this.setState({
            markdown: e.target.value
        });
    }

    getDivHeight = () => {
        return document.getElementById('hidden').clientHeight;
    }

    maximizeEditor() {
        this.setState ({
            editorMaximized: !this.state.editorMaximized
        });
    }

    maximizePreview() {
        this.setState({
            previewMaximized: !this.state.previewMaximized
        });
    }

    render() {
        return (
            <div>
                <button className="maxEditor" onClick={this.maximizeEditor}>Maximize editor</button>
                <button className="maxPreview" onClick={this.maximizePreview}>Maximize preview</button>
                <Editor onChange={this.handleChange} markdown={this.state.markdown} maximized={this.state.editorMaximized} />
                <Preview markdown={this.state.markdown} maximized={this.state.previewMaximized} />
            </div>
        );
    }
}

const Editor = (props) => {
    return (
        <div>
            <div className={"editorBox" + (props.maximized ? ' editorBoxMaximized' : '')}>
                <textarea id="editor" value={props.markdown} onChange={props.onChange} />
            </div>
            <div id="hidden" className="hiddenDiv" dangerouslySetInnerHTML={{ __html: props.markdown }} />
        </div>
    );
}

const Preview = (props) => {
    return (
        <div id="preview" className={"previewBox" + (props.maximized ? ' previewBoxMaximized' : '')} dangerouslySetInnerHTML={{ __html: marked(props.markdown, { renderer: renderer }) }}  />
    );
}

export default App;