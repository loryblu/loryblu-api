## Request header

| header        | value                  |
| ------------- | ---------------------- |
| Path          | `/task`                |
| Method        | `GET`                  |
| Authorization | "Bearer `accessToken`" |
| Content-Type  | `application/json`     |

## Query params

| property   | type   | example | validation                                                 |
| ---------- | ------ | ------- | ---------------------------------------------------------- |
| childrenId | number | 1       | `integer` `required`                                       |
| frequency  | string | sun,sat | `Array<string>` `required`                                 |
| page       | number | 1       | `integer` `min 1` `is not required`                        |
| perPage    | number | 1       | `integer` `min 20` `max 70` `default 20` `is not required` |

**Query exemple**

```md
/task?`childrenId=1`&`frequency=sun,mon`
```

## Response body

| property | type   | example                    |
| -------- | ------ | -------------------------- |
| data     | object | { [group]: `ListOfTasks` } |

```ts
type ListOfTasks = Array<{
  id: number;
  shift: string;
  frequency: Array<string>;
  order: number;
  categoryId: string;
  categoryTitle: string;
  updatedAt: Date;
}>;
```
