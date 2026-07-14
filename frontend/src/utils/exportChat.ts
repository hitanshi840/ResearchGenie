export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function exportChatAsTXT(
  messages: ChatMessage[]
) {
  const text = messages
    .map(
      (message) =>
        `${message.role.toUpperCase()}\n${message.content}\n`
    )
    .join(
      "\n----------------------------------------\n\n"
    );

  const blob = new Blob([text], {
    type: "text/plain",
  });

  const url = URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download = "ResearchGenie-Chat.txt";
  link.click();

  URL.revokeObjectURL(url);
}

export function exportChatAsPDF(
  messages: ChatMessage[]
) {
  const printable = window.open(
    "",
    "_blank"
  );

  if (!printable) return;

  printable.document.write(`
<html>
<head>
<title>ResearchGenie Chat Export</title>

<style>

body{
font-family:Arial,Helvetica,sans-serif;
padding:40px;
line-height:1.8;
background:white;
color:#111827;
}

h1{
color:#0891b2;
margin-bottom:30px;
}

.role{
font-weight:bold;
font-size:15px;
margin-top:20px;
color:#0f172a;
}

pre{
white-space:pre-wrap;
word-wrap:break-word;
font-family:inherit;
font-size:14px;
background:#f8fafc;
padding:15px;
border-radius:10px;
border:1px solid #e2e8f0;
}

hr{
margin:28px 0;
border:none;
border-top:1px solid #ddd;
}

</style>

</head>

<body>

<h1>ResearchGenie Chat Export</h1>

${messages
  .map(
    (message) => `
<div class="role">
${message.role.toUpperCase()}
</div>

<pre>${message.content}</pre>

<hr/>
`
  )
  .join("")}

</body>

</html>
`);

  printable.document.close();
  printable.focus();
  printable.print();
}