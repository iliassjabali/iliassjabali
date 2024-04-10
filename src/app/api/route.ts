export function GET(request: Request) {
  // Get the User-Agent string from the request
  const userAgentString = request.headers.get("user-agent");

  // Parsing for common platforms and browsers

  return new Response(
    JSON.stringify({
      browser: getBrowser(userAgentString),
      os: getOS(userAgentString),
      isMobile: /iphone|ipad|ipod|android/i.test(userAgentString ?? ""),
      userAgent: userAgentString, // Original user-agent string
      ip:
        request.headers.get("cf-connecting-ip") ??
        request.headers.get("x-forwarded-for") ??
        request.headers.get("x-real-ip") ??
        request.headers.get("x-client-ip") ??
        request.headers.get("x-remote-ip") ??
        request.headers.get("x-host") ??
        request.headers.get("x-originating-ip") ??
        request.headers.get("x-remote-ip") ??
        request.headers.get("x-remote-addr") ??
        request.headers.get("x-remote-host") ??
        request.headers.get("x-remote-addr") ??
        request.headers.get("x-forwarded-host") ??
        request.headers.get("x-forwarded-server") ??
        request.headers.get("x-forwarded-host") ??
        request.headers.get("x-forwarded-server"),
    }),
    {
      headers: {
        "content-type": "application/json",
      },
    },
  );
}

// Helper function to detect the browser from User-Agent
function getBrowser(userAgent: string | null) {
  if (userAgent == null) return "Unknown";
  if (userAgent.match(/firefox|fxios/i)) return "Firefox";
  if (userAgent.match(/chrome|chromium|crios/i)) return "Chrome";
  if (userAgent.match(/safari/i) && !userAgent.match(/chrome|chromium|crios/i))
    return "Safari";
  if (userAgent.match(/edg/i)) return "Edge";
  if (userAgent.match(/msie|trident/i)) return "Internet Explorer";
  if (userAgent.match(/opr\//i)) return "Opera";
  return "Unknown";
}

// Helper function to detect the operating system from User-Agent
function getOS(userAgent: string | null) {
  if (userAgent == null) return "Unknown";
  if (userAgent.match(/windows nt 10.0/i)) return "Windows 10";
  if (userAgent.match(/windows nt 6.2/i)) return "Windows 8";
  if (userAgent.match(/windows nt 6.1/i)) return "Windows 7";
  if (userAgent.match(/windows nt 6.0/i)) return "Windows Vista";
  if (userAgent.match(/windows nt 5.1/i)) return "Windows XP";
  if (userAgent.match(/macintosh|mac os/i)) return "MacOS";
  if (userAgent.match(/android/i)) return "Android";
  if (userAgent.match(/iphone|ipad|ipod/i)) return "iOS";
  if (userAgent.match(/linux/i)) return "Linux";
  return "Unknown";
}
