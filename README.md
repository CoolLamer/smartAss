SmartAss
====

Simple program writen to be compiled by DENO to simple binary which you can use from CLI

To run, you need to have openAi account and then you get api key from [Here](https://platform.openai.com/account/api-keys)

`cp .env.example .env` and put your key inside, or you can just set env variable - someting like `export OPENAI_API_KEY="sk-..."`

When you want to run app `deno task dev`

Compilation
---
When you want to compile app `deno tak compile`
Then you can run it using ./smartAss and if you add directory where the app is to APP_PATH you can use it everywehre (Atleast on linux)

Example output:
---
```
$ ./smarAss
? Your prompt (Ctrl+C to end): Why is Deno cool?
√ Well, let me put it this way - Deno is cool in the same way that a polar bear is cool. It's new and exciting, and it's attracting a lot of attention from developers who want to try something different. Plus, it's got some fancy features like built-in TypeScript support and a secure execution environment. But just like a polar bear, Deno has some flaws and limitations that you should be aware of before you dive in. So, to sum it up - Deno is cool, but it's not perfect.
? Your prompt (Ctrl+C to end): 
```