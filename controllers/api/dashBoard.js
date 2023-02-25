const router = require('express').Router();
const {Blog, Comment} = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
    try{
        const newBlog = await Blog. create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlog);
    }catch (err){
        res.status(400).json(err);
    }
});
router.post('/comment', async (req, res) => {
    try{
        const newComment = await Comment. create({
            ...req.body,
            user_id: req.session.user_id,
        });
        console.log(newComment);
        res.status(200).json(newComment);
    }catch (err){
        res.status(400).json(err);
    }
});
router.get ('/comment', async (req, res) => {
    try{
        const CommentData = await Comment.findAll()
        const comment = CommentData.map((comment) => comment.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.status(200).json(comment);

     } catch (err) {
        res.status(500).json(err);
      }
});
router.delete('/:id', withAuth, async(req, res) => {
    try{
        const blogData = await Blog.destroy({
            where:{
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!blogData){
            res.status(404).json({message: 'No project found with this id!'})
            return;
        }
        res.status(200).json(blogData);
    }catch (err){
        res.status(200).json(err);
    }
})
// router.put('/blog/:id', async(req, res) => {
//     try{
//         const blogData = await Blog.update( req.body,{
//             where:{
//                 id: req.params.id,
//                 user_id: req.session.user_id,
//             },
//         });
//         console.log(blogData);
//         if (!blogData){
//             res.status(404).json({message: 'No project found with this id!'})
//             return;
//         }
//         res.status(200).json(blogData);
//     }catch (err){
//         res.status(200).json(err);
//     }
// })
router.put('/blog/:id',async (req, res) => {
    // update a category by its `id` value
    try {
      const blogData = await Blog.update(req.body,{
        where: {
          id: req.params.id
        }
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;