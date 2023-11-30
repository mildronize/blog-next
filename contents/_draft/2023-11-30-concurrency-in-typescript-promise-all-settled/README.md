---
title: เขียน Concurrency ใน TypeScript ด้วย Promise.allSettled
uuid: ko0ecz1
tags:
  - Concurrency
  - TypeScript
  - Node.js
---

ตัวอย่างการใช้ `Promise.allSettled` จะทำให้แต่ละ Promise ที่รันพร้อมๆ กันอยู่สามารถทำงานจนจบทั้งหมด ถึงแม้ว่าจะมีบางตัวทำงานไม่สำเร็จก็ตาม


```typescript

async function main() {
  
  const promises: Promise<number>[] = [];
  for (let i = 0; i < 5; i++) {
    promises.push(longRunningTask(i + 1, 1, 5));
  }
  const results = await Promise.allSettled(promises);
  console.log("--------------------------------------------------");
  console.log("All tasks finished");
  let i = 0;
  for (const result of results) {
    if (result.status === "fulfilled") {
      console.log(`Task ${i + 1} took ${result.value / 1000} seconds`);
    } else {
      console.log(`Task ${i + 1} failed with error: ${result.reason}`);
    }
    i++;
  }
}

main();
```

ถ้าสังเกตุ `Promise.allSettled` จะ Return ออกมาเป็น `PromiseSettledResult<T>[]` ซึ่ง T จะขึ้นอยู่กับ Return Type ของ Promise ที่ส่งเข้าไปทำงาน

```typescript
const results = await Promise.allSettled(promises);
// PromiseSettledResult<number>[]
```

```typescript
interface PromiseFulfilledResult<T> {
    status: "fulfilled";
    value: T;
}

interface PromiseRejectedResult {
    status: "rejected";
    reason: any;
}

type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;
```

[Ref Image from Stackoverflow](https://stackoverflow.com/questions/4844637/what-is-the-difference-between-concurrency-parallelism-and-asynchronous-methods)

## ตัวอย่างการจำลองฟังก์ชั่นที่รันนาน


นี่เป็นตัวอย่างจำลองสร้าง Function ที่รันทำงานนาน โดยมีการจำลองเวลาที่ทำงานและ
จำลองการทำงาน Success และ Fail โดย Resolve และ Reject callback ของ Promise

```typescript
function longRunningTask(
  taskId: number,
  minDurationSec: number,
  maxDurationSec: number
): Promise<number> {
  const minDuration = minDurationSec * 1000;
  const maxDuration = maxDurationSec * 1000;
  const delay =
    Math.ceil(
      (Math.floor(Math.random() * (maxDuration - minDuration + 1)) +
        minDuration) /
        1000
    ) * 1000;
  console.log(`Task ${taskId} started, will take ${delay / 1000} seconds`);
  let currentTime = 0;
  const interval = setInterval(() => {
    currentTime += 1000;
    console.log(
      `Task ${taskId} in progress, current time: ${currentTime / 1000} seconds`
    );
  }, 1000);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      clearInterval(interval);
      if (Math.random() < 0.5) {
        console.log(`Task ${taskId} failed`);
        reject(`Task ${taskId} failed`);
      } else {
        console.log(`Task ${taskId} finished`);
        resolve(delay);
      }
    }, delay);
  });
}
```
