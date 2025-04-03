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

  const [invitationCode, setInvitationCode] = useState(null);

  const verifyInvitationCode = async (code) => {
    try {
      const response = await fetch(`/api/invitations/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invitationCode: code }),
      });
      const result = await response.json();
      return result.response;
    } catch (error) {
      console.error("Error verifying invitation code:", error);
      return "ERROR";
    }
  };

  const handleInvitationCode = async (message) => {
    const code = message.data.text;
    const verificationResult = await verifyInvitationCode(code);

    if (verificationResult === "INVALID_INVITATION_CODE") {
      setState((state) => ({
        ...state,
        messageList: [
          ...state.messageList.slice(0, -1),
          {
            author: "them",
            type: "text",
            data: {
              text: `The invitation code "${code}" is invalid. Please reenter your invitation code or reach out to Shen for a new code. Thank you.`,
            },
          },
        ],
      }));
    } else if (verificationResult === "OK") {
      setInvitationCode(code);
      setState((state) => ({
        ...state,
        messageList: [
          ...state.messageList.slice(0, -1),
          {
            author: "them",
            type: "text",
            data: {
              text:
                "Thank you. How may I assist you with my knowledge of Shen?",
            },
          },
        ],
      }));
    }
  };

  const onMessageWasSent = (message) => {
    setState((state) => ({
      ...state,
      messageList: [...state.messageList, message],
    }));

    // Automatically reply with "Let me think..." placeholder
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

    if (!invitationCode) {
      handleInvitationCode(message);
      return;
    }

    const fetchResponse = async () => {
      let responseText = "";
      let isResponseFetched = false;

      // Start a timer to add periodic messages
      const periodicMessageInterval = setInterval(() => {
        if (!isResponseFetched) {
          setState((state) => ({
            ...state,
            messageList: [
              ...state.messageList,
              {
                author: "them",
                type: "text",
                data: {
                  text:
                    "(The assistant is still responding. It takes longer than usual. Thank you for your patience 😊)",
                },
              },
            ],
          }));
        }
      }, 10000); // 10 seconds

      try {
        const chatHistory = state.messageList
          .filter(
            (msg) =>
              !(
                msg.author === "them" &&
                msg.data.text.includes("The assistant is still responding")
              )
          )
          .map(
            (msg) =>
              `  ${
                msg.author === "them"
                  ? "assistant"
                  : msg.author === "me"
                  ? "user"
                  : msg.author
              }: ${msg.data.text}`
          )
          .join("\n\n");
        const response = await fetch(`/api/chat/respond`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            invitation_code: invitationCode,
            chatHistory,
            inputMessage: message.data.text,
          }),
        });
        const result = await response.json();

        if (result.response === "INVALID_INVITATION_CODE") {
          setInvitationCode(null);
          setState((state) => ({
            ...state,
            messageList: [
              ...state.messageList.slice(0, -1),
              {
                author: "them",
                type: "text",
                data: {
                  text: `The invitation code "${invitationCode}" is invalid. Please reenter your invitation code or reach out to Shen for a new code. Thank you.`,
                },
              },
            ],
          }));
          clearInterval(periodicMessageInterval); // Stop periodic messages
          return;
        }
        responseText = result.response;
      } catch (error) {
        console.error("Error fetching response message:", error);
        responseText = "Network error. Please try again later.";
      } finally {
        isResponseFetched = true; // Mark response as fetched
        clearInterval(periodicMessageInterval); // Stop periodic messages
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
