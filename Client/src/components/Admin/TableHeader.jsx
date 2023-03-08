import React from "react";
import styles from "./TableHeader.module.css";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Tooltip } from "@material-ui/core";

const TabelHeader = ({ title, link, linkLabel, admin }) => {
  return (
    <div className={styles.tableHeaderWrapper}>
      <h3>{title}</h3>
      {admin && linkLabel && (
        <Tooltip title={linkLabel} placement="left" arrow>
          <Link className={styles.link} to={link}>
            <AddCircleOutlineIcon className={styles.addIcon} />
          </Link>
        </Tooltip>
      )}
    </div>
  );
};

export default TabelHeader;
