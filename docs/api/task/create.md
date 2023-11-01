## Request header

| header        | value                  |
| ------------- | ---------------------- |
| Authorization | "Bearer `accessToken`" |
| Content-Type  | `application/json`     |

## Request body

| property   | type                | example                                | validation                         |
| ---------- | ------------------- | -------------------------------------- | ---------------------------------- |
| childrenId | number              | 1                                      | `required`                         |
| categoryId | string              | "8c004aa0-961d-4ec4-b6fe-cb70cbc0c4c1" | `required`                         |
| shift      | string              | "afternoon"                            | `required`                         |
| frequency  | Array&lt;string&gt; | ["sun"]                                | `minSize 1` `maxSize 7` `required` |
| order      | number              | 0                                      | `default 0` `is not required`      |

shift: `morning`, `afternoon`, `night`
frequency: `sun`, `mon`, `tue`, `wed`, `thu`, `fri`, `sat`

## Response body

| property | type   | example                          |
| -------- | ------ | -------------------------------- |
| message  | string | "Nova tarefa criada com sucesso" |
