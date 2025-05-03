import React from "react";
import "./Skills.css";
import SkillSection from "./SkillSection";
import { Fade } from "react-reveal";
import { useTranslation } from "react-i18next";

export default function Skills(props) {
  const theme = props.theme;
  const { t } = useTranslation();
  return (
    <div className="main" id="skills">
      <div className="skills-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="skills-header" style={{ color: theme.text }}>
            {t("home.skills.whatIDo")}
          </h1>
        </Fade>
      </div>
      <SkillSection theme={theme} />
    </div>
  );
}
