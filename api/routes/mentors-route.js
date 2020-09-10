const express = require('express');
const mongoose = require('mongoose');


const Mentor = require('../models/mentors_model');


const router = express.Router();

// THIS IS TO GET THE LIST OF SAVED MENTORS
router.get('/', (req, res, next) => {
    Mentor.find()
        .exec()
        .then(doc => {
            console.log(doc)
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
});

// THIS IS TO CREATE/ADD MENTORS
router.post('/', (req, res, next) => {
    const mentor = new Mentor({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        role: req.body.role,
        description: req.body.description,
        facebook: req.body.facebook,
        twitter: req.body.twitter
    });
    mentor.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: 'You have successfully created a course....',
            mentor: mentor
        });
    })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
});

// THIS IS TO GET THE INFORMATION OF A PARTICULAR MENTOR
router.get('/:mentorId', (req, res, next) => {
    const id = req.params.mentorId;
    Mentor.findById(id)
        .exec()
        .then(doc => {
            console.log(doc)
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(500).json({ message: 'No valid entry found' });
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
});

// THIS IS TO UPDATE A MENTOR'S INFORMATION
router.patch('/:mentorId', (req, res, next) => {
    const id = req.params.mentorId;
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Mentor.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
});

// THIS IS TO DELETE A MENTOR
router.delete('/:mentorId', (req, res, next) => {
    const id = req.params.mentorId;
    Mentor.deleteOne({ _id: id })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        })
});

module.exports = router;