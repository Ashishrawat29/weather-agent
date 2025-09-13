import OpenAI from 'openai';
import readlineSync from 'readline-sync';


const OPENAI_API_KEY=
'YOUR_API_KEY';

const client = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

// Tools
function getweatherDetails(city='') {
    if(city.toLowerCase()==='pune') return '10°C';
    if(city.toLowerCase()==='mumbai') return '12°C';
    if(city.toLowerCase()==='delhi') return '14°C';
    if(city.toLowerCase()==='bangalore') return '15°C';
    if(city.toLowerCase()==='hyderabad') return '24°C';
    if(city.toLowerCase()==='chennai') return '30°C';

}

const tools={
    "getweatherDetails": getweatherDetails,
}

const SYSTEM_PROMPT = ` 
You are an AI Assistant with START, PLAN, ACTION ,OBSERVATION and output state.
Wait for the user prompt and first PLAN using available tools.
After Planning, Take the Action with appropriate tools and wait for observation based on Action.
Once you get the Observation, Return the AI response based on START prompt and Observations.

Strictly follow the JSON putput format as in examples

Available Tools:
-function getweatherDetails{city: string}: string
getweatherDetails is a function that accepts city name as string and returns the weather details.

Example:
START
{"type":"user","user":"What is the sum of weather of pune and mumbai?"}
{"type":"plan","plan":"I will call the getweatherDetails for pune."}
{"type":"action","function":"getweatherDetails","input": "pune"}
{"type":"observation","observation":"10°C"}
{"type":"plan","plan":"I will call the getweatherDetails for mumbai."}
{"type":"action","function":"getweatherDetails","input": "mumbai"}
{"type":"observation","observation":"12°C"}
{"type":"output","output":"The sum of weather of pune and mumbai is 22°C."}


`;

const messages = [
    { "role": 'system', content: SYSTEM_PROMPT },
];

while (true) {
    const query = readlineSync.question('>> ');
    const q={
        type : "user",
        user :'What is the sum of weather of pune and mumbai?', 
    };
    messages.push({ "role": 'user', content: JSON.stringify(q) });

    while (true) {
        const chat = await client.chat.completions.create({
            model: 'gpt-4o',
            messages: messages,
            response_format : { type : 'json_object'},
        });

        const result= chat.choices[0].message.content;
        messages.push({ role:'assistant', constent : result});
        
        const call=JSON.parse(result)

        if(call.type==='output'){
            console.log(`🤖: ${call.output}`);
            break;
        }else if(call.type==='action'){
            const fn = tools[call.function];
            const observation=fn(call.input);
            const obs={"type":"observation","observation":observation}
            messages.push({ role:'user', content: JSON.stringify(obs)});

        }

    }

}