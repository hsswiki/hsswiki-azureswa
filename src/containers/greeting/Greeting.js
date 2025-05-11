import React from "react";
import "./Greeting.css";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
// import { greeting } from "../../portfolio";
import { Fade } from "react-reveal";
import FeelingProud from "./FeelingProud";
import { useTranslation } from "react-i18next";

export default function Greeting(props) {
  const { t } = useTranslation();
  const theme = props.theme;
  return (
    <Fade bottom duration={2000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <h1 className="greeting-text" style={{ color: theme.text }}>
                {t("home.greeting.title")}
                {/* {greeting.title} */}
              </h1>
              {t("home.greeting.nickname") && (
                <h2 className="greeting-nickname" style={{ color: theme.text }}>
                  {t("home.greeting.nickname")}
                </h2>
              )}
              <p
                className="greeting-text-p subTitle"
                style={{ color: theme.secondaryText }}
              >
                {t("home.greeting.subTitle")}
              </p>
              <SocialMedia theme={theme} />
              <div className="portfolio-repo-btn-div">
                {/* <Button
                  text="⭐ Star Me On Github"
                  newTab={true}
                  href={greeting.portfolio_repository}
                  theme={theme}
                  className="portfolio-repo-btn"
                /> */}
                <Button
                  newLanguage="en"
                  text="English"
                  newTab={false}
                  href=""
                  theme={theme}
                  className="portfolio-repo-btn"
                />
                <Button
                  newLanguage="zh"
                  text="中文"
                  newTab={false}
                  href=""
                  theme={theme}
                  className="portfolio-repo-btn"
                />
                <Button
                  newLanguage="ja"
                  text="日本語"
                  newTab={true}
                  href=""
                  theme={theme}
                  className="portfolio-repo-btn"
                />
              </div>
            </div>
          </div>
          <div className="greeting-image-div">
            <FeelingProud theme={theme} />
          </div>
        </div>
      </div>
    </Fade>
  );
}
