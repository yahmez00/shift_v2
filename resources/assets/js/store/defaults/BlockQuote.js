let blockquote = {
    content: '"Your quote goes here..."',

    width: 100,
    fontFamily: "Times New Roman",
    fontWeights: [400, 700],
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 'normal',
    letterSpacing: 0,
    textAlign: "left",
    textColor: { r: 0, g: 0, b: 0, a: 1 },
    backgroundColor: { r: 255, g: 255, b: 255, a: 0 },
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 20
    },
    border: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 5,
        radius: 0,
        style: 'solid',
        color: { r: 100, g: 100, b: 100, a: 1 },
    },
    textShadow: {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 0,
        color: { r: 0, g: 0, b: 0, a: 0 },
    },
}

export default {
    type: "BlockQuote",
    selected: false,
    visible: true,

    sm: blockquote,
    md: blockquote,
    lg: blockquote,
    xl: blockquote,
};
