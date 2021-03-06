// Dependencies
import express from 'express';
import { celebrate, Joi } from 'celebrate';
import competitionsService from '../../service/competitions';
import ValidationError from '../../middleware/errors';

const router = express.Router();

// Celebrate add competition input validation
const competitionValidator = celebrate({

    body: Joi.object().keys({
        name: Joi.string().required().error(new ValidationError('NameEmpty'))
    })

});

// @route   GET api/competitions
// @desc    Get all competitions
// @access  Private
router.get('/', async (req, res) => {

    res.json(await competitionsService.getAllCompetitions());

});

// @route   POST api/competitions
// @desc    Add a new competition
// @access  Private
router.post('/', competitionValidator, async (req, res, next) => {

    try {

        res.json(await (competitionsService.addCompetition(req.body)));

    } catch (err) {

        next(err);

    }
});

// @route   GET api/competitions/:_id
// @desc    Get selected competition
// @access  Private
router.get('/:_id', async (req, res) => {

    res.json(await (competitionsService.getSelectedCompetition(req.params._id)));

});

// @route   DELETE api/competitions/:_id
// @desc    Delete a competition
// @access  Private
router.delete('/:_id', async (req, res) => {

    res.json(await (competitionsService.deleteCompetition(req.params._id)));

});

export default router;
