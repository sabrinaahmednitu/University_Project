import { Request, Response } from "express";
import { StudentServices } from "./student.service";

//1. POST controller
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    //will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);
    //send post response
    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

//2. GET controller

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    //send get response
    res.status(200).json({
      success: true,
      message: "Students are retrieved successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

//3. GET single student by ID
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    //send single get response bt ID
    res.status(200).json({
      success: true,
      message: "single student is retrieved successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
