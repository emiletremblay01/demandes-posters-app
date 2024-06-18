import { cookies } from "next/headers";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nip } = body;
    console.log("ok");
    const nipEnv = process.env.QL_NIP;
    console.log(nip);
    console.log(nipEnv);
    if (nip != nipEnv) {
      return new Response("nip is not valid", { status: 401 });
    }
    const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000;
    const expirationDate = new Date(Date.now() + twoWeeksInMs);
    cookies().set("nip", nip, {
      expires: expirationDate,
    });
    return new Response("Authorized!", {
      status: 200,
    });
  } catch (error) {
    return new Response("Internal error", { status: 500 });
  }
}
