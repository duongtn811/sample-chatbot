// export const useChatAction = () => {
//     const onSendMessage = async () => {
//         try {
//             await fetchStreamWithAbort(apiEndpoint, onReadStream, {
//               method: "POST",
//               body: JSON.stringify(body)
//             });
    
//             setChatStatus("success");
//           } catch (error) {
//             setChatError("Failed to perform chat action.");
//             Sentry.captureException(error);
//           } finally {
//             clearAbortController();
//             setStreamingNode(null);
//             queryClient.invalidateQueries({
//               queryKey: queryKeys.chatChannel.messages(body.channelId as string)
//             });
//           }
//     }

//     return {
//         onSendMessage
//     }
// }