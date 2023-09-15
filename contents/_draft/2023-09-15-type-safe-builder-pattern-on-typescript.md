---
title: Type-Safe Builder Pattern on TypeScript
---

Listen from TypeScript Meetup

```typescript
class Inventory<Items extends Record<string, unknown> = {}> {

    items: Items = {} as Items;

    add<NewItem extends Record<string, unknown>>(value: NewItem) {
        this.items = {
            ...value as unknown as Items
        }
        return this as Inventory<Items & NewItem>;
    }
}

const inventory = new Inventory()
    .add({
        hello: 'world',
    }).add({
        typescript: 5.1,
        numbers: [23, '123']
    });

console.log(inventory.items.typescript)


type A = typeof inventory.items;
//   ^? type A = {
//     hello: string;
// } & {
//     typescript: number;
//     numbers: (string | number)[];
// }
```