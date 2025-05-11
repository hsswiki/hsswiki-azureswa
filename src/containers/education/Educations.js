import React from "react";
import "./Educations.css";
import DegreeCard from "../../components/degreeCard/DegreeCard.js";
import { degrees } from "../../portfolio";
import { Fade } from "react-reveal";
import { useTranslation } from "react-i18next";

function Educations(props) {
  const { t } = useTranslation();
  const theme = props.theme;
  return (
    <div className="main" id="educations">
      <div className="educations-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="educations-header" style={{ color: theme.text }}>
            {t("education.degrees.title")}
          </h1>
        </Fade>
      </div>
      <div className="educations-body-div">
        {degrees.degrees.map((degree) => {
          return (
            <DegreeCard key={degree.title} degree={degree} theme={theme} />
          );
        })}
      </div>
    </div>
  );
}

export default Educations;
