import * as dynamoose from "dynamoose";

const Schema = new dynamoose.Schema({
  uuid: String,
  title: String,
  isComplete: Boolean,
});

export default dynamoose.model("Task", Schema);
