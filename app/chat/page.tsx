// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent } from "@/components/ui/card"

// export default function ChatPage() {
//   const [message, setMessage] = useState("")
//   const [response, setResponse] = useState("")
//   const [loading, setLoading] = useState(false)

//   const sendMessage = async () => {
//     if (!message) return

//     setLoading(true)

//     const res = await fetch(
//       "https://portfolio-gayya-chat2-bcgqdgagbngte4hb.australiaeast-01.azurewebsites.net/api/chat_trigger",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message }),
//       }
//     )

//     const data = await res.json()
//     setResponse(data.answer)
//     setLoading(false)
//   }

//   return (
//     <div className="max-w-xl mx-auto mt-20 space-y-4">
//       <Card>
//         <CardContent className="p-6 space-y-4">
//           <Input
//             placeholder="Ask me about my experience..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <Button onClick={sendMessage} disabled={loading}>
//             {loading ? "Thinking..." : "Send"}
//           </Button>
//         </CardContent>
//       </Card>

//       {response && (
//         <Card>
//           <CardContent className="p-6">
//             <p>{response}</p>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   )
// }