//getuserbyid
//removeuserbyid
//add new user
//edit existing user
const mongoose = require('mongoose');
const User = mongoose.model('User');//Uppercase name and lowercase 'model'
const jwt = require('jsonwebtoken');

function usersRoutes(app) {
    app
        .get('/api/users', (req, res) => {
        User
        // db.collection('users')
            .find({})
            // .toArray()
            .then(list => res.json(list).end())
    })
        .get('/api/users/:userId',(req,res) => {
            User.findById(req.params.userId)
                .select("name username birthDate gender githublink about created")
                .then((user) => res.json(user).end())
                .catch(() => res.status(400).json({message:"User Not present"}).end())


        }) //Get user by Id
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
                        exp:60 * 60 * 24 * 7,
                        data:user._id
                    },'123sdfs786d7f6s8');
                    res.cookie('user',token)
                    res.json({token});
                })
                .catch(() => res.status(400).end());
        })
}

module.exports = usersRoutes;