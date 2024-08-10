require("dotenv").config();
const Technology = require("../model/technology");

const TechnologyController = async (req, res) => {
    try {
        const { LanguagesLogo, LanguagesName, Experience, Openings, Qualification } = req.body;
        const newTechnology = new Technology({ LanguagesLogo, LanguagesName, Experience, Openings, Qualification });
        await newTechnology.save();

        return res.status(201).send({
            message: "Technology added successfully",
            data: newTechnology,
            success: true,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Error processing request",
            success: false,
        });
    }
};

const TechnologygetController = async (req, res) => {
    try {
        const technologies = await Technology.find({});
        return res.status(200).send({
            message: "Technologies retrieved successfully",
            data: technologies,
            success: true,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Error retrieving technologies",
            success: false,
        });
    }
};

const TechnologyDeleteController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTechnology = await Technology.findByIdAndDelete(id);

        if (!deletedTechnology) {
            return res.status(404).send({
                message: "Technology not found",
                success: false,
            });
        }

        return res.status(200).send({
            message: "Technology deleted successfully",
            data: deletedTechnology,
            success: true,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Error deleting Technology",
            success: false,
        });
    }
};
module.exports = { TechnologyController, TechnologygetController ,TechnologyDeleteController};
