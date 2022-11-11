import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/MyIntellectNotes", {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successfull!!"))
  .catch((err) => console.log("DB Error", err));

const myNotesSchema = new mongoose.Schema(
  {
    notesID: {
      type: Number,
      required: [true, "required Field"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Required Field"],
    },
    data: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const notesModel = mongoose.model("mynotes", myNotesSchema);
export default notesModel;
