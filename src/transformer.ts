// import JsonML from "jsonml.js";
import JsonML from "jsonml";

let isTHead = false;

const transformTHead = (node) => {
    const transformedNode = transformer(node);
    isTHead = false;
    return transformedNode;
};

const transformer = (node) => {
    if (node === null) return null;

    if (Array.isArray(node)) {
        return node.map(transformer);
    }

    const transformedChildren =
        node.type === "table"
            ? transformer(node.children.slice(1))
            : transformer(node.children);

    const callMap = {
        root: () => ["article"].concat(transformedChildren),
        heading: (node) => [`h${node.depth}`].concat(transformedChildren),
        text: (node) => node.value,
        list: (node) =>
            [node.ordered ? "ol" : "ul"].concat(transformedChildren),
        listItem: () => ["li"].concat(transformedChildren),
        paragraph: () => ["p"].concat(transformedChildren),
        link: (node) =>
            [
                "a",
                {
                    title: node.title,
                    href: node.url,
                },
            ].concat(transformedChildren),
        image: (node) => [
            "img",
            {
                title: node.title,
                src: node.url,
                alt: node.alt,
            },
        ],
        table: (node) => [
            "table",
            ["thead", transformTHead(node.children[0])],
            ["tbody"].concat(transformedChildren),
        ],
        tableRow: () => ["tr"].concat(transformedChildren),
        tableCell: () => [isTHead ? "th" : "td"].concat(transformedChildren),
        emphasis: () => ["em"].concat(transformedChildren),
        strong: () => ["strong"].concat(transformedChildren),
        inlineCode: (node) => ["code", node.value],
        code: (node) => ["pre", { lang: node.lang }, ["code", node.value]],
        blockquote: () => ["blockquote"].concat(transformedChildren),
        break: () => ["br"],
        thematicBreak: () => ["hr"],
        html: (node) => JsonML.fromHTMLText(node.value),
        linkReference: () => ["span"].concat(transformedChildren),
    };

    if (callMap[node.type]) {
        return callMap[node.type](node);
    } else {
        return node;
    }
};

export default transformer;
