// Deploy as a SEPARATE Cloudflare Worker named kwa-image-backend.
// In Worker Settings > Bindings add Workers AI binding named AI.
// Keep the Groq chat Worker unchanged.
const ORIGIN="https://kitsambajoshua.github.io";
const headers={"Access-Control-Allow-Origin":ORIGIN,"Access-Control-Allow-Methods":"POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Vary":"Origin"};
const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{...headers,"Content-Type":"application/json"}});
export default {
 async fetch(request,env){
  if(request.method==="OPTIONS")return new Response(null,{status:204,headers});
  if(request.method!=="POST")return json({error:"POST required"},405);
  if(request.headers.get("origin")!==ORIGIN)return json({error:"Origin not allowed"},403);
  if(!env.AI)return json({error:"Cloudflare Workers AI binding AI is not configured"},503);
  const length=Number(request.headers.get("content-length")||0);
  if(length>4000)return json({error:"Request too large"},413);
  let body;try{body=await request.json()}catch(e){return json({error:"Invalid JSON"},400)}
  const prompt=body?.prompt;
  if(typeof prompt!=="string"||prompt.trim().length<3||prompt.length>1000)return json({error:"Prompt must be 3–1000 characters"},400);
  try{
   // Workers AI text-to-image model; model access/availability and billing depend on your account.
   const result=await env.AI.run("@cf/black-forest-labs/flux-1-schnell",{prompt:prompt.trim(),num_steps:4});
   if(result instanceof ReadableStream)return new Response(result,{headers:{...headers,"Content-Type":"image/png","Cache-Control":"no-store"}});
   if(result instanceof ArrayBuffer||ArrayBuffer.isView(result))return new Response(result,{headers:{...headers,"Content-Type":"image/png","Cache-Control":"no-store"}});
   if(result?.image){const bytes=Uint8Array.from(atob(result.image),c=>c.charCodeAt(0));return new Response(bytes,{headers:{...headers,"Content-Type":"image/png","Cache-Control":"no-store"}})}
   return json({error:"Unexpected image response from Workers AI"},502);
  }catch(e){return json({error:"Image model unavailable or quota exceeded. Check Workers AI binding and usage."},502)}
 }
};
