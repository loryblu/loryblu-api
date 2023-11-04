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
| frequency  | string | sun,sat | `string` `default sun` `is not required`                   |
| page       | number | 1       | `integer` `is not required`                                |
| perPage    | number | 1       | `integer` `min 20` `max 70` `default 20` `is not required` |

```md
/task?`childrenId=1`&`day=sun,mon`
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
