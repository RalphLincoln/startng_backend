const express = require('express');
const mongoose = require('mongoose');


const router = express.Router();



const Faq = require('../models/faq_model');




// THIS IS TO GET THE LIST FAQS
router.get('/', (req, res, next) => {
    Faq.find()
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

// THIS IS FOR CREATING FAQS
router.post('/', (req, res, next) => {
    const faq = new Faq({
        _id: new mongoose.Types.ObjectId(),
        question: req.body.question,
        answer: req.body.answer
    });
    faq.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: 'You have successfully created a course....',
            faq: faq
        });
    })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
});

// GET A PARTICULAR QUESTION
router.get('/:faqId', (req, res, next) => {
    const id = req.params.faqId;
    Faq.findById(id)
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




// UPDATES THE FAQ
router.patch('/:faqId', (req, res, next) => {
    const id = req.params.faqId;
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Faq.update({ _id: id }, { $set: updateOps })
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
router.delete('/:faqId', (req, res, next) => {
    const id = req.params.faqId;
    Faq.deleteOne({ _id: id })
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
