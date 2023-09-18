---
title: The exhaustive Pattern Matching without runtime overhead
tags:
    - TypeScript
    - Pattern Matching
---

In typeScript: [ts-pattern](https://github.com/gvergnaud/ts-pattern) --  The exhaustive Pattern Matching library for TypeScript, with smart type inference.

thanks twitter [@cpojer](https://twitter.com/cpojer) in [his post](https://twitter.com/cpojer/status/1703637840570323016)

```typescript
type Position = {x: number, y: number};
type Action = {
  from: Position,
  type: 'Move',
} | {
  type: 'Attack'
  to: Position;
};

const check = (action: Action) => {
  switch (action.type) {
    case 'Move':
      console.log(action.from);
      break;
    case 'Attack':
      console.log(action.to);
      break;
    default: {
      action satisfies never;
      throw new Error('Hi');
    }
  }
}

const checkInvalid = (action: Action) => {
  switch (action.type) {
    case 'Move':
      console.log(action.from);
      break;
    default: {
      action satisfies never;
      // TypeError: Type '{ type: "Attack"; to: Position; }' does not satisfy the expected type 'never'.(1360)
      throw new Error('Hi');
    }
  }
}
```

[playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBACg9gZwJbCXAdlAvFA3gDwC4p0BXAWwCMIAnAGihGLKtoF8BuAKFEigEEAxqgzY8XKFABmNOOWLxkI9HQlReEYgHIAsnABuELarZQAPuMkbt-YMACGggNZa1wOAsQo06bpy5cghgIwFCCABYQzmIAFI7KxELKAJTYAHyWUAgA7igRUHHCPgB0Gqm4apKC9gjQugZGhJWSYcFwADYQxe1wAOaFysUycsncLS2UNBD2TmMt1bVQWrYOzlpN41Vtnd19AyXuo82Sk9OzzQAmEFL2pO3AxBWbUPE+WfaoCFJIEAgkEIYaHNxsBwrJsv8IQBRGiyGgxLQACSQWiO4zYagxGMCwVCESiTgAkuh9PZ2kgLrFXhhEkUMKksBknllcsB8vsMKVwBBys0FnU9IZ1sdWugEB0uj1+tT0ENZOQ0ZtTjNgVArjc7g9MuMZe9Pt9fv9AaqrGC4BD0BBobC4PCkSjFZIMU6uGwgA)