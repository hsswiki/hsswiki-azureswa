import React, { useEffect, useState } from "react";
import "./App.css";
import Main from "./containers/Main";
import { ThemeProvider } from "styled-components";
import { chosenTheme } from "./theme";
import { GlobalStyles } from "./global";

import { Launcher } from "popup-chat-react"; // Import the chat launcher
import { useTranslation } from "react-i18next";

function ChatPopup() {
  const { t } = useTranslation();
  const [state, setState] = useState({
    messageList: [], // Initialize with an empty message list
    newMessagesCount: 1,
    isOpen: false,
  });

  const [invitationCode, setInvitationCode] = useState(null);

  const verifyInvitationCode = React.useCallback(async (code) => {
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
  }, []);

  const handleInvitationCode = React.useCallback(
    async (code) => {
      const verificationResult = await verifyInvitationCode(code);

      if (verificationResult === "OK") {
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
                  // "Thank you. How may I assist you with my knowledge of Shen?",
                  t("chatbot.validInvitation"),
              },
            },
          ],
        }));
      } else {
        setState((state) => ({
          ...state,
          messageList: [
            ...state.messageList.slice(0, -1),
            {
              author: "them",
              type: "text",
              data: {
                // text: `The invitation code "${code}" is invalid. Please reenter your invitation code or reach out to Shen for a new code. Thank you.`,
                text: t("chatbot.invalidInvitation"),
              },
            },
          ],
        }));
      }
    },
    [t, verifyInvitationCode]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("inv");
    if (code) {
      handleInvitationCode(code);
    }
  }, [handleInvitationCode]);

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
          data: {
            text:
              // "Let me think..."
              t("chatbot.thinking"),
          },
        },
      ],
    }));

    if (!invitationCode) {
      handleInvitationCode(message.data.text);
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
                    // "(The assistant is still responding. It takes longer than usual. Thank you for your patience 😊)",
                    t("chatbot.takeLonger"),
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
                msg.data.text.includes(
                  "..."
                  // "The assistant is still responding..."
                )
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
        const response = await fetch(`/api/chats/respond`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            invitation_code: invitationCode,
            chatHistory,
            inputMessage: message.data.text,
          }),
        });
        const result = await response.json();
        responseText = result.response;

        if (response.status >= 400) {
          console.error(
            "Error: Received response with status",
            response.status,
            result.detailedMessage
          );
          responseText = t("chatbot.error");
        }

        // if (result.response === "INVALID_INVITATION_CODE") {
        //   setInvitationCode(null);
        //   setState((state) => ({
        //     ...state,
        //     messageList: [
        //       ...state.messageList.slice(0, -1),
        //       {
        //         author: "them",
        //         type: "text",
        //         data: {
        //           text: `The invitation code "${invitationCode}" is invalid. Please reenter your invitation code or reach out to Shen for a new code. Thank you.`,
        //         },
        //       },
        //     ],
        //   }));
        //   return;
        // }
      } catch (error) {
        console.error("Error fetching response message:", error);
        // responseText = "Network error. Please try again later.";
        responseText = t("chatbot.error");
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
    setState((state) => {
      const shouldAddAskInvitation =
        state.messageList.length === 0 && !invitationCode;
      return {
        ...state,
        isOpen: !state.isOpen,
        newMessagesCount: 0,
        messageList: shouldAddAskInvitation
          ? [
              ...state.messageList,
              {
                author: "them",
                type: "text",
                data: {
                  text: t("chatbot.askInvitation"),
                },
              },
            ]
          : state.messageList,
      };
    });
  };

  return (
    <div className="chat-popup" id="chatPopupId">
      <Launcher
        agentProfile={{
          teamName: t("chatbot.title"),
          // imageUrl:
          // "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
        }}
        onMessageWasSent={onMessageWasSent}
        messageList={state.messageList}
        newMessagesCount={state.newMessagesCount}
        onClick={onClick}
        isOpen={state.isOpen}
        showEmoji
        onFilesSelected={() => {}}
        fileUpload={false}
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
