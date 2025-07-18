# merge-regex

A lightweight utility to merge multiple regular expressions into a single composite regex, with support for pattern deduplication, anchor preservation, global anchors, and configurable output.

---

## 📦 Installation

```bash
npm install merge-regex
```

---

## 🚀 Usage

```typescript
import { mergeRegex } from "merge-regex";

const regex = mergeRegex([/^foo$/, /^bar$/]);
console.log(regex);
// Output: /(?:^foo$|^bar$)/
```

---

## 🛠️ API

### `mergeRegex(patterns: RegExp[], options?: MergeRegexOptions): RegExp`

Merge multiple regex patterns into a single composite regex.

#### Parameters

| Name     | Type                | Default  | Description                           |
| -------- | ------------------- | -------- | ------------------------------------- |
| patterns | `RegExp[]`          | Required | List of regular expressions to merge. |
| options  | `MergeRegexOptions` | `{}`     | Optional configuration object.        |

---

### MergeRegexOptions

| Option                  | Type    | Default | Description                                                                              |
| ----------------------- | ------- | ------- | ---------------------------------------------------------------------------------------- |
| `preserveAnchors`       | boolean | `true`  | If true, keeps `^` and `$` within each branch. If false, removes anchors before merging. |
| `mergeAnchors`          | boolean | `false` | If true (and `preserveAnchors` is false), lifts common anchors to the entire pattern.    |
| `deduplicate`           | boolean | `true`  | If true, removes duplicate regex patterns.                                               |
| `wrapNonCapturingGroup` | boolean | `false` | If true, always wraps the result in a non-capturing group, even for a single pattern.    |

---

## 📋 Examples

### Preserve Anchors (default)

```typescript
mergeRegex([/^foo$/, /^bar$/]);
// Output: /(?:^foo$|^bar$)/
```

### Remove Anchors & Merge Globally

```typescript
mergeRegex([/^foo$/, /^bar$/], {
  preserveAnchors: false,
  mergeAnchors: true,
});
// Output: /^(?:foo|bar)$/
```

### No Deduplication

```typescript
mergeRegex([/foo/, /foo/], { deduplicate: false });
// Output: /(?:foo|foo)/
```

---

## 📖 License

MIT
