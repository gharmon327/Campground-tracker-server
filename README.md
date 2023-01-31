# Campground-tracker-server
- The Campground tracker is an app that is meant for new or existing campground owners to have a place to keep track of the status of their campground/campsites. 

## Technologies Used
- Javascript
- HTML
- CSS
- Bootstrap
- Node
- Express
- MongoDb
- Mongoose

## ERD
![Campground-ERD](image/Project%202%20ERD%20(5).png)

## Routes Table: ##

| Name        | Path                             |HTTP Verb    |Purpose                 |
| ----------- | -------------------------------- | ----------- | ---------------------- |
| Index       | /campgrounds/                    |GET          |Displays all campgrounds|
| Create      | /campgrounds/                    |POST         |Creates new campground  |
| Show        | /campgrounds/:Id                 |GET          |Displays one campground |
| Update      | /campgrounds/:Id                 |PATCH        |Upates one campground   |
| Delete      | /campgrounds/:Id                 |DELETE       |Deletes one campground  |
| Create      | /campsites/:Id                   |POST         |Creates new campsite    |
| Update      | /campsites/:id                   |DELETE       |updates one campsite    |
| Index       | /campsites/:Id                   |GET          |Displays all campsites  |
| SignUp      | /sign-up                         |POST         |Creates new login       |
| SignIn      | /sign-in                         |POST         |Logs user in            |
