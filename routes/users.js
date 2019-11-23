//getuserbyid
//removeuserbyid
//add new user
//edit existing user
const mongoose = require('mongoose');
const User = mongoose.model('User');//Uppercase name and lowercase 'model'

function usersRoutes(app) {
    app
        .get('/api/users', (req, res) => {
        User
        // db.collection('users')
            .find({})
            // .toArray()
            .then(list => res.json(list).end())
    })
        .post('/api/users',(req,res) => {
            const user = new User(req.body);
            user.save()
                .then(user => res.json(user).end())
                .catch(err => res.status(400).json(err).end())

        })
        .delete('/api/users/:userId',(req,res) => {
            User.findById(req.params.userId)
                .then(user => user.remove())
                .then((user) => res.json(user).end())
                .catch(() => res.status(400).json({message:"User Not present"}).end())


        })
        .put('/api/users/:userId',(req,res) => {
            User.findById(req.params.userId)
                .then(user => Object.assign(user, req.body))
                .then(user => user.save())
                .then((user) => res.json(user).end())
                .catch(err => {
                    console.log(err)
                    res.status(400).json({message:"Failed to update user"}).end()
                })
        })
}

module.exports = usersRoutes;