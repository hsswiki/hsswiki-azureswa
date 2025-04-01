import React, { Component, useState } from "react";
import Header from "../../components/header/Header";
import Greeting from "../../containers/greeting/Greeting";
import Skills from "../../containers/skills/Skills";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";

function FetchButton() {
  const [data, setData] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/message`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const text = await response.text();
      setData(text);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData("An error occurred while fetching the data.");
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Message</button>
      <div>{data}</div>
    </div>
  );
}

class Home extends Component {
  render() {
    return (
      <div>
        {/* <FetchButton /> */}
        <Header theme={this.props.theme} />
        <Greeting theme={this.props.theme} />
        <Skills theme={this.props.theme} />
        <Footer theme={this.props.theme} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default Home;
