const express = require('express');
const mongoose = require('mongoose')


const router = express.Router();




// IMPORTING MODELS
const Course = require('../models/courses_model');


// THIS IS A GET REQUEST TO THE COURSES ROUTE
router.get('/', (req, res, next) => {
    Course.find()
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

// THIS IS A POST REQUEST TO THE COURSES ROUTE
router.post('/', (req, res, next) => {

    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        skills: req.body.skills,
        meant: req.body.meant
    });
    course.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: 'You have successfully created a course....',
            course: course
        });
    })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });

});

// THIS IS TO GET MORE INFORMATION ABOUT A MENTOR
router.get('/:courseId', (req, res, next) => {
    const id = req.params.courseId;
    Course.findById(id)
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


// THIS IS TO UPDATE A COURSE INFORMATION
router.patch('/:courseId', (req, res, next) => {
    const id = req.params.courseId;
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Course.update({ _id: id }, { $set: updateOps })
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


// THIS IS TO DELETE A COURSE
router.delete('/:courseId', (req, res, next) => {
    const id = req.params.courseId;
    Course.deleteOne({ _id: id })
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






module.exports = router