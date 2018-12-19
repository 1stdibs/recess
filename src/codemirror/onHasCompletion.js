import { GraphQLNonNull, GraphQLList } from 'graphql';
import styles from './styles/onHasCompletion.module.css';

/**
 * Render a custom UI for CodeMirror's hint which includes additional info
 * about the type and description for the selected context.
 */
export default function onHasCompletion(cm, data, onHintInformationRender) {
    const CodeMirror = require('codemirror');

    let information;

    // When a hint result is selected, we augment the UI with information.
    CodeMirror.on(data, 'select', (ctx, el) => {
        // Only the first time (usually when the hint UI is first displayed)
        // do we create the information nodes.
        if (!information) {
            const hintsUl = el.parentNode;
            // const hintsLi = [...hintsUl.querySelectorAll('li')];
            // const lastLi = hintsLi[hintsLi.length - 1];
            // lastLi.classList.add(styles.lastLi);

            // This "information" node will contain the additional info about the
            // highlighted typeahead option.
            information = document.createElement('div');
            information.className = styles.info;
            hintsUl.appendChild(information);

            // When CodeMirror attempts to remove the hint UI, we detect that it was
            // removed and in turn remove the information nodes.
            let onRemoveFn;
            hintsUl.addEventListener(
                'DOMNodeRemoved',
                (onRemoveFn = event => {
                    if (event.target === hintsUl) {
                        hintsUl.removeEventListener('DOMNodeRemoved', onRemoveFn);
                        information = null;
                        onRemoveFn = null;
                    }
                })
            );
        }

        // Now that the UI has been set up, add info to information.
        const type = ctx.type ? '<span class="infoType">' + renderType(ctx.type) + '</span>' : '';

        information.innerHTML = `<div class="${styles.content}">${type}</div>`;

        // Additional rendering?
        if (onHintInformationRender) {
            onHintInformationRender(information);
        }
    });
}

function renderType(type) {
    if (type instanceof GraphQLNonNull) {
        return `${renderType(type.ofType)}!`;
    }
    if (type instanceof GraphQLList) {
        return `[${renderType(type.ofType)}]`;
    }
    return `<a class="typeName">${type.name}</a>`;
}
