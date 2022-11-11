import notesModel from "../model/myNotesSchema.js";
import * as validator from "../utilities/validator.js";

const myNotesController = {
  async getNotes(req, res) {
    try {
      const arrOfNotes = await notesModel.find({}, { _id: 0, _v: 0 });
      if (arrOfNotes.length > 0) {
        res.status(200).json({
          status: 200,
          length: arrOfNotes.length,
          data: arrOfNotes,
        });
      } else {
        res.status(400).json({
          status: 400,
          data: {
            message: "No notes found",
          },
        });
      }
    } catch (err) {
      res.status(404).json({
        status: 404,
        data: err,
      });
    }
  },

  async getNotesById(req, res) {
    try {
      const notes = await notesModel.findOne({
        notesID: req.params.id,
      });
      if (notes) {
        res.status(200).json({
          status: 200,
          data: notes,
        });
      } else {
        res.status(400).json({
          status: 400,
          data: {
            message: "Unable to find the note with notes Id " + req.params.id,
          },
        });
      }
    } catch (err) {
      res.status(404).json({
        status: 404,
        data: err,
      });
    }
  },
  async newNotes(req, res) {
    console.log(typeof req.body);
    if (Object.keys(req.body).length == 0) {
      res.status(400).json({
        status: 400,
        message: "Missing parameter",
      });
      return;
    }
    if (!validator.validateName(req.body.name)) {
      res.status(400).json({
        status: 400,
        message: "Invalid Name",
      });
    }
    try {
      const newNotes = await notesModel.create(req.body);
      console.log(newNotes);
      res.status(201).json({
        status: 200,
        data: { message: "Created successfully", newNotes },
      });
    } catch (err) {
      res.status(404).json({
        status: 404,
        data: err,
      });
    }
  },
  async updateNotes(req, res) {
    let param = "notesID";
    if (typeof req.params.id != "number") {
      param = "name";
    }
    try {
      const updateNote = await notesModel.findOneAndUpdate(
        { [param]: req.params.id },
        req.body,
        {
          new: true, //to return new doc back
          runValidators: true, //to run the validators which specified in the model
        }
      );
      if (updateNote != null) {
        res.status(200).json({
          status: 200,
          data: { message: "Updated successfully", updateNote },
        });
      } else {
        res.status(400).json({
          status: 400,
          data: {
            message: `Update unsuccessfull. No notes available for id ${req.params.id}`,
          },
        });
      }
    } catch (err) {
      res.status(404).json({
        status: 404,
        data: err,
      });
    }
  },
  async deleteNote(req, res) {
    let param = "notesID";
    if (typeof req.params.id != "number") {
      param = "name";
    }
    const delDet = await notesModel.deleteOne({ [param]: req.params.id });
    if (delDet.deletedCount === 0) {
      res.status(400).json({
        status: 400,
        data: { message: "No notes available for this ID" },
      });
    } else {
      res.status(200).json({
        status: 200,
        data: { message: `Notes with ${req.params.id} ID deleted` },
      });
    }
  },
  invalid(req, res) {
    res.status(404).json({
      status: 400,
      data: "Invalid path",
    });
  },
};

export default myNotesController;
