import "dotenv/config"
import readLine, { createInterface } from 'readline/promises'
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, tool, createAgent} from "langchain"
import { sendEmail } from "./mail.service.js";
import * as z from "zod"


const emailTool = tool(
    sendEmail,
    {
        name: "emailTool",
        description: "Use this to send an email",
        schema:z.object({
            to: z.string().describe("The recipients email address"),
            subject:z.string().describe("The subject of an email"),
            html:z.string().describe("The html content of an email")
        })

    }
)




const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

const model = new ChatMistralAI({
    model: "mistral-small-latest"
})

const agent = createAgent({
    model,
    tools:[emailTool]
})


const messages = []

while (true) {
    const userInput = await rl.question("You: ")

    messages.push(new HumanMessage(userInput))

    const response = await agent.invoke({
        messages
    })

    messages.push(response.messages[response.messages.length - 1])

    console.log(response)
    // console.log("AI: " + response.content)
}

rl.close()






















//readline is here to communicate with terminal
// rl.question("What is your name? ",(name)=>{
//     console.log(`Hello ${name}`)
//     rl.close();
// })

// const response = await model.invoke("what is the capital of India ? under 10 words")
// console.log(response.text)
