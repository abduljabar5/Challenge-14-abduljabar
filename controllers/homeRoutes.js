const router = require('express').Router();
const { json } = require('body-parser');
const {Blog , User} = require('../models');
const withAuth = require('../utils/auth');


router.get ('/', async (req, res) => {
    try{
        const BlogData = await Blog.findAll()
        const blogs = BlogData.map((blog) => blog.get({ plain: true }));

        // Pass serialized data and session flag into template
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
            model: User,
            attributes: ['email'],
          },
        ],
      });
  
      const blog = blogData.get({ plain: true });
  
      res.render('blog', {
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
  router.get('/profile', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
      }
      res.render('profile', { 
     
        logged_in: req.session.logged_in 
      });
  });
  
module.exports = router;