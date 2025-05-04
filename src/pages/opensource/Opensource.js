import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import OpensourceCharts from "../../containers/opensourceCharts/OpensourceCharts";
import Organizations from "../../containers/organizations/Organizations";
import PullRequests from "../../containers/pullRequests/PullRequests";
import Issues from "../../containers/issues/Issues";
import TopButton from "../../components/topButton/TopButton";
import "./Opensource.css";

import { Fade } from "react-reveal";
import EducationImg from "../education/EducationImg";
import FeelingProud from "../../containers/greeting/FeelingProud";
function Opensource(props) {
  return (
    <div className="opensource-main">
      <Header theme={props.theme} />
      {/* <Fade bottom duration={2000} distance="40px">
          <div className="greet-main" id="greeting">
            <div className="greeting-main">
              <div className="greeting-text-div">
                <div>
                  <h1 className="greeting-text" style={{ color: props.theme.text }}>
                    home.greeting.title
                  </h1>

                  <p
                    className="greeting-text-p subTitle"
                    style={{ color: props.theme.secondaryText }}
                  >
                    home.greeting.subTitle
                  </p>
                </div>
              </div>
              <div className="greeting-image-div">
                <FeelingProud theme={props.theme} />
                <img
                  className="logo_img"
                  // src={require("../../../docs/readme/architecture.drawio.svg")}
                  src={require("./architecture.drawio.svg")}
                  alt=""
                  width="700"
                  height="700"
                />
              </div>
            </div>
          </div>
        </Fade> */}
      <Fade bottom duration={2000} distance="40px">
        <div className="heading-div">
          <div className="heading-img-div">
            {/* <EducationImg theme={props.theme} /> */}
            <img
              className="logo_img"
              // src={require("../../../docs/readme/architecture.drawio.svg")}
              src={require("./architecture.drawio.svg")}
              alt=""
            />
          </div>
          <div className="heading-text-div">
            <h1 className="heading-text" style={{ color: props.theme.text }}>
              education.title
            </h1>
            <h3
              className="heading-sub-text"
              style={{ color: props.theme.text }}
            >
              education.subtitle
            </h3>
            <p
              className="projects-header-detail-text subTitle"
              style={{ color: props.theme.secondaryText }}
            >
              education.details
            </p>
          </div>
        </div>
      </Fade>
      {/* <Organizations theme={props.theme} /> */}
      {/* <Organizations theme={props.theme} />
        <OpensourceCharts theme={props.theme} />
        <PullRequests theme={props.theme} />
        <Issues theme={props.theme} /> */}
      <Footer theme={props.theme} onToggle={props.onToggle} />
      <TopButton theme={props.theme} />
    </div>
  );
}

export default Opensource;
