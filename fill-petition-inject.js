/**
 * CONTENT SCRIPT INJECTION
 *
 * Summary: inject javascript into each WebPage that auto-fills, submits, and reports back to the Chrome Extension
 *
 * Details: We'd use Content Scripts (https://developer.chrome.com/extensions/content_scripts) and report back to the
 * Chrome Extension via Message Passing (https://developer.chrome.com/extensions/messaging)
 *
 * Concerns: Some petitions' interfaces may not be automatable with such basic tooling (eg if they require actual
 * keystrokes). Also we'd have to write an "actionList" for each petition website.
 *
 * The example below works on part of this URL https://blacklivesmatter.com/demand-racial-data-on-coronavirus
 *
 * It looks like this is similar to what UI.Vision RPA (formerly Kantu) does:
 *   https://github.com/A9T9/Kantu/blob/8e275c4d162ebb4a5d9b834db2bb1022a5a6ce4f/src/common/command_runner.js
 */

let actionList = [
    {
        'type': 'edit-attr',
        'selector': {
            'id': 'form-first_name'
        },
        'attr': 'value',
        'value': 'My Cool First Nmae'
    },
    {
        'type': 'edit-attr',
        'selector': {
            'id': 'form-email'
        },
        'attr': 'value',
        'value': 'mycoolemail@example.com'
    },
    {
        'type': 'edit-attr',
        'selector': {
            'id': 'form-zip_code'
        },
        'attr': 'value',
        'value': '12345'
    },
    {
        'type': 'edit-attr',
        'selector': {
            'id': 'name_optin1'
        },
        'attr': 'checked',
        'value': ''
    },
];

function find_target(target_selector) {
    if ('id' in target_selector) {
        return document.getElementById(target_selector['id']);
    }
    console.log('rip');
}


function edit_attr(action) {
    let target = find_target(action['selector']);
    target[action['attr']] = action['value'];
}

async function run(actions) {
    for (let i = 0; i < actions.length; i++) {
        let action = actions[i];
        console.log(action);
        switch (action['type']) {
            case 'edit-attr':
                edit_attr(action);
                break;
            default:
                break;
        }
        await new Promise(r => setTimeout(r, 1000));
    }
}


// gets run on page load
run(actionList);
