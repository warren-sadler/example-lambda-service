import * as dynamoose from "dynamoose";

const Schema = new dynamoose.Schema({
  uuid: String,
  title: String,
  isComplete: Boolean,
});
// the Name property is required by dynamoose and should be the same name of your dynamo table
export default dynamoose.model("Task", Schema);
