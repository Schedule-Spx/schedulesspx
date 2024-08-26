export async function onRequest(context) {
    const adsContent = `google.com, pub-9365788286872902, DIRECT, f08c47fec0942fa0`;
  
    return new Response(adsContent, {
      headers: {
        "content-type": "text/plain;charset=UTF-8",
      },
    });
  }
  