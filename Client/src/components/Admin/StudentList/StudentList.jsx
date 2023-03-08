import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../../../Redux/Student/StudentSice";
import { useLocation } from "react-router-dom";
import SideBarRight from "../../../View/SideBarRight";
import StudentTable from "./StudentTable";
import Loading from "../../Loading/Loading";

const StudentList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const grade = new URLSearchParams(location.search).get("grade");
  const { students, loading } = useSelector((state) => state.students);
  useEffect(() => {
    dispatch(getStudents(grade));
  }, [dispatch, grade]);
  console.log(students);

  return (
    <SideBarRight>
      {loading ? (
        <Loading />
      ) : (
        <StudentTable
          gradeNo={grade}
          grade={students}
          title={`Student List of Grade - ${grade}`}
          fileName="grade01"
        />
      )}
    </SideBarRight>
  );
};

export default StudentList;
