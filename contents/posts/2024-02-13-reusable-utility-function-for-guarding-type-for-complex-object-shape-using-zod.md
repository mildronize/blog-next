---
title: Reusable utility function for guarding type for complex object shape using Zod
uuid: cg05r7u
tags:
  - TypeScript
  - Zod
---

Hey there, fellow programmers!

Are you looking to level up your TypeScript skills? Dive into this blog where we explore a powerful technique for type guarding complex object shapes using [Zod](https://zod.dev/). Whether you're a seasoned developer or just getting started with TypeScript, this article will provide valuable insights into narrowing types and leveraging utility functions for efficient code validation. Let's embark on this journey together!

Before delving into the details, let's understand the concept of narrowing types in TypeScript. Narrowing type refers to the process of refining the possible types of a value, enabling us to handle objects correctly.


## Narrowing Unknown Types
In TypeScript, we often encounter scenarios where we need to validate unknown values against complex object shapes. This process, known as narrowing types, ensures that we handle object types accurately. Let's consider an example to understand this concept better, [code from mariusschulz.com](https://mariusschulz.com/blog/the-unknown-type-in-typescript).

```typescript
/**
 * A custom type guard function that determines whether
 * `value` is an array that only contains numbers.
 */``
function isNumberArray(value: unknown): value is number[] {
  return (
    Array.isArray(value) && value.every(element => typeof element === "number")
  );
}

const unknownValue: unknown = [15, 23, 8, 4, 42, 16];

if (isNumberArray(unknownValue)) {
  // Within this branch, `unknownValue` has type `number[]`,
  // so we can spread the numbers as arguments to `Math.max`
  const max = Math.max(...unknownValue);
  console.log(max);
}
```

Validating complex object shapes can be challenging with traditional type guards. Therefore, let's explore using Zod for type guarding complex objects.

Now, let's narrow down and validate a Record Type using the Zod data validation library.

```typescript
import { z } from 'zod';

function isRecord(object: unknown): object is Record<string, unknown> {
  const recordSchema = z.record(z.unknown());
  return recordSchema.safeParse(object).success;
}

function findLength(object: unknown): number {
  if (isRecord(object)) {
    return Object.keys(object).length;
  }
  throw new Error(`Input object doesn't support type`);
}
```
 
However, writing custom functions everywhere for such validations can lead to code duplication. Thus, we can create a utility function to streamline the process.

While exploring utility functions, I came across a reusable utility function for guarding types for complex object shapes using Zod, shared by [ecyrbedev](https://twitter.com/ecyrbedev/status/1757318655799414830).

For instance, let's say we want to guard the type of a value that is an array of non-empty File Object using Zod:

```typescript
import { z } from 'zod';

const is = <T extends z.ZodType>(value: unknown, schema: T): value is z.output<T> => {
    return schema.safeParse(value).success;
}

const test:unknown = [];
if(is(test,z.array(z.instanceof(File)).nonempty())) {
    test
    //^? const test: [File, ...File[]]
}
```

Playground: <https://tsplay.dev/wRepEW>

## Summary
In this blog post, we've explored the concept of narrowing types in TypeScript and how it enables us to validate unknown values against complex object shapes. We've also seen how Zod, a powerful data validation library, can streamline the process of type guarding. By leveraging reusable utility functions, we can write cleaner and more efficient code, reducing the risk of errors and enhancing code maintainability.

## Wrapping Up
We hope you found this blog post insightful and informative! Keep exploring, experimenting, and leveling up your TypeScript skills. If you have any questions or feedback, feel free to reach out. Happy coding!

Until next time,
Thada

## Reference
- Example Code from: https://typescript-th.thadaw.com/docs/basic/narrowing-type
- Original Code from [ecyrbedev](https://twitter.com/ecyrbedev): https://twitter.com/ecyrbedev/status/1757318655799414830
