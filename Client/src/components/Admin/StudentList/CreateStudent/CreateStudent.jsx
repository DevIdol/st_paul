import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStudent } from "../../../../Redux/Student/StudentSice";
import StudentForm from "./StudentForm";
import { useNavigate } from "react-router-dom";

const CreateStudent = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    name: "",
    studentNo: "",
    grade: "",
    gender: "",
    academicYear: "",
    fatherName: "",
    motherName: "",
    phNo: "",
    address: "",
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.students);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      name: studentData.name,
      studentNo: studentData.studentNo,
      grade: studentData.grade,
      gender: studentData.gender,
      academicYear: studentData.academicYear,
      parentInfo: {
        fatherName: studentData.fatherName,
        motherName: studentData.motherName,
        phNo: studentData.phNo,
        address: studentData.address,
      },
    };
    dispatch(createStudent(newStudent));
    if (Object.values(newStudent).some((value) => value !== "")) {
      navigate(`/admin/students?grade=${newStudent.grade}`);
    } else {
      navigate(-1);
    }
    setStudentData({
      name: "",
      studentNo: "",
      grade: "",
      gender: "",
      academicYear: "",
      fatherName: "",
      motherName: "",
      phNo: "",
      address: "",
    });
  };

  return (
    <StudentForm
      title="Add New Student"
      loading={loading}
      value={studentData}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateStudent;
