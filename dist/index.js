"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeRegex = void 0;
const mergeRegex = (args, options = {}) => {
    const { preserveAnchors = true, mergeAnchors = false, deduplicate = true, wrapNonCapturingGroup = false, } = options;
    if (!args.length)
        throw new Error("No regex expressions provided.");
    const flags = args[0].flags;
    const sources = [];
    let anchorStart = true;
    let anchorEnd = true;
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (!(arg instanceof RegExp)) {
            throw new Error(`Argument ${i} is not a RegExp`);
        }
        let source = arg.source;
        if (!preserveAnchors) {
            const startsWithAnchor = source.startsWith("^");
            const endsWithAnchor = /[^\\]\$$/.test(source);
            if (startsWithAnchor)
                source = source.slice(1);
            if (endsWithAnchor)
                source = source.replace(/\$$/, "");
            if (!startsWithAnchor)
                anchorStart = false;
            if (!endsWithAnchor)
                anchorEnd = false;
        }
        sources.push(source);
    }
    const uniqueSources = deduplicate ? [...new Set(sources)] : sources;
    let pattern = uniqueSources.join("|");
    if (uniqueSources.length > 1 || wrapNonCapturingGroup) {
        pattern = `(?:${pattern})`;
    }
    if (mergeAnchors && !preserveAnchors) {
        pattern = (anchorStart ? "^" : "") + pattern + (anchorEnd ? "$" : "");
    }
    return new RegExp(pattern, flags);
};
exports.mergeRegex = mergeRegex;
