// var express = require('express');
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import myNotesController from "../controller/myNotesController.js";
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.send("Working");
});
/**
 * @swagger
 * /notes:
 *   get:
 *    summary: API TO FETCH ALL NOTES
 *    description: Retrieve list of notes present in the database.
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: No notes available
 */
router.get("/notes", myNotesController.getNotes);

/**
 * @swagger
 * /notes:
 *  post:
 *    summary: API TO CREATE NOTES.
 *    description: Creates a new notes in database.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              notesID:
 *                description: Id of the new Notes
 *                type: Number
 *                example: 124
 *              name:
 *                description: Name of te new Note
 *                type: String
 *                example: Madan
 *              data:
 *                description: Data of the notes
 *                type: String
 *                example: This is the data description
 *    responses:
 *      201:
 *        description: created
 *
 *
 */
router.post("/notes", myNotesController.newNotes);

/**
 * @swagger
 * /notes/:id:
 *  put:
 *    summary: API TO UPDATE THE NOTES
 *    description: Update the notes using notes id
 *    parameters:
 *    - in: path
 *      name: id
 *      description: id to update the record
 *      required: true
 *      type: Number|| String
 *      example: 23
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                description: Name of the notes
 *                required: true
 *                type: String
 *                example: Fai
 *              data:
 *                description: Valid updated data
 *                type: String
 *                example: I am the modified data
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: ID not found
 *
 *
 *
 */
router.put("/notes/:id", myNotesController.updateNotes);

/**
 * @swagger
 * /notes/:id:
 *  get:
 *    summary: API TO GET THE NOTE BY NOTES ID
 *    description: This api is used to fetch the particular notes by notesID
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: NotesID
 *      type: Number
 *      example: 23
 *    responses:
 *      200:
 *        description: Notes fetched successfully
 *      400:
 *        description: NO notes available for the notesID
 */
router.get("/notes/:id", myNotesController.getNotesById);

/**
 * @swagger
 * /notes/:id:
 *  delete:
 *    summary: Delete notes by id
 *    description: API to delete particular note by notesID
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      type: Number
 *      example: 23
 *      description: Notes Id to delete the particular note
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: Unable to find notesID
 *
 */
router.delete("/notes/:id", myNotesController.deleteNote);
router.all("*", myNotesController.invalid);

export default router;
