import mongoose from "mongoose";
import Issue from "../models/Issue.js";

function throwServerError(response, error) {
  response.status(500).json({ error: "Internal server errror" });
  console.error(error);
}

async function CreateAnIssue(request, response) {
  const { department, room_number, serial_number, description, phone_number } =
    request.body;
  try {
    const issue = await Issue.create({
      department,
      room_number,
      serial_number,
      description,
      phone_number,
    });
    response.status(200).json(issue);
  } catch (error) {
    throwServerError(response, error);
  }
}

async function getAllIssues(_, response) {
  try {
    const issues = await Issue.find({});
    response.status(200).json(issues);
  } catch (error) {
    throwServerError(response, error);
  }
}

async function getAnIssue(request, response) {
  const { id } = request.params;
  try {
    if (!mongoose.isValidObjectId(id))
      return response.status(400).json({ error: "Invalid object id" });
    const issue = await Issue.findById(id);
    response.status(200).json(issue);
  } catch (error) {
    throwServerError(response, error);
  }
}

async function updateAnIssue(request, response) {
  const { id } = request.params;
  try {
    if (!mongoose.isValidObjectId(id))
      return response.status(400).json({ error: "Invalid object id" });
    const issue = await Issue.findByIdAndUpdate(id, { ...request.body });
    response.status(200).json(issue);
  } catch (error) {
    throwServerError(response, error);
  }
}

async function deleteAnIssue(request, response) {
  const { id } = request.params;
  try {
    if (!mongoose.isValidObjectId(id))
      return response.status(400).json({ error: "Invalid object id" });
    const issue = await Issue.findByIdAndDelete(id);
    response.status(200).json(issue);
  } catch (error) {
    throwServerError(response, error);
  }
}

export {
  getAllIssues,
  CreateAnIssue,
  getAnIssue,
  updateAnIssue,
  deleteAnIssue,
};
