var $8zHUo$remark = require("remark");
var $8zHUo$yamlfrontmatter = require("yaml-front-matter");
var $8zHUo$jsonmljs = require("jsonml.js");


function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $5c3e33fe847eddda$export$2e2bcd8739ae039);



let $e80135766acd43a6$var$isTHead = false;
const $e80135766acd43a6$var$transformTHead = (node)=>{
    const transformedNode = $e80135766acd43a6$var$transformer(node);
    $e80135766acd43a6$var$isTHead = false;
    return transformedNode;
};
const $e80135766acd43a6$var$transformer = (node)=>{
    if (node === null) return null;
    if (Array.isArray(node)) return node.map($e80135766acd43a6$var$transformer);
    const transformedChildren = node.type === "table" ? $e80135766acd43a6$var$transformer(node.children.slice(1)) : $e80135766acd43a6$var$transformer(node.children);
    const callMap = {
        root: ()=>[
                "article"
            ].concat(transformedChildren),
        heading: (node)=>[
                `h${node.depth}`
            ].concat(transformedChildren),
        text: (node)=>node.value,
        list: (node)=>[
                node.ordered ? "ol" : "ul"
            ].concat(transformedChildren),
        listItem: ()=>[
                "li"
            ].concat(transformedChildren),
        paragraph: ()=>[
                "p"
            ].concat(transformedChildren),
        link: (node)=>[
                "a",
                {
                    title: node.title,
                    href: node.url
                }
            ].concat(transformedChildren),
        image: (node)=>[
                "img",
                {
                    title: node.title,
                    src: node.url,
                    alt: node.alt
                }
            ],
        table: (node)=>[
                "table",
                [
                    "thead",
                    $e80135766acd43a6$var$transformTHead(node.children[0])
                ],
                [
                    "tbody"
                ].concat(transformedChildren)
            ],
        tableRow: ()=>[
                "tr"
            ].concat(transformedChildren),
        tableCell: ()=>[
                $e80135766acd43a6$var$isTHead ? "th" : "td"
            ].concat(transformedChildren),
        emphasis: ()=>[
                "em"
            ].concat(transformedChildren),
        strong: ()=>[
                "strong"
            ].concat(transformedChildren),
        inlineCode: (node)=>[
                "code",
                node.value
            ],
        code: (node)=>[
                "pre",
                {
                    lang: node.lang
                },
                [
                    "code",
                    node.value
                ]
            ],
        blockquote: ()=>[
                "blockquote"
            ].concat(transformedChildren),
        break: ()=>[
                "br"
            ],
        thematicBreak: ()=>[
                "hr"
            ],
        html: (node)=>(0, ($parcel$interopDefault($8zHUo$jsonmljs))).fromHTMLText(node.value),
        linkReference: ()=>[
                "span"
            ].concat(transformedChildren)
    };
    if (callMap[node.type]) return callMap[node.type](node);
    else return node;
};
var $e80135766acd43a6$export$2e2bcd8739ae039 = $e80135766acd43a6$var$transformer;


const $5c3e33fe847eddda$var$MT = (markdown)=>{
    const ret = {
        meta: {},
        content: {}
    };
    const raw = (0, ($parcel$interopDefault($8zHUo$yamlfrontmatter))).loadFront(markdown);
    const ast = (0, $8zHUo$remark.remark).parse(raw.__content);
    ret.content = (0, $e80135766acd43a6$export$2e2bcd8739ae039)(ast);
    delete raw.__content;
    ret.meta = raw;
};
var $5c3e33fe847eddda$export$2e2bcd8739ae039 = $5c3e33fe847eddda$var$MT;




//# sourceMappingURL=index.js.map
