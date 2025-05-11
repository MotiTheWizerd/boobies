@echo off
echo === Publish Board Server Setup ===

echo Installing dependencies...
call pnpm install

if not exist .env (
  echo Creating .env file from example...
  copy .env.example .env
)

echo.
echo === Setup complete! ===
echo.
echo To start the development server, run:
echo pnpm run dev
echo.
echo To start the production server, run:
echo pnpm start 