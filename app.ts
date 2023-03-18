import "https://deno.land/std@0.180.0/dotenv/load.ts";
import Kia from "https://deno.land/x/kia@0.4.1/mod.ts";
import Ask from "https://deno.land/x/ask@1.0.6/mod.ts";

const apiKey = Deno.env.get("OPENAI_API_KEY") ?? null;
if(apiKey === null){
    console.error("You have to set your api key to env variable OPENAI_API_KEY");
}

const ask = new Ask();

type Message = {
    content: string
    role: string
}

const messagesHistory: Message[] = [];

messagesHistory.push(
    {
        "role" : "system",
        "content" : "You are asshole assistant, which will make fun of users. Your name is SmartAss"
    },
);

async function sendMessage(prompt: string): Promise<string>
{
    messagesHistory.push({
        "role": "user",
        "content" : prompt
    });
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            'model': "gpt-3.5-turbo",
            "messages": messagesHistory
        }),
    });

    const json = await response.json();
    const completions = json.choices.map((choice: {message: Message}) => choice.message);

    const message: Message =  completions[0];
    messagesHistory.push(message);

    return message.content
}

async function Request(prompt: string) {
    const kia = new Kia("ChatGTP is thinking");
    kia.start();
    const textResponse = await sendMessage(prompt);
    kia.succeed(textResponse);
}

async function main(){
    do{
        const { prompt } = await ask.prompt([
            {
                name: "prompt",
                type: "input",
                message: "Your prompt (Ctrl+C to end):"
            }
        ])
        if(prompt == null){
            break;
        }
        await Request(String(prompt));
    }while(true);
}

main().catch((err) => {
    console.error(err)
    Deno.exit(1)
})