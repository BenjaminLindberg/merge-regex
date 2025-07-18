interface MergeRegexOptions {
    preserveAnchors?: boolean;
    mergeAnchors?: boolean;
    deduplicate?: boolean;
    wrapNonCapturingGroup?: boolean;
}
export declare const mergeRegex: (args: RegExp[], options?: MergeRegexOptions) => RegExp;
export {};
