import defaultCanvas from "./defaults/Canvas";
import { duplicateObject } from "./helpers";

export default {
    // The title the user gives the article.
    articleTitle: null,

    // When the user exports HTML, it will be held here.
    articleHtml: undefined,

    // The currently selected device size. Can be sm, md, lg, xl, fw (full width).
    deviceSize: 'fw',

    // The indexes of the element that is currently selected by the user.
    selected: {
        canvas: undefined,
        row: undefined,
        column: undefined,
        component: undefined,
        type: undefined,
    },

    // The content of the workspace. The full list of Canvases and everything within them.
    canvases: [
        duplicateObject(defaultCanvas),
    ],

    // The notification dialog box that appears above the article title.
    notification: {
        message: '',
        type: 'success',
        dismissSecs: 5,
        dismissCountDown: 0,
    },

    // Sometimes we want to disabled keybindings, such as when we are editing a text element.
    enableKeyBindings: true,

    // Holds an array of all the Fonts used in the article. We do this so we can append the
    // needed stylesheets to the document head when exporting the article. Each object
    // in this array has the font name, and the font weights we need to save.
    fontsUsed: [],
};
