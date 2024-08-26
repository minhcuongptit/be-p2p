// server.js
const WebSocket = require("ws")
const express = require("express")
const http = require("http")

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

wss.on("connection", (ws) => {
  console.log("Client connected")
  ws.on("message", (message) => {
    console.log(`Received message => ${message}`)
    // Gửi lại message cho tất cả các kết nối WebSocket khác
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log(message)
        client.send(message)
      }
    })
  })
  ws.on("close", () => {
    console.log("Client disconnected")
  })
})

// Đặt một route để kiểm tra
app.get("/", (req, res) => {
  res.send("Hello World!")
})

server.listen(8080, () => {
  console.log("Server đang chạy trên cổng 8080")
})
