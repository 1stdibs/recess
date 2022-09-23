import React from 'react';
import PropTypes from 'prop-types';
import getVariableToType from './codemirror/getVariableToType';
import onHasCompletion from './codemirror/onHasCompletion';
import styles from './styles/Editor.module.css';

export default class Editor extends React.Component {
    static propTypes = {
        selectedMethod: PropTypes.object,
        types: PropTypes.array,
        value: PropTypes.string,
        onEdit: PropTypes.func,
        readOnly: PropTypes.bool,
        onHintInformationRender: PropTypes.func,
        onPrettifyQuery: PropTypes.func,
        onRunQuery: PropTypes.func,
        editorTheme: PropTypes.string,
    };

    constructor(props) {
        super();

        // Keep a cached version of the value, this cache will be updated when the
        // editor is updated, which can later be used to protect the editor from
        // unnecessary updates during the update lifecycle.
        this.cachedValue = props.value || '';
    }

    componentDidMount() {
        // Lazily require to ensure requiring GraphiQL outside of a Browser context
        // does not produce an error.
        const CodeMirror = require('codemirror');
        require('codemirror/addon/hint/show-hint');
        require('codemirror/addon/edit/matchbrackets');
        require('codemirror/addon/edit/closebrackets');
        require('codemirror/addon/fold/brace-fold');
        require('codemirror/addon/fold/foldgutter');
        require('codemirror/addon/lint/lint');
        require('codemirror/addon/lint/json-lint');
        require('codemirror/addon/search/searchcursor');
        require('codemirror/addon/search/jump-to-line');
        require('codemirror/addon/dialog/dialog');
        require('codemirror/keymap/sublime');
        require('codemirror-graphql/variables/hint');
        require('codemirror-graphql/variables/lint');
        require('codemirror-graphql/variables/mode');

        this.editor = CodeMirror(this._node, {
            value: this.props.value || '',
            lineNumbers: true,
            tabSize: 2,
            mode: 'graphql-variables',
            height: 'auto',
            viewportMargin: Infinity,
            theme: this.props.editorTheme || 'monokai',
            keyMap: 'sublime',
            autoCloseBrackets: true,
            matchBrackets: true,
            showCursorWhenSelecting: true,
            readOnly: this.props.readOnly ? 'nocursor' : false,
            foldGutter: {
                minFoldSize: 4,
            },
            lint: true,
            hintOptions: {
                // hint,
                variableToType: getVariableToType(this.props.selectedMethod, this.props.types),
                closeOnUnfocus: false,
                completeSingle: false,
            },
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
            extraKeys: {
                'Cmd-Space': () => this.editor.showHint({ completeSingle: false }),
                'Ctrl-Space': () => this.editor.showHint({ completeSingle: false }),
                'Alt-Space': () => this.editor.showHint({ completeSingle: false }),
                'Shift-Space': () => this.editor.showHint({ completeSingle: false }),
                'Cmd-Enter': () => {
                    if (this.props.onRunQuery) {
                        this.props.onRunQuery();
                    }
                },
                'Ctrl-Enter': () => {
                    if (this.props.onRunQuery) {
                        this.props.onRunQuery();
                    }
                },
                'Shift-Ctrl-P': () => {
                    if (this.props.onPrettifyQuery) {
                        this.props.onPrettifyQuery();
                    }
                },
                //     // Persistent search box in Query Editor
                'Cmd-F': 'findPersistent',
                'Ctrl-F': 'findPersistent',
                //     // Editor improvements
                'Ctrl-Left': 'goSubwordLeft',
                'Ctrl-Right': 'goSubwordRight',
                'Alt-Left': 'goGroupLeft',
                'Alt-Right': 'goGroupRight',
            },
        });

        this.editor.on('change', this._onEdit);
        this.editor.on('keyup', this._onKeyUp);
        this.editor.on('hasCompletion', this._onHasCompletion);
    }

    componentDidUpdate(prevProps) {
        const CodeMirror = require('codemirror');

        // Ensure the changes caused by this update are not interpretted as
        // user-input changes which could otherwise result in an infinite
        // event loop.
        this.ignoreChangeEvent = true;
        if (this.props.selectedMethod !== prevProps.selectedMethod) {
            // this.editor.options.lint.selectedMethod = this.props.selectedMethod;
            this.editor.options.hintOptions.variableToType = getVariableToType(
                this.props.selectedMethod,
                this.props.types
            );
            CodeMirror.signal(this.editor, 'change', this.editor);
        }
        if (this.props.value !== prevProps.value && this.props.value !== this.cachedValue) {
            const thisValue = this.props.value || '';
            this.cachedValue = thisValue;
            this.editor.setValue(thisValue);
        }
        this.ignoreChangeEvent = false;
    }

    componentWillUnmount() {
        this.editor.off('change', this._onEdit);
        this.editor.off('keyup', this._onKeyUp);
        this.editor.off('hasCompletion', this._onHasCompletion);
        this.editor = null;
    }

    render() {
        return (
            <div
                className={styles.wrapper}
                ref={(node) => {
                    this._node = node;
                }}
            />
        );
    }

    _onKeyUp = (cm, event) => {
        const code = event.keyCode;
        if (
            (code >= 65 && code <= 90) || // letters
            (!event.shiftKey && code >= 48 && code <= 57) || // numbers
            (event.shiftKey && code === 189) || // underscore
            (event.shiftKey && code === 222) // "
        ) {
            this.editor.execCommand('autocomplete');
        }
    };

    _onEdit = () => {
        if (!this.ignoreChangeEvent) {
            this.cachedValue = this.editor.getValue();
            if (this.props.onEdit) {
                this.props.onEdit(this.cachedValue);
            }
        }
    };

    _onHasCompletion = (cm, data) => {
        onHasCompletion(cm, data, this.props.onHintInformationRender);
    };
}
