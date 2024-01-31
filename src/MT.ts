import { remark } from "remark";
import YFM from "yaml-front-matter";
import transformer from "./transformer";

interface Return {
    meta: { [key: string]: string };
    content: object;
}

export type Node = ReturnType<typeof remark.parse>;

const MT = (markdown: string) => {
    const ret: Return = {
        meta: {},
        content: {},
    };

    const raw = YFM.loadFront(markdown);
    const ast: Node = remark.parse(raw.__content);
    ret.content = transformer(ast);

    delete raw.__content;
    ret.meta = raw;
};

export default MT;
