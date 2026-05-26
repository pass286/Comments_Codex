@echo off
echo ============================
echo   My Blog - Starting...
echo ============================
echo.

:: Start Hexo server
echo [1/2] Starting Hexo blog on :4000...
start "Hexo Blog" /min cmd /c "cd /d D:\myblog\blog && D:\myblog\env\npm\hexo.cmd server -p 4000"

:: Start Editor server  
echo [2/2] Starting Editor on :3030...
start "Blog Editor" /min cmd /c "cd /d D:\myblog\blog\editor && node server.js"

:: Wait and open
timeout /t 3 /nobreak >nul
echo.
echo Blog:    http://localhost:4000
echo Editor:  http://localhost:3030
echo.
start http://localhost:3030
start http://localhost:4000
echo Done! Close this window to keep services running.
pause
