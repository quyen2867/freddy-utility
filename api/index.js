export const config = { runtime: 'edge' };

export default async function handler(request) {
  const url = new URL(request.url);
  const userAgent = request.headers.get("User-Agent") || "";

  // Xử lý khi gọi MAS
  if (url.pathname === "/mas" || userAgent.includes("WindowsPowerShell") || userAgent.includes("PowerShell")) {
    const psScript = `
$ErrorActionPreference = "Stop"
$host.UI.RawUI.WindowTitle = "Freddy's Activation Tool"
Clear-Host
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "      FREDDY'S ACTIVATION TOOL            " -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "[*] Dang tai script tu GitHub cua Freddy..." -ForegroundColor Yellow

$url = "https://raw.githubusercontent.com/quyen2867/Freddy-Activation-Tool/main/MAS/All-In-One-Version-KL/MAS_AIO.cmd"
$temp = "$env:TEMP\FAT_AIO.cmd"

try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $url -OutFile $temp -UseBasicParsing
    Write-Host "[*] Tai thanh cong. Dang khoi chay menu..." -ForegroundColor Green
    Start-Process -FilePath $temp -Wait
} catch {
    Write-Host "[!] Loi: Khong the tai script tu GitHub. Kiem tra mang!" -ForegroundColor Red
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
}
`;
    return new Response(psScript, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }

  // Giao diện Web Dashboard
  const htmlPage = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quyen267's Utility</title>
    <style>
        :root {
            --bg-base: #09090b;
            --bg-card: #121212;
            --border-color: #27272a;
            --text-main: #f4f4f5;
            --text-muted: #a1a1aa;
            --accent: #3b82f6;
            --accent-hover: #2563eb;
            --success: #10b981;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; -webkit-font-smoothing: antialiased; }
        body { background-color: var(--bg-base); color: var(--text-main); display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 24px; background-image: radial-gradient(circle at 50% 0%, #1e1e24 0%, transparent 50%); }
        .container { width: 100%; max-width: 900px; }
        .header { margin-bottom: 32px; display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 16px; border-bottom: 1px solid var(--border-color); }
        .header h1 { font-size: 1.5rem; font-weight: 600; }
        .header p { color: var(--text-muted); font-size: 0.875rem; margin-top: 4px; }
        .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        @media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
        .card { background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 24px; display: flex; flex-direction: column; transition: 0.2s; }
        .card:hover { border-color: #3f3f46; }
        .card.highlight:hover { border-color: var(--accent); box-shadow: 0 0 20px rgba(59, 130, 246, 0.15); }
        .card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .icon-wrapper { background-color: #1e1e24; border: 1px solid var(--border-color); padding: 10px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .card h2 { font-size: 1rem; font-weight: 500; }
        .card p { color: var(--text-muted); font-size: 0.875rem; line-height: 1.5; margin-bottom: 24px; flex-grow: 1; }
        .btn-group { display: flex; flex-direction: column; gap: 8px; }
        .btn { background-color: #27272a; color: var(--text-main); border: 1px solid transparent; padding: 10px 16px; font-size: 0.875rem; border-radius: 6px; cursor: pointer; text-decoration: none; text-align: center; transition: 0.15s; display: flex; justify-content: center; align-items: center; }
        .btn:hover { background-color: #3f3f46; }
        .btn.primary { background-color: var(--accent); color: white; }
        .btn.primary:hover { background-color: var(--accent-hover); }
        .btn.success { background-color: var(--success); color: white; }
        .btn.success:hover { background-color: #059669; }
        .btn.outline { background-color: transparent; border-color: var(--border-color); }
        .btn.outline:hover { border-color: #52525b; }
        .terminal-box { background-color: #000000; border: 1px solid var(--border-color); border-radius: 6px; padding: 12px; font-family: monospace; font-size: 0.8rem; color: var(--success); margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
        .terminal-box:hover { border-color: var(--success); }
        .terminal-box span { word-break: break-all; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div><h1>Quyen267's Utility</h1><p>Software & Activation Workspace</p></div>
        </div>
        <div class="grid">
            <div class="card highlight" style="grid-column: span 2;">
                <div class="card-header">
                    <div class="icon-wrapper" style="color: var(--accent);"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>
                    <h2>System Activation</h2>
                </div>
                <p>Kích hoạt bản quyền vĩnh viễn cho Windows và Office thông qua script gốc từ repo GitHub của Quyen267.</p>
                <div class="terminal-box" onclick="copyMAS()" id="masBox">
                    <span>irm https://freddy-utility.vercel.app/api/index | iex</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </div>
                <div class="btn-group" style="flex-direction: row;">
                    <button class="btn primary" onclick="copyMAS()">Copy Lệnh</button>
                    <a href="https://github.com/quyen2867/Freddy-Activation-Tool" target="_blank" class="btn outline">Xem Source Code</a>
                </div>
            </div>
            <!-- WinRAR, IDM, Acrobat giữ nguyên -->
        </div>
    </div>
    <script>
        function copyMAS() {
            const cmd = "irm https://freddy-utility.vercel.app/api/index | iex";
            navigator.clipboard.writeText(cmd).then(() => {
                const box = document.getElementById('masBox');
                const originalHTML = box.innerHTML;
                box.innerHTML = '<span style="color: #10b981;">✓ Đã copy</span>';
                setTimeout(() => { box.innerHTML = originalHTML; }, 2000);
            });
        }
    </script>
</body>
</html>
`;
  return new Response(htmlPage, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}