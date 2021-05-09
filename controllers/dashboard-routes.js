const { Post, User } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
        order: [["date_time", "ASC"]],
        attributes: [
            'id',
            'title',
            'content',
            'date_time',
            'user_id',
            'created_at'
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true})); 
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findByPk(req.params.id, {
        attributes: [
            'id',
            'title',
            'content',
            'date_time',
            'user_id',
            'created_at'
        ],
    })
    .then(dbPostData => {
        if (dbPostData) {
            const post = dbPostData.get({ plain: true });

            res.render('edit-post', {
                post,
                loggedIn: true
            });
        } else {
            res.status(404).end();
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;