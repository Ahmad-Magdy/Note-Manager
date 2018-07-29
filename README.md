# Note Manager
Is a simple app to manage notes and it's just a show-case of using [Koa](https://koajs.com/) framework.
## App parts:
* Restful API: a couple of endpoints to manage the notes.
* Job Runner: runs every 5 minutes to check if the scheduled note time comes or not to inform the user.

## How to run:
* to run the API you can use:
`npm run start`
* to run the job runner:
`npm run job`

### Note Model:
* content: string, required.
* attachedFiles: string[].
* scheduleTime: Date, default current Date.
* state: number, default 1 and it can be between 1 and 4 . **1** scheduled, **2** reminder sent, **3** seen , **4** done.
## API endpoints:
#### /notes, **GET**:
retrive all notes from server and the expected response will contain array of Note type with 200 status.
Example:
```json
[
    {
        "attachedFiles": [
            "Root\\uploads\\upload_bcca99b3f163773d888f3d422efbdc38.jpg"
        ],
        "scheduleTime": "2018-07-28T21:17:16.330Z",
        "state": 1,
        "_id": "5b5cdd7e77e50847c4b55b85",
        "content": "Eat Food",
        "__v": 0
    }
]
```
#### /notes, **POST**:
to post a new note with attached files,
the expected input should be like Note Model in addition to attachedFiles of file type, and you should use *form-data* 
expected output should be like this with 201 status
```json
{ "success": true }
```

#### /notes/scheduled, **GET**:
to get all of the scheduled notes,
Example:
```json
[
    {
        "attachedFiles": [
            "Root\\uploads\\upload_bcca99b3f163773d888f3d422efbdc38.jpg"
        ],
        "scheduleTime": "2018-07-28T21:17:16.330Z",
        "state": 1,
        "_id": "5b5cdd7e77e50847c4b55b85",
        "content": "Eat Food",
        "__v": 0
    }
]
```

#### /notes/search, **GET**:
to search in the content of all notes, with **content** query string required.
Request Example:
`/notes/search?content= my content`
and the output will be array of Note.

#### /notes/:id, **GET**:
to get note details.
Note will be marked as seen if it contains query param of seen, 
for example:
`/nots/1234?seen=1`
the state will be tunred to 3
but if you requested `/nots/1234` will be without any changes to the note.

#### /notes/:id, **PUT**:
to update note details and it expects note type as an input.
and it returns the new version of the note.

#### /notes/:id, **DELETE**:
to delete single note.

#### /notes/:id/done, **POST**:
to mark note as done/completed.
