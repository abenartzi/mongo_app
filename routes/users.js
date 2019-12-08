//getuserbyid
//removeuserbyid
//add new user
//edit existing user
const mongoose = require('mongoose');
const User = mongoose.model('User');//Uppercase name and lowercase 'model'
const jwt = require('jsonwebtoken');//
const {jwtSecret} = require('../config');
const authorize = require('../config/authorization');

function usersRoutes(app) {
    app
        .get('/api/users', (req, res) => {
        User
        // db.collection('users')
            .find({})
            // .toArray()
            .then(list => res.json(list).end())
    })
        .get('/api/users/me',authorize,(req,res) => {
            User.findById(req.user)
                .select('_id username name birthDate gender about created')
                .then(user => res.json(user));

        })
        .get('/api/users/:userId',(req,res) => {
            User.findById(req.params.userId)
                .select("name username birthDate gender githublink about created")
                .then((user) => res.json(user).end())
                .catch(() => res.status(400).json({message:"User Not present"}).end())


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
        //Login verification
        .post('/api/users/login',(req,res) => {
            User
                .findOne({
                    username:req.body.username,
                    password:req.body.password
                })
                .then(user => {
                    if (! user){
                        res.status(403).json({message:"User or password error"}).end();
                        return;
                    }
                    const token = jwt.sign({
                        data:user._id
                    },jwtSecret,{expiresIn: '7d'});
                    res.cookie('user',token);
                    res.json({token})
                })
                .catch(() => res.status(400).end());
        })

}

module.exports = usersRoutes;