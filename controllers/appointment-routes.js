const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        where: {
            // use session id
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'content',
            'date_time'
        ]
    })
    .then(dbPostData => {
        // serialize data before passing into template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('appointment', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;