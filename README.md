# Good-Service
Link -> [Links](https://goods-service.herokuapp.com/)
## Stack
- Node.js
- Firebaase
## API Document
**Auth Route**
| Path | Method | Access | Description |
| --------- | ---------- | --------- | ---------- |
|   /api/auth/signup   |   POST   |    Pubilc   |    Signup user   |
|   /api/auth/signin   |   POST   |    Pubilc   |    Signin user   |
|   /api/auth/upload   |   POST   |    Private   |    Upload image profile user   |

**Post Route**
| Path | Method | Access | Description |
| --------- | ---------- | --------- | ---------- |
|   /api/posts/   |   GET   |    Pubilc   |    Get post detail   |
|   /api/posts/   |   POST   |    Private   |    Create post    |
|   /api/posts/:id   |   GET   |    Pubilc   |    Get post detail by id   |
|   /api/posts/:id   |   PUT   |    Private   |    Update detail of post  |
|   /api/posts/:id   |   DELETE   |    Private   |    Delete post by id   |
|   /api/posts/user/:id   |   GET   |    Private   |    Get post detail by id user  |
