import React, { Fragment } from "react";
import TableList from "../Table";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import DataNotFound from "../../NotFound/DataNotFound";
import DownloadPDF from "../Download/DownloadPDF";
import TabelHeader from "../TableHeader";
import { useDispatch, useSelector } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import { deleteStudent } from "../../../Redux/Student/StudentSice";
import { useState } from "react";
import { Modal } from "@mui/material";
import EditStudent from "./CreateStudent/EditStudent";
import styles from "./StudentTable.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const columns = [
  { id: "no", label: "No", minWidth: 20, align: "center" },
  { id: "name", label: "Name", minWidth: 180, align: "center" },
  { id: "number", label: "Student No", minWidth: 100, align: "center" },
  { id: "grade", label: "Grade", minWidth: 40, align: "center" },
  { id: "gender", label: "Gender", minWidth: 40, align: "center" },
  { id: "year", label: "Academic Year", minWidth: 60, align: "center" },
  { id: "mark", label: "Add Mark", minWidth: 80, align: "center" },
  { id: "edit", label: "Edit", minWidth: 60, align: "center" },
  { id: "removed", label: "delete", minWidth: 60, align: "center" },
];

const tableColums = [
  { title: "No", field: "id" },
  { title: "Name", field: "name" },
  { title: "Student No", field: "number" },
  { title: "Grade", field: "grade" },
  { title: "Gender", field: "gender" },
  { title: "Academic Year", field: "year" },
];

function createStudentData(
  no,
  name,
  number,
  grade,
  gender,
  year,
  mark,
  edit,
  removed
) {
  return {
    no,
    name,
    number,
    grade,
    gender,
    year,
    mark,
    edit,
    removed,
  };
}


const StudentTable = ({gradeNo, grade, title, fileName }) => {
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const handleEditClick = (id) => {
    setSelectedStudentId(id);
    setOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const deleteHandler = async (studentId, name) => {
    await confirm({
      title: `Are you sure to delete "${name}"?`,
      confirmationText: "Yes",
      cancellationText: "No",
    })
      .then(() => {
        dispatch(deleteStudent(studentId, gradeNo));
      })
      .catch(() => {});
  };
  let rows = grade.map((s, index) =>
    createStudentData(
      index + 1,
      s.name,
      s.studentNo,
      s.grade,
      s.gender,
      s.academicYear,
      <Link to={`/admin/marks/create/${s._id}`}>
        <AddCircleOutlineIcon style={{ color: "teal", fontWeight: 600 }} />
      </Link>,
      <Button onClick={() => handleEditClick(s._id)}>Edit</Button>,
      <Button
        type="button"
        style={{ cursor: "pointer", color: "tomato", fontWeight: 600 }}
        onClick={() => deleteHandler(s._id, s.name)}
      >
        Delete
      </Button>
    )
  );
  const studentData = grade.map((s, index) => {
    return {
      id: index + 1,
      name: s.name,
      number: s.studentNo,
      grade: s.grade,
      gender: s.gender,
      year: s.academicYear,
    };
  });
  return (
    <Fragment>
      <TabelHeader
        title={title}
        link="/admin/students/create"
        linkLabel="Add New Student"
        admin={auth.isAdmin || !auth.isAdmin}
      />
      {grade.length ? (
        <Fragment>
          <TableList columns={columns} rows={rows} />
          <DownloadPDF
            tableColums={tableColums}
            data={studentData}
            title={title}
            fileName={fileName}
          />
        </Fragment>
      ) : (
        <DataNotFound text="No Student Yet" />
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.editForm}>
          <EditStudent
            studentId={selectedStudentId}
            handleClose={handleClose}
          />
        </div>
      </Modal>
    </Fragment>
  );
};

export default StudentTable;
