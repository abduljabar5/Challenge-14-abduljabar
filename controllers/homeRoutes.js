const router = require('express').Router();
const { json } = require('body-parser');
const { title } = require('process');
const {Blog , User, Comment} = require('../models');
const withAuth = require('../utils/auth');


router.get ('/', async (req, res) => {
    try{
        const BlogData = await Blog.findAll({
          include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      })
        const blogs = BlogData.map((blog) => blog.get({ plain: true }));

        // Pass serialized data and session flag into template
        // res.status(200).json(BlogData);
        res.render('homepage', { 
          blogs, 
          logged_in: req.session.logged_in 
        });

     } catch (err) {
        res.status(500).json(err);
      }
});

router.get('/blog/:id', async (req, res) => {
    try {
      const blogData = await Blog.findByPk(req.params.id, {
        include: [
          {
            model: Comment ,include:[ {model: User,
              attributes: ['username'],}]
          },
          {model: User,
            attributes: ['username'],},
        ],
      });
  console.log(User);
      const blog = blogData.get({ plain: true });
      // res.status(200).json(blog);
      res.render('blog', {
        ...blog,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.get('/blogupdate/:id', async (req, res) => {
    try {
      const blogData = await Blog.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['email'],
          },
        ],
      });
  console.log(User);
      const blog = blogData.get({ plain: true });
  
      res.render('updateblog', {
        ...blog,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });
  router.get('/profile', async (req, res) => {
    if (!req.session.logged_in) {
                res.redirect('/login');
                return;
              }
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Blog }],
      });
//   console.log(req.session.user_id);
      const user = userData.get({ plain: true });
  console.log(user);
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
//   router.get('/profile', (req, res) => {
//     // If the user is already logged in, redirect the request to another route
//     if (!req.session.logged_in) {
//         res.redirect('/login');
//         return;
//       }
//       res.render('profile', { 
     
//         logged_in: req.session.logged_in 
//       });
//   });
  
module.exports = router;