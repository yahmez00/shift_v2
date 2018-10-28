import defaults from "./defaults/_defaults";
import { duplicateObject, getElement, resetSelection } from "./helpers";

/**
 * Sets the state of the notification object.
 *
 */
export const setNotification = (state, incomingNotification) => {
    window.Vue.set(state.notification, "message", incomingNotification.message);
    window.Vue.set(state.notification, "type", incomingNotification.type);
    window.Vue.set(state.notification, "dismissCountDown", 5);

    window.scrollTo(0, 0);
};

/**
 * Sets the state of the notification object.
 *
 */
export const setNotificationCountDown = (state, countdown) => {
    window.Vue.set(state.notification, "dismissCountDown", countdown);
};

/**
 * Sets the title of the article.
 *
 */
export const updateArticleTitle = (state, title) => {
    window.Vue.set(state, "articleTitle", title);
};

/**
 * Adds another Canvas to the Workspace.
 *
 */
export const addCanvas = state => {
    state.canvases.push(duplicateObject(defaults.canvas));
};


/**
 * Used to set CSS properties on components.
 *
 */
export const setComponentProperty = (state, component) => {
    window.Vue.set(getElement(state), component.property, component.value);
};

/**
 * Some Components like Margin and Padding have a subproperty we may need to set.
 *
 */
export const setComponentSubProperty = (state, component) => {
    window.Vue.set(getElement(state)[component.property], component.subproperty, component.value);
};

/**
 * Deletes the selected Element
 *
 */
export const deleteElement = state => {
    if (state.active.type === 'Component'){
        state.canvases[state.active.canvas].rows[state.active.row].columns[state.active.column].components.splice(state.active.component, 1);
    }
    else if (state.active.type === 'Column') {
        state.canvases[state.active.canvas].rows[state.active.row].columns.splice(state.active.column, 1);
    }
    else if (state.active.type === 'Row') {
        state.canvases[state.active.canvas].rows.splice(state.active.row, 1);
    }
    else {
        state.canvases.splice(state.active.canvas, 1);
    }

    resetSelection(state);
};

/**
 * Clones the selected Canvas below it's current position.
 *
 */
export const cloneElement = (state, i) => {
    if (state.active.type === 'Canvas') {
        this.cloneCanvas(state);
    } else if (state.active.type === 'Row') {
        this.cloneRow(state, i);
    } else if (state.active.type === 'Column') {
        this.cloneColumn(state, i);
    } else {
        this.cloneComponent(state, i);
    }
};

/**
 * Clones the selected Canvas below it's current position.
 *
 */
export const cloneCanvas = state => {
    const canvas = state.canvases[state.active.canvas];

    state.canvases.splice(state.active.canvas, 0, duplicateObject(canvas));
};

/**
 * Clones the selected Row to the specified position.
 *
 */
export const cloneRow = (state, i) => {
    const row = state.canvases[state.active.canvas].rows[state.active.row];

    state.canvases[i.canvasIndex].rows.splice(0, 0, duplicateObject(row));
};

/**
 * Clones the selected Column to the specified position.
 *
 */
export const cloneColumn = (state, i) => {
    const column = state.canvases[state.active.canvas].rows[state.active.row].columns[state.active.column];

    let totalColumnWidth = 0;

    state.canvases[i.canvasIndex].rows[i.rowIndex].columns.forEach(function (column) {
        totalColumnWidth += column.columnWidth;
    });

    totalColumnWidth += state.canvases[state.active.canvas].rows[state.active.row].columns[state.active.column].columnWidth;

    if (totalColumnWidth > 12) {
        this.setNotification(state, {
            message: 'Not enough room to fit that column there. Reduce size of existing columns and try again.',
            type: 'warning',
        });
    } else {
        state.canvases[i.canvasIndex].rows[i.rowIndex].columns.splice(0, 0, duplicateObject(column));
    }
};

/**
 * Clones the selected Component to the specified position.
 *
 */
export const cloneComponent = (state, i) => {
    const component = state.canvases[state.active.canvas].rows[state.active.row].columns[state.active.column].components[state.active.component];

    state.canvases[i.canvasIndex].rows[i.rowIndex].columns[i.columnIndex].components.splice(0, 0, duplicateObject(component));
};

export const moveElement = (state, direction) => {
    const directionIndex = direction === 'up' ? -1 : 1;

    const element = {
        position: directionIndex,
        selectedElement: getElement(state),
        elementAboveOrBelow: getElement(state, directionIndex),
    }

    if (state.active.type === 'Canvas') {
        this.moveCanvas(state, element);
    }
    
    if (state.active.type === 'Row') {
        this.moveRow(state, element);
    }
    
    if (state.active.type === 'Column') {
        this.moveColumn(state, element);
    }

    if (state.active.type === 'Component') {
        this.moveComponent(state, element);
    }
}

/**
 * Moves a Canvas the workspace.
 *
 */
export const moveCanvas = (state, canvas) => {
    // Swap positions around:
    window.Vue.set(state.canvases, [state.active.canvas + (canvas.position)], canvas.selectedElement);
    window.Vue.set(state.canvases, [state.active.canvas], canvas.elementAboveOrBelow);

    // Reselect the moved element:
    state.active.canvas = state.active.canvas + (canvas.position);
};

/**
 * Moves a Row the workspace.
 *
 */
export const moveRow = (state, row) => {
    // Swap positions around:
    window.Vue.set(state.canvases[state.active.canvas].rows, [state.active.row + (row.position)], row.selectedElement);
    window.Vue.set(state.canvases[state.active.canvas].rows, [state.active.row], row.elementAboveOrBelow);

    // Reselect the moved element:
    state.active.row = state.active.row + (row.position);
};

/**
 * Moves a Column within a Row.
 *
 */
export const moveColumn = (state, column) => {
    // Swap positions around:
    window.Vue.set(state.canvases[state.active.canvas].rows[state.active.row].columns, [state.active.column + (column.position)], column.selectedElement);
    window.Vue.set(state.canvases[state.active.canvas].rows[state.active.row].columns, [state.active.column], column.elementAboveOrBelow);

    // Reselect the moved element:
    state.active.column = state.active.column + (column.position);
};

/**
 * Moves a Component within a Column.
 *
 */
export const moveComponent = (state, component) => {
    // Swap positions around:
    window.Vue.set(state.canvases[state.active.canvas].rows[state.active.row].columns[state.active.column].components, [state.active.component + (component.position)], component.selectedElement);
    window.Vue.set(state.canvases[state.active.canvas].rows[state.active.row].columns[state.active.column].components, [state.active.component], component.elementAboveOrBelow);

    // Reselect the moved element:
    state.active.component = state.active.component + (component.position);
};

/**
 * Adds a Row to the specified Canvas.
 *
 */
export const addRowToCanvas = state => {
    const newRow = duplicateObject(defaults.row);

    state.canvases[state.active.canvas].rows.push(newRow);
};

/**
 * Adds a Column to the specified Row.
 *
 */
export const addColumnToRow = (state, columnWidth) => {
    const newColumn = duplicateObject(defaults.column);

    newColumn.columnWidth = columnWidth;

    state.canvases[state.active.canvas].columns.push(newColumn);
};

/**
 * Sets the currently selected component to whatever the user clicked on.
 *
 */
export const selectElement = (state, i) => {
    resetSelection(state);

    if (i.canvasIndex !== undefined) {
        window.Vue.set(state.active, 'canvas', i.canvasIndex);
        window.Vue.set(state.active, 'type', 'Canvas');
    }

    if (i.rowIndex !== undefined) {
        window.Vue.set(state.active, 'row', i.rowIndex);
        window.Vue.set(state.active, 'type', 'Row');
    }

    if (i.columnIndex !== undefined) {
        window.Vue.set(state.active, 'column', i.columnIndex);
        window.Vue.set(state.active, 'type', 'Column');
    }

    if (i.componentIndex !== undefined) {
        window.Vue.set(state.active, 'component', i.componentIndex);
        window.Vue.set(state.active, 'type', 'Component');
    }

    getElement(state).selected = true;
};

/**
 * Adds a component to the specified column.
 *
 */
export const addComponentToColumn = (state, componentType) => {
    const components = {
        "Heading": duplicateObject(defaults.heading),
        "Paragraph": duplicateObject(defaults.paragraph),
        "BlockQuote": duplicateObject(defaults.blockQuote),
        "Picture": duplicateObject(defaults.picture),
        "HorizontalLine": duplicateObject(defaults.horizontalLine),
        "InstagramEmbed": duplicateObject(defaults.instagram),
        "FacebookEmbed": duplicateObject(defaults.facebook),
        "YouTubeEmbed": duplicateObject(defaults.youtube),
        "RecipeSummary": duplicateObject(defaults.recipeSummary),
        "RecipeIngredients": duplicateObject(defaults.recipeIngredients),
    };

    state.canvases[state.active.canvas].rows[state.active.row].columns[state.active.column].components
            .push(components[componentType]);
};

/**
 * Sets the articleHtml variable in state, to whatever is in the main workspace.
 *
 */
export const buildHtml = (state, html) => {
    html = this.createHtmlHead(state, html, state.articleTitle);
    html = this.cleanHtml(html);
    html = this.appendImageUrlsToHtml(html);
    html += "</body>";
    html += "</html>";

    window.Vue.set(state, "articleHtml", html);
};

/**
 * Appends a <head> to the HTML. Includes stylesheets.
 * 
 */
export const createHtmlHead = (state, html, title) => {
    let fonts = this.getUniqueFontList(state.fontsUsed);
    let head  = '';

    head += "<!DOCTYPE html>";
    head += "<html>";
    head += "<head>";
    head += "<meta charset=\"UTF-8\">";
    head += "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">";
    head += "<meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">";
    head += "<title>" + title + "</title>";
    head += "<link rel='stylesheet' href='https://unpkg.com/normalize.css@8.0.0/normalize.css'>";
    head += "<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'>";

    // Append the needed fonts.
    fonts.forEach(function (font) {
        let fontStylesheet = "<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=" + font.name + ":";

        font.weights.forEach(function (weight) {
            fontStylesheet += weight + ",";
        });

        head += (fontStylesheet += "'>");
    });

    head += "</head>";
    head += "<body>";

    return head + html;
};

/**
 * When building our html, we don't want to import the same font stylesheet multiple times. This function
 * removes any duplicate fonts from fontsUsed, allowing us to build up the stylesheets more efficiently.
 * 
 */
export const getUniqueFontList = fontsUsed => {
    let uniqueFonts = [];
    let fontsAdded  = [];

    fontsUsed.forEach(function (font) {
        if (! fontsAdded.includes(font.name)) {
            fontsAdded.push(font.name);
            uniqueFonts.push(font);
        }
    });

    return uniqueFonts;
};

/**
 * When previewing an article, we need to append the hostname to the url for images to display properly.
 *
 */
export const appendImageUrlsToHtml = html => {
    const regex  = /(\/storage\/user-images)/g;
    const subst  = location.protocol + '//' + window.location.hostname + `\$1`;

    return html.replace(regex, subst);
};

/**
 * When getting an articles html, we want to strip out unnecessary text such as Vue's
 * 'data-v' properties, and any comments in the html (in the form of "<!-- -->");
 *
 */
export const cleanHtml = html => {
    const matchDataVText   = /(data-v-\w*=""\s)/g;
    const matchBoilerplate = /(\sshift-canvas|class="shift-component"|shift-column\s|\sselected-canvas|shift-component|selected-element|\sclass="\s?"|\sclass="v-portal"|<!-*>)/g;

    html = html.replace(matchDataVText, "");
    html = html.replace(matchBoilerplate, "");

    return html;
};

/**
 * Loads an existing article (updates the canvases).
 *
 */
export const loadArticle = (state, article) => {
    // Reset selection first (prevents a bug that breaks element selection).
    window.Vue.set(state.active, "canvas", undefined);
    window.Vue.set(state.active, "column", undefined);
    window.Vue.set(state.active, "currentComponent", undefined);

    // Now load in the article itself.
    window.Vue.set(state, "articleTitle", article.title);
    window.Vue.set(state, "canvases", JSON.parse(article.article_json));

    // Load in custom fonts if there are any, otherwise set to an empty array.
    if (JSON.parse(article.fonts_used)) {
        window.Vue.set(state, "fontsUsed", JSON.parse(article.fonts_used));
    } else {
        state.fontsUsed = [];
    }
};

/**
 * Adds a font to the list of used fonts.
 * 
 */
export const addFontToFontsUsed = (state, font) => {
    state.fontsUsed.push(font);
};