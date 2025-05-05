import React from "react";
import ExperienceCard from "../../components/experienceCard/ExperienceCard.js";
import "./ExperienceAccordion.css";
import { Accordion, Panel } from "baseui/accordion";

import { useTranslation } from "react-i18next";

function ExperienceAccordion(props) {
  const { t } = useTranslation();

  const theme = props.theme;
  return (
    <div className="experience-accord">
      <Accordion>
        {props.sections.map((section) => {
          return (
            <Panel
              className="accord-panel"
              title={t(section.title)}
              key={t(section.title)}
              overrides={{
                Header: {
                  style: () => ({
                    backgroundColor: `${theme.body}`,
                    border: `1px solid`,
                    borderRadius: `5px`,
                    borderColor: `${theme.headerColor}`,
                    marginBottom: `3px`,
                    fontFamily: "Google Sans Regular",
                    color: `${theme.text}`,
                    ":hover": {
                      color: `${theme.secondaryText}`,
                    },
                  }),
                },
                Content: {
                  style: () => ({
                    backgroundColor: `${theme.body}`,
                  }),
                },
              }}
            >
              {section.experiences.map((experience, index) => {
                return (
                  <ExperienceCard
                    index={index}
                    key={index}
                    totalCards={section.experiences.length}
                    experience={experience}
                    theme={theme}
                  />
                );
              })}
            </Panel>
          );
        })}
      </Accordion>
    </div>
  );
}

export default ExperienceAccordion;
