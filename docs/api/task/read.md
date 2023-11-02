## Request header

| header        | value                  |
| ------------- | ---------------------- |
| Path          | `/task`                |
| Method        | `GET`                  |
| Authorization | "Bearer `accessToken`" |
| Content-Type  | `application/json`     |

## Query params

| property   | type   | example | validation           |
| ---------- | ------ | ------- | -------------------- |
| childrenId | number | 1       | `integer` `required` |

## Response body

| property | type   | example                    |
| -------- | ------ | -------------------------- |
| data     | object | { [group]: `ListOfTasks` } |

```ts
type ListOfTasks = Array<{
  id: number;
  categoryId: string;
  shift: string;
  frequency: Array<string>;
  order: number;
  updatedAt: Date;
}>;
```
