//getPostbyid
//removePostbyid
//add new Post
//edit existing Post
const mongoose = require('mongoose');
const Post = mongoose.model('Post');//Uppercase name and lowercase 'model'
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/');
    },
    filename: function (req, file, cb) {
        const nameArr = file.originalname.split('.');
        const extension = nameArr[nameArr.length - 1];
        const randomName = Math.random().toString(36).substring(7);
        cb(null, randomName + '.' + extension);
    }
});
const upload = multer({ storage: storage });


function postsRoutes(app) {
    app
        .get('/api/posts', (req, res) => {
            Post
            // db.collection('posts')
                .find({})
                // .toArray()
                .sort('-created') //sort posts in order from new post to old post
                .limit(Number(req.query.limit || 20))
                .offset(Number(req.query.offset || 0))
                .then(list => res.json(list).end())
        })
        .post('/api/posts', upload.single('image'),(req,res) => {
            const post = new Post(req.body);
            post.user = mongoose.Types.ObjectId(1);
            post.image = req.file.filename;
            post.save()
                .then(post => res.json(post).end())
                .catch(err => res.status(400).json(err).end())
        })

        .get('/api/posts/:postId',(req,res) => {
            Post.findById(req.params.postId)
                .select("name username birthDate gender githublink about created")
                .then((post) => res.json(post).end())
                .catch(() => res.status(400).json({message:"Post Not present"}).end())


        }) //Get post by Id
        .post('/api/posts',(req,res) => {
            const post = new Post(req.body);
            post.save()
                .then(post => res.json(post).end())
                .catch(err => res.status(400).json(err).end())

        })
        .delete('/api/posts/:postId',(req,res) => {
            Post.findById(req.params.postId)
                .then(post => post.remove())
                .then((post) => res.json(post).end())
                .catch(() => res.status(400).json({message:"Post Not present"}).end())


        })
        .put('/api/posts/:postId',(req,res) => {
            Post.findById(req.params.postId)
                .then(post => Object.assign(post, req.body))
                .then(post => post.save())
                .then((post) => res.json(post).end())
                .catch(err => {
                    console.log(err)
                    res.status(400).json({message:"Failed to update post"}).end()
                })
        })
}

module.exports = postsRoutes;