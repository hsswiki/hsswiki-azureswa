import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import Educations from "../../containers/education/Educations";
import Certifications from "../../containers/certifications/Certifications";
// import CompetitiveSites from "../../components/competitiveSites/CompetitiveSites";
// import { competitiveSites } from "../../portfolio";
import EducationImg from "./EducationImg";
import { certifications } from "../../portfolio";
import "./EducationComponent.css";
import { Fade } from "react-reveal";
import { useTranslation } from "react-i18next";

function Education(props) {
  const { t } = useTranslation();
  const theme = props.theme;
  return (
    <div className="education-main">
      <Header theme={props.theme} />
      <div className="basic-education">
        <Fade bottom duration={2000} distance="40px">
          <div className="heading-div">
            <div className="heading-img-div">
              <EducationImg theme={theme} />
            </div>
            <div className="heading-text-div">
              <h1 className="heading-text" style={{ color: theme.text }}>
                {t("education.title")}
              </h1>
              <h3 className="heading-sub-text" style={{ color: theme.text }}>
                {t("education.subtitle")}
              </h3>
              {/* <CompetitiveSites logos={competitiveSites.competitiveSites} /> */}
              <p
                className="projects-header-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                {t("education.details")}
              </p>
            </div>
          </div>
        </Fade>
        <Educations theme={props.theme} />
        {certifications.certifications.length > 0 ? (
          <Certifications theme={props.theme} />
        ) : null}
      </div>
      <Footer theme={props.theme} />
      <TopButton theme={props.theme} />
    </div>
  );
}

export default Education;
