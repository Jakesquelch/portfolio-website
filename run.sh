#!/usr/bin/env bash
#
# Run the portfolio website locally.
#
#   ./run.sh              start the dev server (hot reload)
#   ./run.sh prod         build, then serve the production bundle
#   ./run.sh --port 4000  use a different port (default 3000)
#
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"

MODE="dev"
PORT="3000"

while [[ $# -gt 0 ]]; do
  case "$1" in
    dev|prod)
      MODE="$1"
      shift
      ;;
    -p|--port)
      PORT="${2:?--port needs a value}"
      shift 2
      ;;
    -h|--help)
      sed -n '2,8p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    *)
      echo "Unknown argument: $1 (try --help)" >&2
      exit 1
      ;;
  esac
done

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed or not on PATH. Get it from https://nodejs.org" >&2
  exit 1
fi

# Install/refresh dependencies when node_modules is missing or out of date.
if [[ ! -d node_modules ]] || [[ package-lock.json -nt node_modules ]]; then
  echo "==> Installing dependencies"
  npm install
fi

if [[ "$MODE" == "prod" ]]; then
  echo "==> Building production bundle"
  npm run build
  echo "==> Serving on http://localhost:$PORT"
  exec npm run start -- --port "$PORT"
else
  echo "==> Dev server on http://localhost:$PORT"
  exec npm run dev -- --port "$PORT"
fi
