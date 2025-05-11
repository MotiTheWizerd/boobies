@echo off
echo === Starting Publish Board Server ===

if not exist node_modules (
  echo Dependencies not installed. Running setup first...
  call setup.bat
)

echo Starting server in development mode...
call pnpm run dev 