import React, { useState } from "react";
import "./App.css";
import Main from "./containers/Main";
import { ThemeProvider } from "styled-components";
import { chosenTheme } from "./theme";
import { GlobalStyles } from "./global";
import { Launcher } from "popup-chat-react"; // Import the chat launcher

function ChatPopup() {
  const [state, setState] = useState({
    messageList: [
      {
        author: "them",
        type: "text",
        data: {
          text:
            "Ask me anything about Shen! To continue our chat, may I have your invitation code please? Typically, it can be found on the resumes Shen sents out 😊",
        },
      },
    ],
    newMessagesCount: 1,
    isOpen: false,
  });

  const onMessageWasSent = (message) => {
    setState((state) => ({
      ...state,
      messageList: [...state.messageList, message],
    }));

    // Automatically reply with "Let me think..." placeholder
    setTimeout(() => {
      setState((state) => ({
        ...state,
        messageList: [
          ...state.messageList,
          {
            author: "them",
            type: "text",
            data: { text: "Let me think..." },
          },
        ],
      }));
    }, 0);

    const fetchResponse = async () => {
      let responseText = "";
      try {
        const response = await fetch(`/api/message`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        responseText = await response.text();
      } catch (error) {
        console.error("Error fetching response message:", error);
        responseText = "Network error. Please try again later.";
      }
      setState((state) => ({
        ...state,
        messageList: [
          ...state.messageList.slice(0, -1),
          // Remove the "Let me think..." placeholder message
          {
            author: "them",
            type: "text",
            data: { text: responseText },
          },
        ],
      }));
    };
    fetchResponse();
  };

  const onClick = () => {
    setState((state) => ({
      ...state,
      isOpen: !state.isOpen,
      newMessagesCount: 0,
    }));
  };

  return (
    <div className="chat-popup" id="chatPopupId">
      <Launcher
        agentProfile={{
          teamName: "Shen's Digital Assistant",
          imageUrl:
            "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
        }}
        onMessageWasSent={onMessageWasSent}
        messageList={state.messageList}
        newMessagesCount={state.newMessagesCount}
        onClick={onClick}
        isOpen={state.isOpen}
        showEmoji
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={chosenTheme}>
      <>
        <GlobalStyles />
        <div>
          <Main theme={chosenTheme} />
          <ChatPopup />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
