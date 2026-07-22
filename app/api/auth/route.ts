import { cookies } from "next/headers";
export async function POST(request: Request) {
  try {
    // #region agent log
    fetch('http://127.0.0.1:7357/ingest/d1805fe8-e2c6-4bc4-8ee3-a6adb9e48d40',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3245e0'},body:JSON.stringify({sessionId:'3245e0',location:'app/api/auth/route.ts:POST-entry',message:'Auth POST handler entered',data:{contentType:request.headers.get('content-type'),hasBody:request.body!==null},timestamp:Date.now(),hypothesisId:'H1'})}).catch(()=>{});
    // #endregion
    const body = await request.json();
    const { nip } = body;
    const nipEnv = process.env.QL_NIP;
    // #region agent log
    fetch('http://127.0.0.1:7357/ingest/d1805fe8-e2c6-4bc4-8ee3-a6adb9e48d40',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3245e0'},body:JSON.stringify({sessionId:'3245e0',location:'app/api/auth/route.ts:POST-parsed',message:'Request body parsed',data:{nipType:typeof nip,nipLength:typeof nip==='string'?nip.length:null,hasNipEnv:!!nipEnv,nipEnvLength:nipEnv?.length??null,nipsMatch:nip==nipEnv},timestamp:Date.now(),hypothesisId:'H2'})}).catch(()=>{});
    // #endregion
    if (nip != nipEnv) {
      // #region agent log
      fetch('http://127.0.0.1:7357/ingest/d1805fe8-e2c6-4bc4-8ee3-a6adb9e48d40',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3245e0'},body:JSON.stringify({sessionId:'3245e0',location:'app/api/auth/route.ts:POST-invalid',message:'NIP validation failed',data:{nipType:typeof nip,hasNipEnv:!!nipEnv},timestamp:Date.now(),hypothesisId:'H2'})}).catch(()=>{});
      // #endregion
      return new Response("nip is not valid", { status: 401 });
    }
    const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000;
    const expirationDate = new Date(Date.now() + twoWeeksInMs);
    // #region agent log
    fetch('http://127.0.0.1:7357/ingest/d1805fe8-e2c6-4bc4-8ee3-a6adb9e48d40',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3245e0'},body:JSON.stringify({sessionId:'3245e0',location:'app/api/auth/route.ts:POST-before-cookie',message:'About to set nip cookie',data:{expirationDate:expirationDate.toISOString()},timestamp:Date.now(),hypothesisId:'H3'})}).catch(()=>{});
    // #endregion
    cookies().set("nip", nip, {
      expires: expirationDate,
    });
    // #region agent log
    fetch('http://127.0.0.1:7357/ingest/d1805fe8-e2c6-4bc4-8ee3-a6adb9e48d40',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3245e0'},body:JSON.stringify({sessionId:'3245e0',location:'app/api/auth/route.ts:POST-success',message:'Auth succeeded',data:{status:200},timestamp:Date.now(),hypothesisId:'H3'})}).catch(()=>{});
    // #endregion
    return new Response("Authorized!", {
      status: 200,
    });
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7357/ingest/d1805fe8-e2c6-4bc4-8ee3-a6adb9e48d40',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3245e0'},body:JSON.stringify({sessionId:'3245e0',location:'app/api/auth/route.ts:POST-catch',message:'Auth handler threw',data:{errorName:error instanceof Error?error.name:'unknown',errorMessage:error instanceof Error?error.message:String(error)},timestamp:Date.now(),hypothesisId:'H1,H3,H4'})}).catch(()=>{});
    // #endregion
    return new Response("Internal error", { status: 500 });
  }
}
