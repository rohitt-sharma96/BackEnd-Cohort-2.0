import "dotenv/config"
import readLine, { createInterface } from 'readline/promises'
import { ChatMistralAI } from "@langchain/mistralai";
import {HumanMessage} from "langchain"

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

const model = new ChatMistralAI({
    model: "mistral-small-latest"
})

const messages = []

while(true){
    const userInput = await rl.question("You: ")
     
    messages.push(new HumanMessage(userInput))
    
    const response = await model.invoke(messages)
    
    messages.push(response)

    console.log("AI: " + response.content)
}

rl.close()






















//readline is here to communicate with terminal
// rl.question("What is your name? ",(name)=>{
//     console.log(`Hello ${name}`)
//     rl.close();
// })

// const response = await model.invoke("what is the capital of India ? under 10 words")
// console.log(response.text)
