import "https://deno.land/std@0.180.0/dotenv/load.ts";
import inquirer from "npm:inquirer";
import { oraPromise } from 'npm:ora'
import { ChatGPTAPI } from 'npm:chatgpt@5.1.1'

const api = new ChatGPTAPI({
    apiKey: Deno.env.get("OPENAI_API_KEY") ?? "",
})

let lastMessageId: string|undefined;

async function Request(prompt: string) {
    const res = await oraPromise(api.sendMessage(prompt, {
        parentMessageId: lastMessageId,

    }), {
        text: "ChatGTP is thinking",
    })
    lastMessageId = res.id;
    console.log(res.text)
}

async function main(){
    do{
        const { prompt } = await inquirer.prompt([
            {
                name: "prompt",
                type: "input",
                message: "Your prompt (Ctrl+C to end):"
            }
        ])
        if(prompt === 'x'){
            break;
        }
        await Request(prompt);
    }while(true);
}

main().catch((err) => {
    console.error(err)
    Deno.exit(1)
})